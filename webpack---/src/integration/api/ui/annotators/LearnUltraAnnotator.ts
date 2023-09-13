
import { LearnUltraUtil } from 'src/integration/api/ui/annotators/learn-ultra/LearnUltraUtil';
import { QuillEditorListener } from 'src/shared/wysiwyg/quill/QuillEditorListener';
import { Ui } from '../Ui';
import { UiWysiwygFeedbackController } from '../wysiwyg/UiWysiwygFeedbackController';

const coreCssPath = require('src/integration/learn/ultra.css');

export class LearnUltraAnnotator {

    public static async annotate(ui: Ui, window: Window) {
        // TODO: ALLYPD-5699 ALLYPD-5700: Liaise with Ultra team on making this configurable from their side
        if (!LearnUltraUtil.isUltra(window)) {
            return;
        }

        Ui.addStylesheet(`${ui.client.config.baseUrl}/${coreCssPath}`, 'ally-learn-ultra-styles');

        const {flags} = await ui.client.getClientInfo(ui.config.courseId);
        if (flags.ifLaunchFromWysiwyg) {
            const controller = new UiWysiwygFeedbackController(
                ui.client.config.baseUrl,
                ui,
                new QuillEditorListener(
                    ui.client.config.baseUrl,
                    ui.i18n
                ),
            );
            controller.start();
        }
    }
}
