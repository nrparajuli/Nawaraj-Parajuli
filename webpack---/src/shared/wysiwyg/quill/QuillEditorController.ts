import { EventEmitter } from 'events';
import * as $ from 'jquery';

import {evaluateXpath, HtmlPreviewDriver} from 'src/integration/api/ui/annotators/web/HtmlPreviewDriver';
import {IBlock} from 'src/integration/api/ui/InstructorFeedback';
import * as NullUtil from 'src/shared/NullUtil';
import * as PromiseUtil from 'src/shared/PromiseUtil';
import {applyWysiwygFix, getDisplayableElement, styleAttributes} from 'src/shared/wysiwyg/WysiwygFeedbackUtil';
import { IEditorController } from '../IEditorController';

export const contentEditableFilter = (e: HTMLElement) => e.getAttribute('contenteditable') === 'true';
export const contentUnsavedFilter = (e: HTMLElement) => e.getAttribute('disabled') !== 'disabled';

const nonIntractableElements = [
    '.js-drag-handle', // bbml block drag handles
    '.panel-editor-controls', // editor block save/close buttons
    '.bb-file-viewer-context-menu', // editor block file attachment options
    '.file-container-controls', // bbml attachment block options
];

/** Quill style block */
export interface IRteBlock {
    /** Heading level or null if the block is not header */
    level: number;
    /** Name of block */
    name: string;
    /** The HTML tagname. e,g, h1, h2, ..., h6 for headings or p for paragraphs, code for codeblocks, ... */
    tag: string;
    /** The HTML style associated with block. */
    style?: Array<Record<string, string>>;
    /** The css class associated with block. */
    className?: string;
}

/** Quill text block. */
export interface IRteEditorBlock {
    id: string; // Text block element id
    textBlock: string; // Text block content
}

export class QuillEditorController implements IEditorController {

    /** If Issue parent BBML editor block is opened. */
    private static issueContentEditable(issue: HTMLElement): boolean {
        return $(issue).parents('.ql-editor')
            .toArray()
            .filter(contentEditableFilter)
            .length > 0;
    }

    private static parseEditorId(xpath: string): string | undefined {
        return (NullUtil.orElse<string[]>((/\/\/.*\[@id='(.*)']/g).exec(xpath), []))[1];
    }

    public editorBlockTransition: boolean = false;

    private emitter = new EventEmitter();

    private observer?: MutationObserver;
    private emittedContent?: string;

    private indicator?: HTMLElement;
    private previewDriver?: HtmlPreviewDriver;
    private quickFixInProgress: boolean = false;
    private blockStyles: IBlock[] = [];
    private deactivated: boolean = false;

    /**
     * @param baseUrl The Ally base URL e.g. https://prod-eu-central-1.ally.ac
     * @param i18n The i18n object holding the translated keys
     * @param container The `bb-rich-text-editor` element that is being controlled
     */
    constructor(
        private readonly baseUrl: string,
        private readonly i18n: any,
        private readonly container: HTMLElement,
        private readonly jq: JQueryStatic = (window as any).jQuery ? (window as any).jQuery : $
    ) {}

    public async activate(indicator: HTMLElement): Promise<void> {
        this.blockStyles = await new Promise((resolve) =>
            this.getBbDocumentEditor().trigger('api', ['blockStyles', (blockStyles: IRteBlock[]) =>
                resolve(this.parseBlockStyles(blockStyles))])
        );

        $(this.container).addClass('ally-wysiwyg-feedback-quill');

        this.indicator = indicator;
        this.indicator.classList.add('button', 'button--secondary', 'ally-score-meter-container-quill');

        this.addScoreMeter(indicator);

        this.observer = new MutationObserver(() => {
            this.getBbDocumentEditor().trigger('api', ['getRteBlocks', (blocks: IRteEditorBlock[]) => {
                const content = this.getContent(blocks);
                if (content !== this.emittedContent) {
                    this.emittedContent = content;
                    this.emitter.emit('content-changed', content);
                }
            }]);
        });
        this.observer.observe(this.getContentContainer(), {
            'attributeFilter': ['alt', 'class', 'style'],
            'attributes': true,
            'characterData': true,
            'childList': true,
            'subtree': true
        });
    }

