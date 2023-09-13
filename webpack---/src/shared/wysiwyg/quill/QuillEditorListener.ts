
import { EventEmitter } from 'events';
import * as $ from 'jquery';
import * as NullUtil from 'src/shared/NullUtil';
import { IEditorListener } from '../IEditorListener';
import {contentEditableFilter, QuillEditorController} from './QuillEditorController';

export class QuillEditorListener implements IEditorListener<QuillEditorController> {
    private readonly checkIntervalMs: number;
    private readonly root: HTMLElement;
    private readonly emitter = new EventEmitter();

    // Internal state
    private readonly instances: Array<{id: string, container: HTMLElement, editor: QuillEditorController}> = [];
    private interval?: any;

    constructor(
        private readonly baseUrl: string,
        private readonly i18n: any,
        {
            checkIntervalMs = 1000,
            root = document.body,
        } = {},
    ) {
        this.checkIntervalMs = checkIntervalMs;
        this.root = root;
    }

    public onAddEditor(cb: (id: string, editor: QuillEditorController) => void): void {
        this.emitter.on('add-editor', cb);
    }

    public onRemoveEditor(cb: (id: string, editor: QuillEditorController) => void): void {
        this.emitter.on('remove-editor', cb);
    }

    /** Start listening for editors on the global scope. */
    public start(): void {
        this.syncEditors();
        this.interval = setInterval(() => this.syncEditors(), this.checkIntervalMs);
    }

    /** Stop listening for editors on the global scope. */
    public stop(): void {
        if (NullUtil.hasValue(this.interval)) {
            clearInterval(this.interval);
            this.interval = undefined;
        }

        this.instances.forEach(({id, editor}) => this.emitter.emit('remove-editor', id, editor));
        this.instances.length = 0;
        this.emitter.removeAllListeners();
    }

    private syncEditors(): void {
        const $editors = $(this.root).find('.bbml-editor');
        const editors = $editors.toArray()
            .map((e) => {
                const editorBlocks = $(e).find('.ql-editor')
                    .toArray();
                return {
                    'editable': editorBlocks.filter(contentEditableFilter).length > 0,
                    'editor': e
                };
            });

        // First flag editors that have been removed
        const removedInstanceIndices: number[] = [];
        for (let i = 0; i < this.instances.length; i++) {
            const instance = this.instances[i];
            if (
                !instance.editor.editorBlockTransition &&
                editors.filter((e) => e.editable)
                    .findIndex((e) => e.editor === instance.container) === -1
            ) {
                removedInstanceIndices.push(i);
                this.emitter.emit('remove-editor', instance.id, instance.editor);
            }
        }

        // Clear out the instances we've detected removed
        for (const i of removedInstanceIndices) {
            this.instances.splice(i, 1);
        }

        // Now flag editors that have been added
        for (const container of editors) {
            if (!NullUtil.hasValue(this.instances.find((i) => i.container === container.editor)) &&
                container.editable) {
                const id = Math.random().toString().slice(2);
                const editor = new QuillEditorController(this.baseUrl, this.i18n, container.editor);
                this.instances.push({ id, 'container': container.editor, editor });
                this.emitter.emit('add-editor', id, editor);
            }
        }
    }
}
