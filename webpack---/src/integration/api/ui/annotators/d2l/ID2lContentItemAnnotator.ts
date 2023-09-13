import {Ui} from 'src/integration/api/ui/Ui';
import {ContentViewImageAnnotator} from './annotators/ContentViewImageAnnotator';
import {IndividualContentViewItemAnnotator} from './annotators/IndividualContentViewItemAnnotator';
import {NewContentExperienceViewAnnotator} from './annotators/NewContentExperienceViewAnnotator';
import { TableOfContentsModuleAnnotator } from './annotators/TableOfContentsModuleAnnotator';
import {TableOfContentsTopicLinkAnnotator} from './annotators/TableOfContentsTopicLinkAnnotator';
import {D2lConfig} from './D2lConfig';
import {D2lContentItem} from './D2lContentItem';
import {D2lContentItemType} from './D2lContentItemType';

/**
 * A generic annotator for a particular content type in the D2L UI. The content types are enumerated in
 * [D2lContentItemType] and there should be an implementation to annotate each type of content item there.
 */
export interface ID2lContentItemAnnotator {

    /**
     * Annotate the content item.
     *
     * @param config The D2lConfig object
     * @param item The item to annotate
     * @param ui The Ally UI instance carrying any i18n state if necessary
     */
    annotate(config: D2lConfig, item: D2lContentItem, ui: Ui): boolean;
}

/**
 * Find an annotator implementation based on the content item type.
 *
 * @param type The type of content item for which to find an annotator
 */
export function ID2lContentItemAnnotatorFactory(type: D2lContentItemType): ID2lContentItemAnnotator {
    switch (type) {
        case D2lContentItemType.IndividualContentViewItem:
            return new IndividualContentViewItemAnnotator();
        case D2lContentItemType.ContentViewImage:
            return new ContentViewImageAnnotator();
        case D2lContentItemType.TableOfContentsTopicLink:
            return new TableOfContentsTopicLinkAnnotator();
        case D2lContentItemType.NewContentExperienceView:
            return new NewContentExperienceViewAnnotator();
        case D2lContentItemType.TableOfContentsModule:
            return new TableOfContentsModuleAnnotator();
        case D2lContentItemType.TableOfContentsChildModule:
            return new TableOfContentsModuleAnnotator();
    }
}