    public addScoreMeter(indicatorContainer: HTMLElement): void {
        const actionsMenu = $(this.container).parents('.panel-content').find('.header-actions-menu');
        if (actionsMenu.find('ally-wysiwyg-feedback-quill').length === 0) {
            actionsMenu.prepend(indicatorContainer);
        }
    }

    public async applyFix(ruleName: string, locators: string[], fixOptions: any) {
        if (this.quickFixInProgress) {
            return;
        }

        const root = $(this.container).find('.ql-editor')[0];
        const editorBlockIssues = locators.reduce((map, xpath) => {
            let id = QuillEditorController.parseEditorId(xpath);
            if (NullUtil.hasValue(id)) {
                id = id.replace(/-rte$/g, '');
                if (!map.has(id)) {
                    map.set(id, []);
                }
                map.get(id)!.push(xpath);
            }

            return map;
        }, new Map<string, string[]>());

        try {
            this.quickFixInProgress = true;
            this.editorBlockTransition = true;

            for (const editorId of Array.from(editorBlockIssues.keys())) {
                const editorLocators = NullUtil.orElse(editorBlockIssues.get(editorId), []);

                let issue: HTMLElement | undefined;
                for (const locator of editorLocators) {
                    issue = evaluateXpath(locator, document, this.getContentContainer());

                    if (NullUtil.hasValue(issue)) {
                        break;
                    }
                }

                if (!NullUtil.hasValue(issue)) {
                    continue;
                }

                if (!QuillEditorController.issueContentEditable(issue)) {
                    // Always close with save as Quill attributes may be outdated
                    await this.closeEditorBlock(true);
                    await this.openEditorBlock(editorId);
                }

                this.previewDriver?.resetSelection();
                applyWysiwygFix(ruleName, editorLocators, fixOptions, root);
            }
        } finally {
            this.quickFixInProgress = false;
            this.editorBlockTransition = false;
        }
    }

    public belongsToEditor(el: HTMLElement): boolean {
        return $.contains(this.container, el) ||
            $(el).is('.ms-Dialog') ||
            $(el).parents('.ms-Dialog').length > 0;
    }

    public deactivate(): void {
        this.deactivated = true;
        this.emitter.removeAllListeners();
        this.disableFeedbackMode();
        this.getBbDocumentEditor().unbind('api.onRteChange');
        if (NullUtil.hasValue(this.indicator)) {
            this.indicator.remove();
            this.indicator = undefined;
        }
        $(this.container).removeClass('ally-wysiwyg-feedback-quill');
    }

    public isDeactivated(): boolean {
        return this.deactivated;
    }

    public disableFeedbackMode(): void {
        $(this.container).parents('.document-editor-template')
            .removeClass('ally-wysiwyg-feedback-quill-fullscreen');

        if (NullUtil.hasValue(this.previewDriver)) {
            this.previewDriver.destroy();
            this.previewDriver = undefined;
        }

        nonIntractableElements.forEach((s) => {
            $(this.container).find(s).toArray().forEach((e) => {
                $(e).removeClass('ally-wysiwyg-feedback-list-item-inactive');
            });
        });
    }

    public enableFeedbackMode(instructorFeedbackWindow: Window): void {
        const parent = $(this.container).parents('.document-editor-template');
        parent.addClass('ally-wysiwyg-feedback-quill-fullscreen');

        nonIntractableElements.forEach((s) => {
            $(this.container).find(s).toArray().forEach((e) => {
                $(e).addClass('ally-wysiwyg-feedback-list-item-inactive');
            });
        });

        this.previewDriver = new HtmlPreviewDriver(
            this.baseUrl,
            this.i18n,
            {
                'contentContainer': parent[0],
                'scrollContainer': parent[0]
            },
            this.onSelection.bind(this)
        );
        this.previewDriver.start({
            'highlightInterval': 500,
            'parentWindow': instructorFeedbackWindow,
            'preprocessInterval': false,
        });
    }

    public getFeedbackContainer(): HTMLElement | undefined {
        return $(this.container).parents('.panel-content')[0];
    }

    public onContentChange(cb: (content: string) => void): void {
        this.emitter.on('content-changed', cb);
    }

    public onContentInit(cb: (content: string) => void): void {
        this.getBbDocumentEditor().trigger('api', ['getRteBlocks', (blocks: IRteEditorBlock[]) => {
            cb(this.getContent(blocks));
        }]);
    }

