
import * as $ from 'jquery';

import { throttleAsync } from 'src/shared/FunctionUtil';
import * as NullUtil from 'src/shared/NullUtil';
import { IEditorController } from 'src/shared/wysiwyg/IEditorController';
import { IEditorListener } from 'src/shared/wysiwyg/IEditorListener';
import { IBaseFeedback, transformHtmlFragmentExplanationData } from 'src/shared/wysiwyg/WysiwygFeedbackUtil';

import { PartialFalsey } from 'src/integration/api/PartialFalsey';
import { ILaunchCallbacks, ILaunchOpts } from 'src/integration/api/ui/InstructorFeedback';
import { ScoreMeter } from 'src/integration/api/ui/ScoreMeter';
import { II18n } from 'src/integration/api/ui/Ui';
import { AllyDI } from 'src/integration/di/DI';
import {whenHasValue} from 'src/shared/NullUtil';

export interface IWysiwygFeedbackControllerRunner {
    /** A signal from the editor requires for the IF to be closed */
    closeInstructorFeedback: () => void;

    /** Generate HTML feedback for the given HTML content */
    generateHtmlFeedback: (content: string) => Promise<IBaseFeedback | undefined>;

    /** Open the IF */
    launchInstructorFeedback: (opts: PartialFalsey<ILaunchOpts>, callbacks: PartialFalsey<ILaunchCallbacks>) => void;

    /** Content changes in the editor has triggered new feedback that can be made available (i.e. into the IF) */
    updateLiveFeedback: (liveFeedback: IBaseFeedback) => void;

    /** When new elements are highlighted in the editor panel, pass the element back to the IF panel to display for
     * screen-readers
     */
    updateLiveFeedbackContent?: (liveFeedbackContent: string) => void;
}

/** The top level WYSIWYG feedback controller that orchestrates the listener and editors for feedback mode. */
export class WysiwygFeedbackController {

    private liveContent: Record<string, string | undefined> = {};
    private liveFeedback: Record<string, IBaseFeedback | undefined> = {};
    private activeEditorId: string | undefined;

    constructor(
        private readonly baseUrl: string,
        /** The platform name. */
        private readonly platformName: string,
        /** The user's resolved locale. */
        private readonly locale: string,
        private readonly i18n: II18n,
        /** The listener that notifies when there are new editors available. */
        private readonly listener: IEditorListener,
        /** A set of functions that indicate how to interact with instructor feedback. */
        private readonly runner: IWysiwygFeedbackControllerRunner,
        /** IF parent container override. */
        private readonly feedbackContainer?: HTMLElement
    ) {
        AllyDI.default(this.baseUrl);
    }

    /** Start the listener and bind the orchestrating functionality. */
    public start(): void {
        this.listener.onAddEditor((id, editor) => this.onAddEditor(id, editor));
        this.listener.onRemoveEditor((id, editor) => {
            editor.deactivate();
            delete this.liveContent[id];
            delete this.liveFeedback[id];
            this.activeEditorId = undefined;
        });
        this.listener.start();
    }

    /** Stop the listener and destroy all resources. */
    public stop(): void {
        this.listener.stop();
    }

    /** Create the interactive/animated score meter and add it to the DOM, depending on the editor implementation */
    private async addScoreMeter(id: string, editor: IEditorController, initLiveFeedback: IBaseFeedback) {
        const {el: scoreMeterEl, updateScore} = ScoreMeter(
            initLiveFeedback.feedback.score,
            this.locale,
            this.i18n
        );
        await editor.activate(scoreMeterEl);

        // Launch instructor feedback when the score indicator is clicked
        $(scoreMeterEl).on('click', (ev: JQuery.ClickEvent) => {
            ev.preventDefault();
            ev.stopPropagation();

            this.activeEditorId = id;
            const liveFeedback = this.liveFeedback[id];

            // The DOM element the instructor feedback iframe should be appended to. Note that in certain LMSes
            // this element might be in a shadow DOM. This makes refering back to our iframe trickier later on.
            const appendTo = NullUtil.orElse(
                this.feedbackContainer,
                NullUtil.orElse(editor.getFeedbackContainer(), document.body)
            );
            this.runner.launchInstructorFeedback(
                {
                    'allowFocus': (target) => editor.belongsToEditor(target),
                    appendTo,
                    'editorBlocks': editor.getBlocks(),
                    liveFeedback,
                },
                {
                    'closed': () => editor.disableFeedbackMode(),
                    'fixHtmlIssue': (ruleName: string, locators: string[], fixOptions: any) =>
                        editor.applyFix(ruleName, locators, fixOptions),
                }
            );

            // Send the editor into feedback mode
            const iframeEl = $(appendTo).find('.ally-iframe')[0] as HTMLIFrameElement;
            editor.enableFeedbackMode(iframeEl.contentWindow!);
        });

        return {'el': scoreMeterEl, updateScore};
    }

    private async generateHtmlFeedback(id: string): Promise<IBaseFeedback | undefined> {
        const content = this.liveContent[id];
        if (!NullUtil.hasValue(content)) {
            return;
        }

        const feedback = await this.runner.generateHtmlFeedback(content);
        if (NullUtil.hasValue(feedback)) {
            feedback.explanationData = transformHtmlFragmentExplanationData(
                document,
                feedback.explanationData,
                content,
                this.platformName
            );
        }

        this.liveFeedback[id] = feedback;

        return feedback;
    }

    private onAddEditor(id: string, editor: IEditorController) {
        editor.onContentInit(async (initLiveContent) => {
            this.liveContent[id] = initLiveContent;
            try {
                // Initially check the content feedback.
                const initLiveFeedback = await this.generateHtmlFeedback(id);
                // Bail out if editor is no longer available.
                if (editor.isDeactivated()) {
                    return;
                }
                // Bail out if axe failed on initial scoring.
                if (!NullUtil.hasValue(initLiveFeedback)) {
                    return editor.deactivate();
                }

                const {updateScore} = await this.addScoreMeter(id, editor, initLiveFeedback);

                // Throttle our changes, ensuring we can never have two at one time
                const handleChange = throttleAsync(async () => {
                    const liveFeedback = await this.generateHtmlFeedback(id);
                    if (!NullUtil.hasValue(liveFeedback)) {
                        return;
                    }

                    updateScore(liveFeedback.feedback.score);
                    if (this.activeEditorId === undefined || this.activeEditorId === id) {
                        this.runner.updateLiveFeedback(liveFeedback);
                    }
                }, {
                    'onError': (e) => console.warn(`Failed to process WYSIWYG content update ${id}.`, e)
                });

                editor.onSelectionChange((content) =>
                  whenHasValue(this.runner.updateLiveFeedbackContent, (cb) => cb(content))
                );

                // When content changes, score it
                editor.onContentChange((nextContent) => {
                    this.liveContent[id] = nextContent;
                    handleChange();
                });

                // When the editor signals to disable feedback mode, close instructor feedback
                editor.onForceDisableFeedbackMode(() => {
                    this.activeEditorId = undefined;
                    this.runner.closeInstructorFeedback();
                });
            } catch (e) {
                console.warn(`Failed to process WYSIWYG content ${id}.`, e);
                editor.deactivate();
            }
        });
    }

}
