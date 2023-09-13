
import * as $ from 'jquery';
import { IClientInfo } from 'src/integration/api/client/client.model';
import * as NullUtil from 'src/shared/NullUtil';
import { AttoEditorListener } from 'src/shared/wysiwyg/atto/AttoEditorListener';
import {IEditorListener} from 'src/shared/wysiwyg/IEditorListener';
import { TinyMceEditorListener } from 'src/shared/wysiwyg/tinymce/TinyMceEditorListener';

import { JsUiFactory, Ui } from '../../Ui';
import { UiConfig } from '../../UiConfig';
import { UiWysiwygFeedbackController } from '../../wysiwyg/UiWysiwygFeedbackController';
import { MoodleAnnotatorError, MoodleConfig } from './MoodleConfig';
import { AlternativeFormatsIcon } from './templates/AlternativeFormatsIcon';
import { MoodleScoreIndicatorTemplate } from './templates/MoodleScoreIndicatorTemplate';

const coreCssPath = require('src/integration/moodlerooms/moodlerooms.css');
const TinyMcePasteCleanUpv3 = require('src/shared/tinymce/paste/CleanUpV3');

export class MoodleAnnotator {

    public static async annotate(
        $root: JQuery<HTMLElement>,
        $allyLoaderEl: JQuery<HTMLElement>,
        window: Window,
        clientInfoSupplier: (ui: Ui) => Promise<IClientInfo>
    ): Promise<Ui | MoodleAnnotatorError> {
        const config = MoodleConfig.fromPage($allyLoaderEl, window);
        if (typeof config !== 'number') {
            const ui = MoodleAnnotator.getUi(config, window, $root[0], $allyLoaderEl);
            const uiOptions = {
                'domWatch': 500,
                // Some elements need shuffling around depending on the page we're on.
                'preHook': () => MoodleAnnotator.annotateActions($root, ui)
            };

            Ui.addStylesheet(`${config.baseUrl}/${coreCssPath}`, 'ally-moodle-styles');

            let editorListener: IEditorListener | undefined;
            const clientInfo = await clientInfoSupplier(ui);

            // Catch the paste event in the TinyMCE editor and remove any HTML that's related to Ally. This is
            // useful when instructors copy/paste HTML descriptions that include score indicators
            if ((window as any).tinymce !== undefined) {
                TinyMcePasteCleanUpv3.fix('id_summary_editor', '.ally-actions', '.filter-ally-wrapper');
                editorListener = new TinyMceEditorListener(
                    config.baseUrl,
                    ui.i18n,
                    window as any,
                    !clientInfo.flags.nativeWysiwygAxEnabled
                );
            } else if ($('.editor_atto_content_wrap').css('visibility') !== 'hidden') {
                editorListener = new AttoEditorListener(
                    config.baseUrl,
                    ui.i18n,
                    !clientInfo.flags.nativeWysiwygAxEnabled
                );
            }

            // Initialize Wysiwyg feedback functionality
            if (clientInfo.flags.ifLaunchFromWysiwyg && editorListener) {
                const wysiwygFeedbackController = new UiWysiwygFeedbackController(
                    config.baseUrl,
                    ui,
                    editorListener
                );
                wysiwygFeedbackController.start();
            }
            return ui.autoUpdate(uiOptions).then(() => ui);
        } else {
            return Promise.resolve(config);
        }
    }

    public static getUi(
        config: MoodleConfig,
        window: Window,
        root?: HTMLElement,
        $allyLoaderEl?: JQuery<HTMLElement>
    ): Ui {
        let $mock;
        if (NullUtil.hasValue($allyLoaderEl)) {
            const mockAttr = $allyLoaderEl.attr('data-ally-mock');
            if (NullUtil.hasValue(mockAttr)) {
                $mock = (window as any)[mockAttr];
            }
        }
        const client = {
            'auth': () => Promise.resolve({'bearer': config.jwtToken}),
            'baseUrl': config.baseUrl,
            'clientId': config.clientId,
            'jQuery': $mock
        };

        // If the instructor deletes a file through the IF, we should reload the page as the Moodle dom is not going to
        // be in an accurate state any longer.
        let reloadPage = false;
        /* istanbul ignore next */
        const instructorfeedbackCallbacks = {
            ...UiConfig.resolveInstructorFeedbackCallbacks(),
            'closed': () => {
                if (reloadPage) {
                    window.location.reload();
                }
            },
            'deleted': () => reloadPage = true,
            'replacedFile': () => reloadPage = true
        };

        return JsUiFactory({
            client,
            'contentRoot': root,
            'courseId': config.courseId.toString(),
            'instructorfeedback': {
                'callbacks': instructorfeedbackCallbacks,
            },
            'platformName': 'moodle',
            'role': 'anonymous'
        });
    }