    public onForceDisableFeedbackMode(cb: () => void): void {
        this.emitter.on('force-disable-feedback-mode', cb);
    }

    public getBlocks(): IBlock[] {
        return this.blockStyles;
    }

    /** Open/closes editor block based on active issue xpath. */
    public async onSelection(issue?: HTMLElement): Promise<void> {
        if (
            !this.quickFixInProgress && !this.editorBlockTransition &&
            NullUtil.hasValue(issue) && !QuillEditorController.issueContentEditable(issue)
        ) {
            if (!$.contains(this.container, issue)) {
                console.warn('Issue element is no longer attached to Quill DOM', issue);
                // Clear the SR-Only section in IF
                this.emitter.emit('selection-changed', undefined);
                return;
            }
            const editorBlockId = $(issue).parents('bb-rich-text-editor')
                .attr('editor-id');

            try {
                this.editorBlockTransition = true;
                if (this.anyContentEditable()) {
                    // Always close with save as Quill attributes may be outdated
                    await this.closeEditorBlock(true);
                }
                await this.openEditorBlock(editorBlockId.replace(/-rte$/g, ''));
            } finally {
                this.editorBlockTransition = false;
            }
        }
        // Populate the SR-Only section in IF
        this.emitter.emit('selection-changed', getDisplayableElement(issue));
    }

    public onSelectionChange(cb: (content: string) => void): void {
        this.emitter.on('selection-changed', cb);
    }

    private getContentContainer(): HTMLElement {
        return $(this.container)[0];
    }

    private getBbDocumentEditor(): JQLite {
        return this.jq(this.container)
            .parents('bb-document-editor');
    }

    private getContent(blocks: IRteEditorBlock[]): string {
        return blocks.map(({id}) => {
            // Quill/Learn block content doesn't corresponds to rendered contents,
            // thus we're using DOM content instead of the one that is provided to us.
            const content = $(this.container).find(`#${id}`).clone();
            const tag = NullUtil.orElse(content.prop('tagName'), 'div')
                .toLowerCase();

            // Purge any ally specific attributes
            Object.values(HtmlPreviewDriver.customAttributes).forEach((key) =>
                content.find(`[${key}]`).removeAttr(key)
            );

            return `<${tag} id="${id}">${content.html()}</${tag}>`;
        }).join();
    }

    /** Retrieves all editable editor blocks. */
    private getEditableEditors() {
        return $(this.container).find('.ql-editor')
            .toArray()
            .filter(contentEditableFilter);
    }

    /** Checks if any editor block is editable. */
    private anyContentEditable(): boolean {
        return this.getEditableEditors().length > 0;
    }

    /** Opens BBML editor that contains issue. */
    private async openEditorBlock(editorId: string): Promise<void> {
        await PromiseUtil.waitUntil(() => new Promise((resolve) =>
            this.getBbDocumentEditor().trigger('api', ['open', editorId, () =>
                resolve(this.anyContentEditable())
            ])
        ), 250, 20);
    }

    /** Closes any open editor block, either saving changes or discarding them. */
    private async closeEditorBlock(save: boolean): Promise<void> {
        await PromiseUtil.waitUntil(() => new Promise((resolve) =>
            this.getBbDocumentEditor().trigger('api', ['closeActive', save, () =>
                resolve(!this.anyContentEditable())
            ])
        ), 250, 20);
    }

    /** Parses editor block styles from editor context menu popup. */
    private parseBlockStyles(rteBlockStyles: IRteBlock[]): IBlock[] {
        return rteBlockStyles.map(({name, tag, level, style = [], className}) => {
            const elemStyle: { [_: string]: string } = {};
            if (style.length > 0) {
                style.forEach((r: Record<string, string>) =>
                    Object.keys(r).forEach((k) => elemStyle[k] = r[k])
                );
            } else if (NullUtil.hasValue(className)) {
                const elem = $(
                    `<ally-mock style="display: none" class="bb-editor-toolbar-button ${className}"></ally-mock>`
                );
                $(this.container).find('.bb-editor-toolbar')
                    .prepend(elem);
                styleAttributes.forEach((a) => elemStyle[a] = elem.css(a));
                elem.detach();
            }
            return {level, name, 'style': elemStyle, tag};
        });
    }
}
