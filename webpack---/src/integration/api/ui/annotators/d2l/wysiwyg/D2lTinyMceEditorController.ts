
import * as $ from 'jquery';

import * as NullUtil from 'src/shared/NullUtil';

import { TinyMceEditorController } from 'src/shared/wysiwyg/tinymce/TinyMceEditorController';
import { D2lTinyMceEditorFacade } from './D2lTinyMceEditorFacade';

export class D2lTinyMceEditorController extends TinyMceEditorController {

    constructor(
        baseUrl: string,
        i18n: any,
        public readonly d2lFacade: D2lTinyMceEditorFacade,
        hideAccessibilityPlugin: boolean,
        public readonly isNewLessonsExperience: boolean
    ) {
        super(baseUrl, i18n, d2lFacade, hideAccessibilityPlugin);

        if (hideAccessibilityPlugin) {
            const toolbar = this.d2lFacade.getHtmlEditorToolbar();
            const $toolbarStyle = $(`
                <style type="text/css" class="ally-styles">
                    [cmd="d2l-allychecker"] {
                        display: none;
                    }
                </style>
            `);
            toolbar?.shadowRoot?.appendChild($toolbarStyle[0]);
        }
    }

    // TODO: Add override keyword once on Typescript 4.3
    public async activate(indicator: HTMLElement): Promise<void> {
        await super.activate(indicator);

        const htmlEditorEl = this.d2lFacade.getHtmlEditorComponent();
        if (NullUtil.hasValue(htmlEditorEl)) {
            // Add custom styling to the d2l-htmleditor's shadow DOM that allows for full screen mode when opening IF
            const $style = $(`
                <style type="text/css" class="ally-styles">
                    .d2l-htmleditor-container.ally-fullscreen {
                        height: calc(100vh - 70px) !important;
                        position: unset !important;
                    }
                    .d2l-htmleditor-container.ally-fullscreen > div {
                        max-width: unset;
                    }
                </style>
            `);
            htmlEditorEl.shadowRoot?.appendChild($style[0]);
        }
    }

    // TODO: Add override keyword once on Typescript 4.3
    public addScoreMeter(indicatorContainer: HTMLElement): void {
        // The default score meter placement doesn't work in D2L as they've customized the editor and toolbar
        if (this.isNewLessonsExperience) {
            $('.edit-buttons').append(indicatorContainer);
        } else {
            this.getFeedbackContainer()?.appendChild(indicatorContainer);
        }
    }

    // TODO: Add override keyword once on Typescript 4.3
    public getFeedbackContainer(): HTMLElement | undefined {
        // The container in which the IF iframe needs to be added depends on what context we're in
        if (this.isNewLessonsExperience) {
            return $('.new-html-editor-form')[0];
        } else {
            return NullUtil.orElse(this.d2lFacade.getHtmlEditorComponent()?.parentElement, undefined);
        }
    }
}
