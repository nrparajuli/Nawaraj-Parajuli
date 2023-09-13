
import * as $ from 'jquery';

import {Ui} from 'src/integration/api/ui/Ui';
import * as CollectionUtil from 'src/shared/CollectionUtil';
import * as NullUtil from 'src/shared/NullUtil';
import {D2lConfig, D2lPageType} from './D2lConfig';
import {D2lContentItemType} from './D2lContentItemType';
import { ID2lContentItemAnnotatorFactory } from './ID2lContentItemAnnotator';

const contentItemIdRegex = /^d2l_content_[\d]+_([\d]+)$/;

export class D2lContentItem {

    /**
     * Parse an array of D2L content items from the page.
     *
     * @param config The [D2lConfig], containing the page type we can use to determine how to parse the page
     */
    public static fromPage(config: D2lConfig, $page: JQuery<HTMLElement>): D2lContentItem[] {
        switch (config.pageType) {
            case D2lPageType.TableOfContents:
                // The table of contents page lists a bunch of simple links to content items
                const tableOfContentsTopicLinks = $page
                    .find('ul.d2l-datalist .d2l-topic-view .d2l-link')
                    .toArray()
                    .map((el) => D2lContentItem.fromElement($(el), D2lContentItemType.TableOfContentsTopicLink));

                // It also lists modules and their direct child modules (if any)
                const tableOfContentsModules = $page
                    .find('.d2l-htmlblock')
                    .toArray()
                    .map((el) => D2lContentItem.moduleFromHtmlBlock($(el)));
                return CollectionUtil.compact(tableOfContentsTopicLinks.concat(tableOfContentsModules));
            case D2lPageType.IndividualContentView:
                // Sizzle (jQuery's query selector) sets an id on certain elements that do not have an id of their own.
                // The button bar resides in a div that has no id. This `fromPage` logic runs in a tight loop and seems
                // to have a slight performance impact in Chrome. To avoid this, set an id on the bar once to avoid any
                // further DOM modifications.
                const $btnBar = $page.find('#ContentView').next();
                if (!NullUtil.hasValue($btnBar.attr('id'))) {
                    $btnBar.attr('id', 'd2l_btn_bar');
                }

                // The individual content view page appears holds a download button with an ID that holds the external
                // id for the image
                const $downloadButton = $btnBar.find('.d2l-button[id*="d2l_content_"]');
                const ids = D2lContentItem.extractIdsFromElement($downloadButton);
                if (NullUtil.hasValue(ids)) {
                    const [id, eid] = ids;
                    const contentItems = [];
                    contentItems.push(new D2lContentItem(
                        D2lContentItemType.IndividualContentViewItem,
                        $downloadButton,
                        id,
                        eid
                    ));

                    const $contentViewImage = $page.find('.d2l-fileviewer-image img.d2l-fileviewer-rendered-image');
                    if ($contentViewImage.length > 0) {
                        const imgId = `ally_d2l_${eid}`;
                        $contentViewImage.attr('id', imgId);
                        contentItems.push(new D2lContentItem(
                            D2lContentItemType.ContentViewImage,
                            $contentViewImage,
                            imgId,
                            eid
                        ));
                    }
                    return contentItems;
                } else {
                    return [];
                }
            case D2lPageType.NewContentExperienceView:
                // D2L has provided the d2l_content_<course>_<file> on the content-panel div. The Ally UI api can't
                // handle data-ally attributes on a div however. If an embedded image is present, the image will be
                // used, if there's no image, a hidden link will be added that will carry the data-ally attributes.
                const $contentPanel = $('.content-panel');
                let $a = $contentPanel.find('a#ally-content-item');
                const newContentExperienceIds = D2lContentItem.extractIdsFromElement($contentPanel);
                if (NullUtil.hasValue(newContentExperienceIds)) {
                    const [id, eid] = newContentExperienceIds;

                    // Determine which element will hold the ally attributes. Use the embedded image if it's present,
                    // create a surrogate hidden link otherwise (if it didn't exist already)
                    let $allyEl = $a;
                    const $img = $contentPanel.find('.vui-fileviewer-image-container img.vui-fileviewer-image');
                    if ($img.length === 1) {
                        $allyEl = $img;
                        // The image is lazy loaded into the DOM, there's a high chance that a hidden link was added at
                        // an earlier stage. Remove the hidden link if it's there.
                        $a.remove();
                    } else if ($a.length === 0) {
                        $a = $('<a id="ally-content-item" href="" style="display: none"></a>');
                        $contentPanel.append($a);
                        $allyEl = $a;
                    }

                    //  The user can select a different file without reloading the page, so each time this function
                    // runs, we need to ensure that the correct attributes are present
                    if ($allyEl.attr('data-ally-file-eid') !== eid) {
                        $allyEl.attr('data-ally-file-eid', eid);
                        $allyEl.attr('data-ally-content-id', null);
                    }

                    return [new D2lContentItem(D2lContentItemType.NewContentExperienceView, $allyEl, id, eid)];
                } else {
                    $a.remove();

                    // This codepath can be triggered when a user navigates from a supported file to a module. At that
                    // point there might be an AF link and score indicator in the DOM. The NCEViewAnnotator won't run
                    // after this cycle however, as no supported content is in the DOM anymore. Remove the items that
                    // might've been added prior.
                    $contentPanel.find('.ally-container').remove();

                    return [];
                }
        }
    }