    /**
     * Annotate the given HTML with Ally placement elements. Returns `true` if a DOM change was made
     *
     * @param $root The DOM container to annotate
     * @param ui The [[Ui]] instance
     * @returns true if the DOM was modified
     */
    public static annotateActions($root: JQuery<HTMLElement>, ui: Ui): boolean {
        let hasChanges = false;
        $root.find('.ally-actions').each((i, el) => {
            const $actions = $(el);
            const fileId = $actions.find('[data-file-id]').first().attr('data-file-id');

            // Build a unique content reference for this item. Note that it's not sufficient to only use the index as
            // Moodle allows for dynamic re-ordering through drag and drop. Once an element is dropped, the ally-actions
            // holder is cleared. This would then cause collisions with existing items.
            // This should be safe to do as it's not possible to link the same file twice with the same external id.
            const contentReferenceId = `ally-content-${fileId}-${i}`;

            // If the feedback is for a file that is displayed in a card, add css to improve the layout
            const isSnapCard = $actions.parents('li.snap-resource').length > 0;
            if (isSnapCard) {
                $actions.closest('.ally-actions').addClass('ally-actions-tile');
            }

            // Identify the the link or image that we'll be annotating
            let $content = $actions.siblings('a, img');

            // Some images are embedded in a card, use them as the content reference so that any seizure guards can be
            // applied by the UI API.
            if (this.isInSnapImageCard($actions)) {
                $content = $actions.parents('.snap-image').find('.filter-ally-wrapper.ally-image-wrapper img');
            }

            if ($content.length === 1 && NullUtil.hasValue(fileId)) {
                const $feedbackEl = $actions.find('.ally-feedback');
                const $downloadEl = $actions.find('.ally-download');

                // Set the Ally UI API content-id and file-eid attributes on the link or image that can be referred to
                // by other directives
                if ($downloadEl.length > 0 || $feedbackEl.length > 0) {
                    $content.first()
                        .attr('data-ally-content-id', contentReferenceId)
                        .attr('data-ally-file-eid', fileId);
                }

                // Alternative formats
                // Note that images do not have an ally-download placement element
                if ($downloadEl.length === 1) {
                    const addedDlIcon = this.addDownloadIcon($downloadEl, contentReferenceId, ui);
                    hasChanges = hasChanges || addedDlIcon;
                    $downloadEl.addClass('ally-active');
                }

                // Annotate the feedback placement element. Note that this is not available to students
                if ($feedbackEl.length === 1) {
                    $feedbackEl.attr('data-ally-content-ref', contentReferenceId);

                    // Score indicators
                    // Ensure this action is idempotent and doesn't add a placement element multiple times
                    if ($feedbackEl.find('[data-ally-scoreindicator]').length === 0) {
                        const tpl = new MoodleScoreIndicatorTemplate();
                        const asCircle = $content.first()[0].tagName.toLowerCase() === 'img';
                        $feedbackEl
                            .addClass('ally-active')
                            .prepend(tpl.apply({
                                'asCircle': asCircle,
                                'contentRef': contentReferenceId
                            }));
                        if (asCircle) {
                            $feedbackEl.addClass('ally-score-indicator-embedded');
                        }
                        hasChanges = true;
                    }
                }
            }
        });

        // Update all rich content items with the correct Ally UI API attributes
        $root.find('[data-ally-richcontent]').each((i, richContentEl) => {
            const $richContent = $(richContentEl);
            const richContentId = $richContent.attr('data-ally-richcontent')!;
            if (this.isSupported(richContentId)) {
                $richContent.attr('data-ally-richcontent-eid', richContentId);
                $richContent.attr('data-ally-content-id', richContentId);

                // Add a rich content alternative formats placement element
                const addedDlIcon = this.addDownloadIcon($richContent, richContentId, ui);
                hasChanges = hasChanges || addedDlIcon;
            }
        });

        return hasChanges;
    }

    /**
     * Adds the Ally Alternative Format icon to the given element.
     *
     * @param $el The element to add the icon to
     * @param contentReferenceId The reference to the content for which the icon will triger the alternative formats
     * @param ui The [[Ui]] instance
     */
    private static addDownloadIcon($el: JQuery<HTMLElement>, contentReferenceId: string, ui: Ui): boolean {
        if ($el.children('[data-ally-invoke="alternativeformats"]').length === 0) {
            const aafLink = new AlternativeFormatsIcon();
            const $aafButton = $(aafLink.apply({
                'contentRef': contentReferenceId,
                'i18n': ui.i18n
            }));
            $el.prepend($aafButton);
            return true;
        } else {
            return false;
        }
    }

    /**
     * Returns whether the given rich content id is supported by Ally. This can be useful for when Moodle rolls out a
     * new feature, but Ally does not support it yet.
     */
    private static isSupported(richContentId: string): boolean {
        const supportedRichContent: {[key: string]: boolean} = {
            'assign:assign:intro': true,
            'block_html:block_instances:configdata': true,
            'book:book:intro': true,
            'book:book_chapters:content': true,
            'course:course:summary': true,
            'course:course_sections:summary': true,
            'forum:forum:intro': true,
            'forum:forum_posts:message': true,
            'glossary:glossary:intro': true,
            'glossary:glossary_entries:definition': true,
            'label:label:intro': true,
            'lesson:lesson:intro': true,
            'lesson:lesson_pages:contents': true,
            'page:page:content': true,
            'page:page:intro': true,
        };
        const richContentType = richContentId.split(':').slice(0, -1).join(':');
        return supportedRichContent[richContentType];
    }

    /** Whether the given element is located in a snap card */
    private static isInSnapImageCard($el: JQuery<HTMLElement>): boolean {
        return ($el.parents('.snap-image').length > 0);
    }
}
