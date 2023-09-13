import {EventEmitter} from 'events';
import * as $ from 'jquery';

import {HtmlPreviewDriver} from 'src/integration/api/ui/annotators/web/HtmlPreviewDriver';
import {IBlock} from 'src/integration/api/ui/InstructorFeedback';
import * as NullUtil from 'src/shared/NullUtil';
import {applyWysiwygFix, getDisplayableElement, parseBlockLevel} from 'src/shared/wysiwyg/WysiwygFeedbackUtil';
import {IEditorController} from '../IEditorController';

/** The data representation model for the Moodle. */
interface IMoodle {
    /** The Moodle strings resources. */
    'str': {
        /** Atto format strings. */
        'atto_title': { [_: string]: string }
    };
}

export class AttoEditorController implements IEditorController {
    public static submitButtonIds = ['#id_submitbutton2', '#id_submitbutton'];
    // Based on https://github.com/moodle/moodle/blob/master/lib/editor/atto/plugins/title/lang/en/atto_title.php
    public static formatMetadataFields = ['privacy:metadata', 'pluginname'];

    private emitter = new EventEmitter();
    private observer?: MutationObserver;
    private indicator?: HTMLElement;
    private previewDriver?: HtmlPreviewDriver;
    // Strings and definitions were taken from
    // https://github.com/damyon/moodle-editor_atto/blob/master/plugins/title/lang/en/atto_title.php
    // https://github.com/damyon/moodle-editor_atto/blob/master/plugins/title/yui/src/button/js/button.js
    private blockStyles: IBlock[] = [
        {
            'level': null,
            'name': this.i18n.ATTO_BLOCK_QUOTED as string,
            'tag': 'blockquote'
        },
        {
            'level': 3,
            'name': this.i18n.ATTO_BLOCK_HEADING_1 as string,
            'tag': 'h3'
        },
        {
            'level': 4,
            'name': this.i18n.ATTO_BLOCK_HEADING_2 as string,
            'tag': 'h4'
        },
        {
            'level': 5,
            'name': this.i18n.ATTO_BLOCK_HEADING_3 as string,
            'tag': 'h5'
        },
        {
            'level': null,
            'name': this.i18n.ATTO_BLOCK_PLAIN as string,
            'tag': 'p'
        },
        {
            'level': null,
            'name': this.i18n.ATTO_BLOCK_PRE as string,
            'tag': 'pre'
        }
    ];
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
        private readonly hideAccessibilityPlugin: boolean,
        private readonly jq: JQueryStatic = (window as any).jQuery ? (window as any).jQuery : $
    ) {
    }

    public async activate(indicator: HTMLElement): Promise<void> {
        // Remove the button completely as it might be hidden/shown through the Atto editor controls
        if (this.hideAccessibilityPlugin) {
            this.getEditorContainer().find('.accessibility_group').remove();
        }

        const indicatorContainer =
            $('<div class="ally-score-meter-container-toolbar ally-score-meter-toolbar-atto"></div>)')[0];
        indicatorContainer.appendChild(indicator);
        this.addScoreMeter(indicatorContainer);
        this.indicator = indicatorContainer;

        document.body.classList.add('ally-wysiwyg-feedback-active');

        // In Moodle Snap theme, there is a parent that can cut off the display of the indicator. Man it would
        // be great if CSS finally adopted :has(...) then we could just put this in CSS
        $(this.container).parents('[data-fieldtype="editor"]').css('overflow', 'visible');
        // Autosave feature may trigger while IF is opened also persisting highlight attributes into draft,
        // in combination with draft restore ally attributes will be persisted
        AttoEditorController.submitButtonIds.forEach((id) =>
            $(id).on('click', () => this.removeHighlightAttributes())
        );
    }

    public addScoreMeter(indicatorContainer: HTMLElement): void {
        $(this.container)
            .parents('.fitem')
            .children()
            .eq(1)
            .prepend(indicatorContainer);
    }

    public async applyFix(ruleName: string, locators: string[], fixOptions: any) {
        this.previewDriver?.resetSelection();
        applyWysiwygFix(ruleName, locators, fixOptions, this.getAttoDocumentEditor().get(0));
        // If no user interaction is performed after quickfix, editor form text field is not updated
        this.forceFormUpdate();
    }

    public belongsToEditor(el: HTMLElement): boolean {
        return $.contains(this.getEditorContainer().get(0), el) ||
            // Atto have dialog boxes placed out of RTE container just to make our life more miserable...
            this.jq(el).parents('.moodle-dialogue-base').length === 1;
    }

    public deactivate(): void {
        this.deactivated = true;
        this.observer?.disconnect();
        this.observer = undefined;
        this.emitter.removeAllListeners();
        this.disableFeedbackMode();
        if (NullUtil.hasValue(this.indicator)) {
            this.indicator.remove();
            this.indicator = undefined;
        }
        document.body.classList.remove('ally-wysiwyg-feedback-active');
        AttoEditorController.submitButtonIds.forEach((id) => $(id).unbind('click'));
    }

    public disableFeedbackMode(): void {
        this.getEditorContainer().removeClass('ally-wysiwyg-feedback-atto-fullscreen');

        if (NullUtil.hasValue(this.previewDriver)) {
            this.previewDriver.destroy();
            this.previewDriver = undefined;
        }
    }

    public isDeactivated(): boolean {
        return this.deactivated;
    }

    public enableFeedbackMode(instructorFeedbackWindow: Window): void {
        const parent = this.getEditorContainer();
        parent.addClass('ally-wysiwyg-feedback-atto-fullscreen');

        this.previewDriver = new HtmlPreviewDriver(
            this.baseUrl,
            this.i18n,
            {
                'contentContainer': this.container,
                'indicatorContainer': parent[0],
                'scrollContainer': this.container
            },
            this.onSelection.bind(this),
            100
        );
        this.previewDriver.start({
            'highlightInterval': 500,
            'parentWindow': instructorFeedbackWindow,
            'preprocessInterval': false,
        });
    }

    public getFeedbackContainer(): HTMLElement | undefined {
        return undefined;
    }

    public onContentChange(cb: (content: string) => void): void {
        const editorRef = this.getAttoDocumentEditor();
        const observerOptions = {
            'attributeFilter': ['alt', 'class', 'style'],
            'attributes': true,
            'characterData': true,
            'childList': true,
            'subtree': true
        };

        this.observer = new MutationObserver(() => {
            const content = editorRef.html();
            cb(content);
        });
        this.observer.observe(editorRef.get()[0], observerOptions);
    }

    public onContentInit(cb: (content: string) => void): void {
        const content = this.getAttoDocumentEditor().html();
        cb(content);
    }

    public onForceDisableFeedbackMode(cb: () => void): void {
        this.emitter.on('force-disable-feedback-mode', cb);
    }

    public getBlocks(): IBlock[] {
        const rteHeadingBlocks = NullUtil.whenHasValue(
            (window as any).M as IMoodle,
            (v) => v?.str?.atto_title
        );

        if (NullUtil.hasValue(rteHeadingBlocks)) {
            return Object.keys(rteHeadingBlocks)
                .filter((k) => !AttoEditorController.formatMetadataFields.includes(k))
                .map((tag) => ({
                    'level': parseBlockLevel(tag),
                    'name': rteHeadingBlocks[tag],
                    tag
                }));
        }
        return this.blockStyles;
    }

    public async onSelection(issue?: HTMLElement): Promise<void> {
        this.emitter.emit('selection-changed', getDisplayableElement(issue));
    }

    public onSelectionChange(cb: (content: string) => void): void {
        this.emitter.on('selection-changed', cb);
    }

    private getAttoDocumentEditor(): JQLite {
        return this.jq(this.container);
    }

    private getEditorContainer(): JQLite {
        return this.getAttoDocumentEditor().parents('.editor_atto_wrap');
    }

    private forceFormUpdate() {
        return this.getEditorContainer()
            .find('textarea.form-control')
            .val(this.getAttoDocumentEditor().html());
    }

    private removeHighlightAttributes() {
        const filtered = Object.values(HtmlPreviewDriver.customAttributes)
            .map((attr) => {
                    const elems = $(this.container).find(`*[${attr}]`);
                    elems.removeAttr(attr);
                    return elems.length;
                }
            ).reduce((a, b) => a + b, 0);

        // Moodle optional form fields must have empty string to remain optional,
        // thus textArea can be altered only when any ally content needs to be reprocessed
        if (filtered > 0) {
            this.forceFormUpdate();
        }
        this.onSelection().catch((err) => console.error(err));
    }
}