    /**
     * Given an element and the type of content item it represents, extract its [[D2lContentItem]] instance with the
     * relevant data pulled off the DOM.
     *
     * @param config The D2l config
     * @param $el The DOM element
     * @param type The type of content item instance we expect this to be
     */
    private static fromElement($el: JQuery<HTMLElement>, type: D2lContentItemType): D2lContentItem | null {
        const ids = D2lContentItem.extractIdsFromElement($el);
        if (NullUtil.hasValue(ids)) {
            const [id, eid] = ids;
            return new D2lContentItem(type, $el, id, eid);
        } else {
            return null;
        }
    }

    private static extractIdsFromElement($el: JQuery<HTMLElement>): [string, string] | null {
        const id = $el.attr('id');
        if (typeof id === 'string') {
            const eid = extractRegexGroup(contentItemIdRegex, id, 1);
            if (NullUtil.hasValue(eid)) {
                return [id, eid];
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    /**
     * Convert a `d2l-htmlblock` element into a [[D2lContentItem]]
     *
     * @param $el The DOM element to convert
     */
    private static moduleFromHtmlBlock($el: JQuery<HTMLElement>): D2lContentItem | null {
      const nDataListParents = $el.parents('.d2l-datalist').length;
      if (nDataListParents === 1) {
          // This is a top-level module
          const moduleId = $el.parents('.d2l-collapsepane').find('.d2l-expandcollapse').data('key');
          if (NullUtil.hasValue(moduleId)) {
              const eid = `application/x-module:${moduleId}`;
              return new D2lContentItem(D2lContentItemType.TableOfContentsModule, $el, eid, eid);
          } else {
              return null;
          }
      } else if (nDataListParents === 2) {
          // This is a child module
          const moduleId = $el.closest('.d2l-datalist-item-content')
              .find('d2l-dropdown,d2l-dropdown-context-menu')
              .data('placeholderkey');
          if (NullUtil.hasValue(moduleId)) {
              const eid = `application/x-module:${moduleId}`;
              return new D2lContentItem(D2lContentItemType.TableOfContentsChildModule, $el, eid, eid);
          } else {
              return null;
          }
      } else {
          // A selected child-module
          const placeholderId = $el
            .closest('.d2l-form')
            .siblings('.d2l-placeholder')
            .first()
            .attr('id');
          if (NullUtil.hasValue(placeholderId) && placeholderId.startsWith('placeholderid')) {
              const moduleId = placeholderId.replace(/^placeholderid/, '');
              const eid = `application/x-module:${moduleId}`;
              return new D2lContentItem(D2lContentItemType.TableOfContentsChildModule, $el, eid, eid);
          } else {
              return null;
          }
      }
    }

    /**
     *
     * @param type The [[D2lContentItemType]] of the given element
     * @param $el The DOM element that represents the content item and will be annotated with a `data-ally-content-id`
     *            attribute.
     * @param id The id to use as the ally-content-id
     * @param eid The external id as used in the Ally uploads table
     */
    constructor(
        public readonly type: D2lContentItemType,
        public readonly $el: JQuery<HTMLElement>,
        public readonly id: string,
        public readonly eid: string
    ) {}

    /**
     * Annotate this content item, placing the Ally integration control elements onto the DOM in such a way that running
     * the Ally UI API over the DOM will bind necessary handlers to show/hide and launch functionality such as
     * instructor feedback and alternative formats.
     *
     * A content item will only be annotated once. Further attempts to annotate an item that has already been annotated
     * should bail out performantly.
     *
     * @param config The D2L config
     */
    public annotate(config: D2lConfig, ui: Ui): boolean {
        // Break early if this already has been annotated
        if (this.$el[0].hasAttribute('data-ally-content-id')) {
            return false;
        }

        // All content items will have a content id applied to them
        this.$el.attr('data-ally-content-id', this.id);
        return ID2lContentItemAnnotatorFactory(this.type).annotate(config, this, ui);
    }
}

function extractRegexGroup(regex: RegExp, str: string, i: number): string | null {
    const match = regex.exec(str);
    if (match) {
        return NullUtil.orNull(match[i]);
    } else {
        return null;
    }
}
