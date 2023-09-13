
import { AllyDI } from 'src/integration/di/DI';
import { IEditorListener } from 'src/shared/wysiwyg/IEditorListener';
import { WysiwygFeedbackController } from 'src/shared/wysiwyg/WysiwygFeedbackController';
import { FileReference } from '../../client/FileReference';
import { IAxeConsumer } from '../FeedbackProvider';
import { InstructorFeedback } from '../InstructorFeedback';
import { Ui } from '../Ui';

const instructorFeedbackUtil = require('src/integration/instructorFeedbackUtil');

/**
 * Implementation of the WysiwygFeedbackController that runs on integration platforms that use our public integration
 * API.
 */
export class UiWysiwygFeedbackController extends WysiwygFeedbackController {
    constructor(
        baseUrl: string,
        ui: Ui,
        listener: IEditorListener
    ) {
        super(
            baseUrl,
            ui.config.platformName,
            ui.config.locale,
            ui.i18n,
            listener,
            {
                'closeInstructorFeedback': () => {
                    // There's actually no use-case for this for newish integrations right now
                },
                'generateHtmlFeedback': async (html: string) => {
                    const di = await AllyDI.get();
                    const consumer = {
                        'consume': (input: JSON) => ui.client.generateAxeFeedback(input),
                        'preprocessType': ui.config.platformName
                    } as IAxeConsumer;

                    return di.feedbackProviderFactory.provide(consumer).feedback(html);
                },
                'launchInstructorFeedback': (opts, callbacks) => {
                    InstructorFeedback.launch(
                        ui,
                        ui.config.courseId!,
                        new FileReference('content:irrelevant', {}, 'RichContent'),
                        opts,
                        callbacks
                    );
                },
                'updateLiveFeedback': (liveFeedback) => instructorFeedbackUtil.updateLiveFeedback(liveFeedback),
                'updateLiveFeedbackContent': (content) => instructorFeedbackUtil.onLiveFeedbackContent(content)
            }
        );
    }
}
