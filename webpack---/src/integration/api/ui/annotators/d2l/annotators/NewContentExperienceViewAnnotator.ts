import * as $ from 'jquery';

import {Target} from 'src/integration/api/ui/InstructorFeedback';
import {Ui} from 'src/integration/api/ui/Ui';

import {D2lConfig} from '../D2lConfig';
import {D2lContentItem} from '../D2lContentItem';
import {ID2lContentItemAnnotator} from '../ID2lContentItemAnnotator';
import {D2lAlternativeFormatsIconLauncher} from './templates/D2lAlternativeFormatsIconLauncher';
import {D2LScoreIndicatorTemplate} from './templates/D2lScoreIndicatorTemplate';

/** An annotator that's responsible for adding an IF launcher a "Download AF" button in the button bar. */
export class NewContentExperienceViewAnnotator implements ID2lContentItemAnnotator {

    public annotate(config: D2lConfig, item: D2lContentItem, ui: Ui): boolean {
        // Indicates whether the DOM was manipulated by this annotator
        let hasDomUpdate = false;

        // All updates are done to the header button tray. As the DOM updates on-the-fly when a user selects a new file,
        // ensure that we always start with an empty container to manipulate
        const $contentPanel = item.$el.parents('.content-panel');
        const $headerTray = $contentPanel.find('#content-header .header-button-tray');
        let $allyContainer = $headerTray.find('.ally-container');
        if ($allyContainer.length === 0) {
            $allyContainer = $('<div class="ally-container" />');
            $headerTray.prepend($allyContainer);
        } else {
            $allyContainer.children().remove();
        }

        // Add a score indicator if necessary
        if (config.parsedToken.can_update_content) {
            // Use the source of embedded images as the file preview URL
            if (item.$el[0].tagName.toLowerCase() === 'img') {
                item.$el.attr('data-ally-file-preview-url', item.$el.attr('src') as string);

                // D2L adds a blank alt attribute, which is incorrect and trips up our score indicator logic
                item.$el.attr('alt', null);
            }

            const scoreIndicatorTpl = new D2LScoreIndicatorTemplate();
            const $scoreIndicator = $(scoreIndicatorTpl.apply({
                'contentRef': item.id,
                'target': Target.Window
            }));
            $allyContainer.prepend($scoreIndicator);
            hasDomUpdate = true;
        }

        // Add a "Download AF" button
        if (config.parsedToken.can_download_content) {
            const aafIcon = new D2lAlternativeFormatsIconLauncher();
            const $aafIcon = $(aafIcon.apply({
                'baseUrl': config.baseUrl,
                'contentRef': item.id,
                'i18n': ui.i18n,
            }));
            $allyContainer.prepend($aafIcon);
            hasDomUpdate = true;
        }

        return hasDomUpdate;
    }
}
