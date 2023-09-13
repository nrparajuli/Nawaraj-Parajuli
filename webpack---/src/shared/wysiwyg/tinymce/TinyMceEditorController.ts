
import * as $ from 'jquery';

import { HtmlPreviewDriver } from 'src/integration/api/ui/annotators/web/HtmlPreviewDriver';
import * as NullUtil from 'src/shared/NullUtil';

import {EventEmitter} from 'events';
import {IBlock} from 'src/integration/api/ui/InstructorFeedback';
import { applyWysiwygFix, getDisplayableElement } from 'src/shared/wysiwyg/WysiwygFeedbackUtil';
import { IEditorController } from '../IEditorController';
import { ITinyMceEditorFacade } from './ITinyMceEditorFacade';

export class TinyMceEditorController implements IEditorController {
    private indicator?: HTMLElement;
    private isFeedbackModeEnabled = false;
    private previewDriver?: HtmlPreviewDriver;
    private deactivated: boolean = false;
    private emitter = new EventEmitter();

    constructor(
        private readonly baseUrl: string,
        private readonly i18n: any,
        public readonly facade: ITinyMceEditorFacade,
        private readonly hideAccessibilityPlugin: boolean
    ) {
        if (this.hideAccessibilityPlugin) {
            this.facade.hideAccessibilityPlugin();
        }
    }

    public async activate(indicator: HTMLElement): Promise<void> {
        this.facade.annotateEditor();

        // Fallback for Learn as native button for AX can be located only via title attribute that is localized
        if (this.hideAccessibilityPlugin) {
            this.facade.hideAccessibilityPlugin();
        }

        const indicatorContainer = $('<div class="ally-score-meter-container-toolbar"></div>)')[0];
        indicatorContainer.appendChild(indicator);
        this.addScoreMeter(indicatorContainer);
        this.indicator = indicatorContainer;

        document.body.classList.add('ally-wysiwyg-feedback-active');

        // In Moodle Snap theme, there is a parent that can cut off the display of the indicator. Man it would
        // be great if CSS finally adopted :has(...) then we could just put this in CSS
        NullUtil.whenHasValue(this.facade.getContainer(), (container) =>
            $(container).parents('[data-fieldtype="editor"]').css('overflow', 'visible')
        );
    }

    public addScoreMeter(indicatorContainer: HTMLElement): void {
        this.facade.getContainer()?.prepend(indicatorContainer);
    }

    public async applyFix(ruleName: string, locators: string[], fixOptions: any): Promise<void> {
        const $content = $('<div></div>').html(this.facade.getContent());

        this.previewDriver?.resetSelection();
        if (applyWysiwygFix(ruleName, locators, fixOptions, $content[0])) {
            this.facade.saveContent($content[0].innerHTML);
        }
    }

    public belongsToEditor(el: HTMLElement): boolean {
        const $el = $(el);
        const container = this.facade.getContainer();
        const selectorsBelongToEditor = [
            '.mceListBoxMenu',
            '.tox',
            '.tox-menu',
            '.tox-dialog',
            '[data-mce-component="true"][role="dialog"]',
            '.d2l-htmleditor-wc'
        ];
        if (!NullUtil.hasValue(container)) {
            return false;
        }
        return $.contains(container, el) ||
            NullUtil.hasValue(selectorsBelongToEditor.find((s) => $el.is(s))) ||
            NullUtil.hasValue(selectorsBelongToEditor.find((s) => $el.parents(s).length > 0));
    }

    public deactivate(): void {
        this.deactivated = true;
        this.disableFeedbackMode();
        this.facade.destroy();
        document.body.classList.remove('ally-wysiwyg-feedback-active');
        if (NullUtil.hasValue(this.indicator)) {
            this.indicator.remove();
            this.indicator = undefined;
        }
    }

    public disableFeedbackMode(): void {
        this.facade.ensureNotFullScreen();
        this.isFeedbackModeEnabled = false;
        if (NullUtil.hasValue(this.previewDriver)) {
            this.previewDriver.destroy();
            this.previewDriver = undefined;
        }
    }

    public isDeactivated(): boolean {
        return this.deactivated;
    }

    public enableFeedbackMode(instructorFeedbackWindow: Window): void {
        this.isFeedbackModeEnabled = true;
        this.facade.ensureFullScreen();

        const doc = this.facade.getDocument();
        this.previewDriver = new HtmlPreviewDriver(
            this.baseUrl,
            this.i18n,
            {'contentContainer': doc.body},
            this.onSelection.bind(this)
        );
        this.previewDriver.start({
            'parentWindow': instructorFeedbackWindow,
            'preprocessInterval': false
        });
    }

    public getFeedbackContainer(): HTMLElement | undefined {
        return this.facade.getContainer()?.parentElement!;
    }

    public onContentChange(cb: (content: string) => void): void {
        this.facade.onChange(() => cb(this.facade.getContent()));
    }

    public onContentInit(cb: (content: string) => void): void {
        this.facade.onInit(() => {
            if (this.facade.isSupported()) {
                cb(this.facade.getContent());
            }
        });
    }

    public onForceDisableFeedbackMode(cb: () => void): void {
        this.facade.onFullScreenStateChanged((isFullScreen) => {
            if (this.isFeedbackModeEnabled && !isFullScreen) {
                cb();
            }
        });
    }

    public getBlocks(): IBlock[] {
        return this.facade.getBlocks();
    }

    public async onSelection(selectedElement?: HTMLElement): Promise<void> {
        this.emitter.emit('selection-changed', getDisplayableElement(selectedElement));
    }

    public onSelectionChange(cb: (content: string) => void): void {
        this.emitter.on('selection-changed', cb);
    }
}
