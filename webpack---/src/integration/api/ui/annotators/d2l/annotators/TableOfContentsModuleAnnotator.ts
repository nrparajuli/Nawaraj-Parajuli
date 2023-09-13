import * as $ from 'jquery';

import { Ui } from '../../../Ui';
import { D2lConfig } from '../D2lConfig';
import { D2lContentItem } from '../D2lContentItem';
import { ID2lContentItemAnnotator } from '../ID2lContentItemAnnotator';
import { D2lAlternativeFormatsIconLauncher } from './templates/D2lAlternativeFormatsIconLauncher';

export class TableOfContentsModuleAnnotator implements ID2lContentItemAnnotator {

    public annotate(config: D2lConfig, item: D2lContentItem, ui: Ui): boolean {
        item.$el.attr('data-ally-richcontent-eid', item.eid);

        const aafIconTpl = new D2lAlternativeFormatsIconLauncher();
        const $aafIcon = $(aafIconTpl.apply({
            'baseUrl': config.baseUrl,
            'contentRef': item.id,
            'i18n': ui.i18n
        }));
        item.$el.prepend($aafIcon);
        return true;
    }

}
