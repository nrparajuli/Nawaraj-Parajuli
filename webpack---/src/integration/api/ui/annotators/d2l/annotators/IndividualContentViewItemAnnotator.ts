import * as $ from 'jquery';

import {Ui} from 'src/integration/api/ui/Ui';
import {D2lConfig} from '../D2lConfig';
import {D2lContentItem} from '../D2lContentItem';
import {ID2lContentItemAnnotator} from '../ID2lContentItemAnnotator';
import {D2lAlternativeFormatsButton} from './templates/D2lAlternativeFormatsButton';
import {D2LScoreIndicatorTemplate} from './templates/D2lScoreIndicatorTemplate';

/**
 * An annotator that's responsible for adding an IF launcher in the header and a "Download AF" button in the button bar.
 */
export class IndividualContentViewItemAnnotator implements ID2lContentItemAnnotator {

    public annotate(config: D2lConfig, item: D2lContentItem, ui: Ui): boolean {
        // Indicates whether the DOM was manipulated by this annotator
        let hasDomUpdate = false;

        // Add a "Download AF" button
        if (config.parsedToken.can_download_content) {
            item.$el.attr('data-ally-file-eid', item.eid);
            const $buttonRow = item.$el.parent();
            const aafButtonTpl = new D2lAlternativeFormatsButton();
            const $aafButton = $(aafButtonTpl.apply({
                'baseUrl': config.baseUrl,
                'contentRef': item.id,
                'i18n': ui.i18n
            }));
            $buttonRow.append($aafButton);
            hasDomUpdate = true;
        }

        // Add a score indicator if necessary
        if (config.parsedToken.can_update_content) {
            const scoreIndicatorTpl = new D2LScoreIndicatorTemplate();
            const $scoreIndicator = $(scoreIndicatorTpl.apply({'contentRef': item.id}));
            const $headerBox = $('.d2l-page-header .d2l-page-header-side > .d2l-inline').first();
            $headerBox.prepend($scoreIndicator);
            hasDomUpdate = true;
        }

        return hasDomUpdate;
    }
}
