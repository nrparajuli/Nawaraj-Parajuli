
import * as $ from 'jquery';

import {Ui} from 'src/integration/api/ui/Ui';
import {D2lConfig, IJsJwtTokenPayload} from '../D2lConfig';
import {D2lContentItem} from '../D2lContentItem';
import {ID2lContentItemAnnotator} from '../ID2lContentItemAnnotator';
import {D2lAlternativeFormatsIconLauncher} from './templates/D2lAlternativeFormatsIconLauncher';
import {D2LScoreIndicatorTemplate} from './templates/D2lScoreIndicatorTemplate';

export class TableOfContentsTopicLinkAnnotator implements ID2lContentItemAnnotator {

    public annotate(config: D2lConfig, item: D2lContentItem, ui: Ui): boolean {
        item.$el.attr('data-ally-file-eid', item.eid);

        // The entire row
        const $row = item.$el.parents('.d2l-topic-view').parent();

        // The 'topic-view' is the left hand content of the row (i.e. filename, icon and dropdown). By default it takes
        // up 70% which is slightly too large to fit anything else in the row. Dynamically resize it so that our column
        // can be added
        const $topic = $row.find('.d2l-topic-view');
        $topic.addClass('ally-d2l-toc-topic-view');

        // If this row has a draft item on the right, the left-hand side will need to be further constrained. However,
        // we want our icons to align in a nice column, so we mark this on the datalist itself.
        const $ul = $row.parents('ul.d2l-datalist');
        if ($row.find('.d2l-menuflyout-custom-content').length > 0) {
            $ul.addClass('ally-d2l-toc-with-draft');
            $row.addClass('ally-d2l-toc-row-with-draft');
        }

        // If the user can only see AFs (i.e. they are a student), then the left hand side of the list can be be a bit
        // longer so that the AF launchers are a bit more right-aligned.
        if (this.canViewOnly(config.parsedToken)) {
            $ul.addClass('ally-d2l-toc-aafs-only');
        }

        // Create a container in which the AF and IF icons can be dropped
        const $allyContainer = $('<div class="ally-d2l-toc-column" />');

        // Alternative formats icon
        if (config.parsedToken.can_download_content) {
            const aafIconTpl = new D2lAlternativeFormatsIconLauncher();
            const $aafIcon = $(aafIconTpl.apply({
                'baseUrl': config.baseUrl,
                'contentRef': item.id,
                'i18n': ui.i18n
            }));
            $allyContainer.append($aafIcon);
        }

        // Score indicator
        if (config.parsedToken.can_update_content) {
            const scoreIndicatorTpl = new D2LScoreIndicatorTemplate();
            const $scoreIndicator = $(scoreIndicatorTpl.apply({'contentRef': item.id}));
            $allyContainer.append($scoreIndicator);
        }

        if ($allyContainer.children().length > 0) {
            // Add both to the row after the topic-view
            $allyContainer.insertAfter($topic);
        }

        return true;
    }

    /**
     * Returns `true` if and only if the user in context can only download content. As soon as the user has further
     * permissions, this returns `false`.
     */
    private canViewOnly(token: IJsJwtTokenPayload): boolean {
        return token.can_download_content && !token.can_update_content && !token.can_delete_content &&
            !token.can_create_content;
    }
}
