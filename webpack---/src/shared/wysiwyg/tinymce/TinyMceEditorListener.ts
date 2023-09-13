
import { EventEmitter } from 'events';
import * as NullUtil from 'src/shared/NullUtil';
import {ITinyMceV3Editor} from 'src/shared/wysiwyg/tinymce/ITinyMceV3Editor';
import {ITinyMceV4Editor} from 'src/shared/wysiwyg/tinymce/ITinyMceV4Editor';
import {ITinyMceV6Editor} from 'src/shared/wysiwyg/tinymce/ITinyMceV6Editor';
import { IEditorListener } from '../IEditorListener';
import { TinyMceEditorController } from './TinyMceEditorController';
import { ITinyMce, TinyMceEditorFacade } from './TinyMceEditorFacade';

/** Represents a type that can have a global tinymce object. */
export interface ICanHaveTinyMceEditors {
    tinymce?: ITinyMce;
}

export interface ITinyMceEditorListenerOptions {
    /** How frequently to check the global scope for added or removed editors. */
    checkIntervalMs: number;
}

/**
 * Listens to changes to the global `window.tinymce.editors` array and calls a callback when editors have been added and
 * removed from the page.
 */
export class TinyMceEditorListener implements IEditorListener<TinyMceEditorController> {

    // Internal state
    private readonly emitter = new EventEmitter();
    private readonly instances: Array<{
        editor: TinyMceEditorController,
        id: string,
        instance: ITinyMceV3Editor | ITinyMceV4Editor | ITinyMceV6Editor
    }> = [];
    private interval?: any;

    constructor(
        protected readonly baseUrl: string,
        protected readonly i18n: any,
        /** The global object, which can have `tinymce` with editors. */
        protected readonly global: ICanHaveTinyMceEditors,
        protected readonly hideAccessibilityPlugin: boolean,
        protected readonly options: ITinyMceEditorListenerOptions = {
            'checkIntervalMs': 100
        }
    ) {}

    public onAddEditor(cb: (id: string, editor: TinyMceEditorController) => void): void {
        this.emitter.on('add-editor', cb);
    }

    public onRemoveEditor(cb: (id: string, editor: TinyMceEditorController) => void): void {
        this.emitter.on('remove-editor', cb);
    }

    /** Start listening for editors on the global scope. */
    public start(): void {
        this.syncEditors();
        this.interval = setInterval(() => this.syncEditors(), this.options.checkIntervalMs);
    }

    /** Stop listening for editors on the global scope. */
    public stop(): void {
        clearInterval(this.interval);
        this.interval = undefined;

        this.instances.forEach(({id, editor}) => this.emitter.emit('remove-editor', id, editor));
        this.instances.length = 0;
        this.emitter.removeAllListeners();
    }

    public mkTinyMceEditorController(instance: ITinyMceV3Editor | ITinyMceV4Editor | ITinyMceV6Editor) {
        const facade = new TinyMceEditorFacade(
            instance,
            this.global.tinymce
        );
        return new TinyMceEditorController(this.baseUrl, this.i18n, facade, this.hideAccessibilityPlugin);
    }

    private getEditors() {
        const {editors = [], majorVersion, get = () => []} =
            NullUtil.orElse<Partial<ITinyMce>>(this.global.tinymce, {});
        return majorVersion === '6' ? get() : editors;
    }

    private syncEditors(): void {
        const editors = this.getEditors();
        // First flag editors that have been removed
        const removedInstanceIndices: number[] = [];
        for (let i = 0; i < this.instances.length; i++) {
            const instance = this.instances[i];
            if (editors.indexOf(instance.instance) === -1) {
                removedInstanceIndices.push(i);
                this.emitter.emit('remove-editor', instance.id, instance.editor);
            }
        }

        // Clear out the instances we've detected removed
        for (const i of removedInstanceIndices) {
            this.instances.splice(i, 1);
        }

        // Now flag editors that have been added
        for (const instance of editors) {
            if (!NullUtil.hasValue(this.instances.find((i) => i.instance === instance))) {
                const id = Math.random().toString().slice(2);
                const editor = this.mkTinyMceEditorController(instance);
                this.instances.push({editor, id, instance});
                this.emitter.emit('add-editor', id, editor);
            }
        }
    }
}
