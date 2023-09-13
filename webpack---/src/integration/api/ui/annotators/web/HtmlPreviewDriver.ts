
import {createPopper, Instance, Rect} from '@popperjs/core';
import * as $ from 'jquery';
import { ProtoframePubsub } from 'protoframe';

import { previewHtmlIframeProtocol, PreviewHtmlIframeProtocol, SelectLocator } from 'projects/common/feedback/src/components/preview-html/iframe-protocol.model';
import { IssueLocator } from 'projects/common/feedback/src/components/preview-html/issue-locator.model';
import * as NullUtil from 'src/shared/NullUtil';
import { HtmlPreviewSelectionTemplate } from '../../templates/HtmlPreviewSelectionTemplate';

const webCssPath = require('src/integration/css/web.css');

require('jquery-ui/ui/tabbable');

/** Represents a set of attributes to update on an element. */
interface IHTMLElementUpdate {
    /** The attribute values to set */
    attributes: Record<string, string | null>;
}

type SelectedElement = { element: HTMLElement} & SelectLocator;

export interface IHtmlPreviewDriverOpts {
    /** The root content container for xpath locators that are specified. */
    contentContainer?: HTMLElement;
    /** The indicator content container for highlight banner. */
    indicatorContainer?: HTMLElement;
    /** The scroll container that will be scrolled when navigating to an issue. */
    scrollContainer?: Window | HTMLElement;
}

/** A class that handles the state and DOM updates for HTML previews in instructor feedback. */
export class HtmlPreviewDriver {

    /** The custom attributes applied to HTML to select and highlight elements with issues. */
    public static customAttributes = {
        'highlight': 'data-ally-html-preview-highlight',
        'outline-inset': 'data-ally-html-preview-outline-inset',
        'outline-outset': 'data-ally-html-preview-outline-outset',
        'selected': 'data-ally-html-preview-selected',
        'shadow': 'data-ally-html-preview-highlight-shadow'
    };

    /** The class names for custom elements added to HTML to select and highlight elements with issues. */
    public static customElementClassNames = {
        'selectionContainer': 'ally-preview-selection-container'
    };

    public static cleanContainer(container: HTMLElement): void {
        const $container = $(container);
        const removeElementClassNames = Object.values(this.customElementClassNames);
        const removeElementsSelector = removeElementClassNames.map((c) => `.${c}`).join(',');
        const removeAttributes = Object.values(this.customAttributes);

        // Remove the custom preview elements and attributes when converting the editor DOM to HTML
        $container.find(removeElementsSelector).remove();
        $container.find(removeAttributes.map((a) => `[${a}]`).join(','))
            .each((_, el) => this.cleanElement(el));
    }

    public static cleanElement(el: HTMLElement): void {
        const attrs = Object.values(this.customAttributes);
        for (const attr of attrs) {
            el.removeAttribute(attr);
        }
    }

    /** The protoframe connector that will be connected to the parent (instructor feedback) window. */
    private connector?: ProtoframePubsub<PreviewHtmlIframeProtocol>;
    /** The list of elements that have been highlighted. */
    private elements: SelectedElement[] = [];
    /** The elements with the unhighlight updates that can be made to revert the highlights. */
    private highlights: Array<[HTMLElement, IHTMLElementUpdate]> = [];
    /** The elements that were affected by the preprocessing (e.g., remove tabindex), with their revert updates. */
    private preprocess: Array<[HTMLElement, IHTMLElementUpdate]> = [];
    /** A timer instance that is being used to continually preprocess. */
    private preprocessTimer?: number;
    /** A timer instance that is being used to continually check for detached highlight  DOM nodes. */
    private highlightTimer?: number;
    /** Holds the currently selected highlight element index. */
    private currentSelectionIndex?: number;
    /** Holds the "N of M" selection tooltip being displayed, if any. */
    private currentTooltip?: JQuery<HTMLElement>;
    /** Holds the current state of the visibility toggle of highlights. */
    private visibility: boolean = true;
    /** The root scroll element for navigating issues with smooth scrolling. */
    private scrollContainer: Window | HTMLElement;
    /** The root content element from which all locators are relative. */
    private contentContainer: HTMLElement;
    /** The indicator content container for highlight banner. */
    private indicatorContainer: HTMLElement;
    /** The boundary for collision detection when determining how to orient issue tooltips. */
    private tooltipContainer: HTMLElement;
    /** The DOM document of the content. */
    private document: Document;
    /** The Popper indicator reference. */
    private popper: Instance | undefined;

    constructor(
        /** The base URL host to the Ally server. Needed to load static assets like CSS. */
        private readonly baseUrl: string,
        /** The resolved i18n bundle for the user's language. */
        private readonly i18n: any,
        {
            contentContainer = document.body,
            indicatorContainer,
            scrollContainer = contentContainer.ownerDocument!.defaultView!
        }: IHtmlPreviewDriverOpts = {},
        /** The async pre-selection hook. */
        private readonly beforeSelection?: ((e?: HTMLElement) => Promise<void>) | undefined,
        /** The static scroll offset used for scroll to selected issue. */
        private readonly scrollOffset: number = 0
    ) {
        this.contentContainer = contentContainer;
        this.indicatorContainer = NullUtil.hasValue(indicatorContainer) ? indicatorContainer : contentContainer;
        this.scrollContainer = scrollContainer;
        this.tooltipContainer = 'document' in scrollContainer ? scrollContainer.document.body : scrollContainer;
        this.document = contentContainer.ownerDocument!;
    }

    /** Start the driver. This will make lots of DOM changes and can be completely destroyed with `destroy()`. */
    public start({
        /** The current window. This is the one we listen from instructor feedback with `addEventListener`. */
        thisWindow = window as Window,
        /** The "parent" window. This is the one send responses back to instructor feedback with `postMessage`. */
        parentWindow = window.parent as Window,
        /** How often to continually preprocess the page. This ensures tabbable elements don't creep in dynamically. */
        preprocessInterval = 500 as false | number,
        /** How often to continually check for detached DOM highlights. */
        highlightInterval = false as number | false
    } = {}): void {
        // Add the CSS for the preview highlights and tooltip
        const attrs = {
            'href': `${this.baseUrl}/${webCssPath}`,
            'id': 'ally-preview-styles',
            'rel': 'stylesheet'
        };
        const $styles = $('<link />', attrs);
        $('head', this.document).append($styles);

        // Establish the connector to the parent (instructor feedback) window
        this.connector = new ProtoframePubsub(
            previewHtmlIframeProtocol,
            parentWindow,
            thisWindow,
            '*'
        );

        // Whenever instructor feedback initializes us, we completely reset our state
        this.connector.handleTell('init', (req) => {
            // Remove all highlights
            this.unHighlightAll();
            // Restore all tabindexes we've suppressed
            this.unPreprocessAll();
            // clear the selected element for screen-readers
            if (NullUtil.hasValue(this.beforeSelection)) {
                this.beforeSelection().catch( (err) => console.error(err));
            }

            this.elementSupplier = () => NullUtil.hasValue(req.locator) ?
                this.locateElements(req.locator)
                    .sort((el0, el1) => {
                        // Sort elements from top to bottom
                        const y0 = el0.element.getBoundingClientRect().top;
                        const y1 = el1.element.getBoundingClientRect().top;
                        return y0 - y1;
                    }) : [];
            // Evaluate all xpaths (if any) to reset our highlighted elements
            this.elements = this.elementSupplier();

            // Make all elements untabbable on a regular interval
            this.preprocessAll(preprocessInterval, highlightInterval);

            // Put the red boxes around everything if visibility is enabled
            if (this.visibility) {
                this.highlightAll();
            }
        });

        // Whenever instructor feedback tells us to select an index, we put a "X of Y" tooltip on it, but only if
        // highlights are visible (spoiler: they will be)
        this.connector.handleAsk('select', async ({ index, ...selectReq }) => {
            // An index of -1 indicates to just run a selection update without actually changing the selection index
            // from whatever it is now
            let scrollIntoView = true;
            if (index >= 0) {
                this.currentSelectionIndex = index;
            } else if (this.currentSelectionIndex === undefined) {
                this.currentSelectionIndex = 0;
            } else {
                // When we're soft-selecting and there is already some selection made, don't force a scroll. This is
                // just a passive selection after a soft reset of the screen state as live edit changes are being made.
                scrollIntoView = false;
            }

            if (this.visibility) {
                await this.select({ scrollIntoView });
            }

            const { element, ...locator} = { ...this.elements[this.currentSelectionIndex] };
            return { locator };
        });

        // Whenever instructor feedback tells us to change visibility we setup/destroy the highlights and selection
        // appropriately
        this.connector.handleTell('setVisibility', async ({visibility}) => {
            if (this.visibility !== visibility) {
                this.visibility = visibility;
                if (visibility) {
                    this.highlightAll();
                    await this.select();
                } else {
                    this.unHighlightAll();
                }
            }
        });
    }

    /** Revert any selection changes to the DOM and indicators. */
    public resetSelection() {
        this.deselect();
        this.currentSelectionIndex = undefined;
    }

    /** Completely revert any changes to the DOM or resources in flight. */
    public destroy(): void {
        $('#ally-preview-styles', this.document).remove();
        this.deselect();
        this.unHighlightAll();
        this.unPreprocessAll();
        if (NullUtil.hasValue(this.connector)) {
            this.connector.destroy();
        }
    }
    private hasProtocol(resourceId: string): boolean {
        return (resourceId.includes('https://') || resourceId.includes('http://'));
    }

    private locateElements(locator: IssueLocator): SelectedElement[] {
        if ('xpaths' in locator) {
            return locator.xpaths
                .map((xpath) => ({'element': this.evaluateXpath(xpath), xpath}))
                .filter(({element}) => NullUtil.hasValue(element));
        } else {
            return locator.links
                .map((resourceId) => {
                    const urlKey = this.hasProtocol(resourceId) ?
                        this.getUrlKey(resourceId) :
                        this.getUrlKey(`http://${resourceId}`);
                    const allMatches = $('a', this.contentContainer)
                        .toArray()
                        .filter((el) => {
                            try {
                                return urlKey === this.getUrlKey((el as HTMLLinkElement).href);
                            } catch (_) {
                                return false;
                            }
                        });
                    // A href of a link is not necessarily unique. There could be multiple instances of a link on
                    // the page. This has been seen as cases where dynamically generated markup results in both a
                    // visible link item in a list or menu, as well as a hidden one to support responsive layouts.
                    // Let's favour highlighting the current visible link element
                    const visibleMatches = allMatches.filter((el) => $(el).is(':visible'));
                    const relevantMatches = (visibleMatches.length > 0) ? visibleMatches : allMatches;
                    const element = relevantMatches.reverse()[0];
                    return { element, 'link': resourceId };
                })
                .filter(({element}) => NullUtil.hasValue(element));
        }
    }

    private getUrlKey(location: string): string {
        const url = new URL(location);
        const hostname = url.hostname.toLowerCase();
        const path = url.pathname.endsWith('/')
            ? url.pathname.toLowerCase().slice(0, -1)
            : url.pathname.toLowerCase();
        const search = url.search.toLowerCase();
        return `${hostname}:${path}:${search}`.replace(' ', '%20');
    }

    private isCanvasVideo(el: SelectedElement): boolean {
        const src = NullUtil.orElse(el.element.getAttribute('src'), '');
        return src.includes('media_objects_iframe') && src.includes('type=video');
    }

    private highlightElement(el: SelectedElement): [HTMLElement, IHTMLElementUpdate] {
        const tag = el.element.tagName.toLowerCase();
        let attribute = HtmlPreviewDriver.customAttributes.highlight;
        let targetElement = el.element;

        // table contents needs to be highlighted via pseudo elements
        if (tag === 'table') {
            attribute = HtmlPreviewDriver.customAttributes['outline-outset'];
        } else if (tag === 'tr' || tag === 'td' || tag === 'th') {
            attribute = HtmlPreviewDriver.customAttributes['outline-inset'];
        } else if (tag === 'iframe' && this.isCanvasVideo(el)) {
            attribute = HtmlPreviewDriver.customAttributes.shadow;
            targetElement = NullUtil.orElse(el.element.parentElement, el.element);
        }
        return [
            targetElement,
            this.applyReversibleUpdate(targetElement, {
                'attributes': {
                    [attribute]: ''
                }
            })
        ];
    }

    private highlightAll(): void {
        this.highlights = this.elements.map<[HTMLElement, IHTMLElementUpdate]>((e) => this.highlightElement(e));
    }

    private preprocessAll(preprocessInterval: number | false, highlightInterval: number | false): void {
        if (preprocessInterval !== false) {
            this.preprocessAll0();
            this.preprocessTimer = setInterval(() => this.preprocessAll0(), preprocessInterval) as unknown as number;
        }
        if (highlightInterval !== false) {
            this.highlightTimer = setInterval(() => this.refreshHighlight(), highlightInterval) as unknown as number;
        }
    }

    private preprocessAll0(): void {
        const preprocessed = $('*:tabbable', this.document)
        .toArray()
        .map<[HTMLElement, IHTMLElementUpdate]>((el) => {
            const update = this.applyReversibleUpdate(el, {
                'attributes': {
                    'tabindex': '-1'
                }
            });
            return [
                el,
                update
            ];
        });
        this.preprocess.push(...preprocessed);
    }

    private unPreprocessAll(): void {
        clearTimeout(this.preprocessTimer);
        clearTimeout(this.highlightTimer);
        this.preprocess.forEach(([el, update]) => {
            this.applyReversibleUpdate(el, update);
        });
        this.preprocess = [];
    }

    private unHighlightAll(): void {
        this.deselect();
        this.highlights.forEach(([el, update]) => {
            this.applyReversibleUpdate(el, update);
        });
        this.highlights = [];

        // Coarsely ensure all preview driver attributes and elements are fully removed
        HtmlPreviewDriver.cleanContainer(this.contentContainer);
    }

    private deselect(): void {
        if (NullUtil.hasValue(this.currentTooltip)) {
            this.currentTooltip.remove();
            this.currentTooltip = undefined;
        }
        if (NullUtil.hasValue(this.popper)) {
            this.popper.destroy();
            this.popper = undefined;
        }

        // Mark as elements as no longer selected. Account for the possibility that the element that was previously
        // selected is no longer on the dom. In this scenario it simply
        this.elements.forEach((el) => el.element.removeAttribute(HtmlPreviewDriver.customAttributes.selected));
    }

    private async select({ scrollIntoView = true } = {}): Promise<SelectedElement | undefined> {
        // If there are no elements, there is nothing to select
        if (this.elements.length === 0 || this.currentSelectionIndex === undefined) {
            return undefined;
        }

        const el = this.elements[this.currentSelectionIndex];
        if (NullUtil.hasValue(this.beforeSelection)) {
            await this.beforeSelection(el.element);
        }
        this.selectElement(el, this.currentSelectionIndex);

        if (scrollIntoView && this.currentTooltip) {
            const indicator = this.currentTooltip[0];
            // The scroll position of the scroll container.
            const containerScroll = ('document' in this.scrollContainer) ?
                this.scrollContainer.scrollY : this.scrollContainer.scrollTop;
            // The scrolling offset of the element relative to the viewport
            const elementOffset = el.element.getBoundingClientRect().top;
            // Combining both gives us the total scrolling offset required to scroll the element into view
            const elementScrollOffset = Math.round(containerScroll + elementOffset);
            // Choose the "top" item to scroll into view, ensuring we leave enough top padding for the indicator
            const scrollToTop = Math.max(
                elementScrollOffset - this.scrollOffset - indicator.getBoundingClientRect().height * 1.5, 0
            );
            setTimeout(() => {
                // We can't use el.scrollIntoView() because that will also cause the parent frame to scroll and
                // sometimes mess up reactive iframe height management in cases where you have learn classic courses
                // iframed into learn ultra
                this.scrollContainer.scrollTo({'behavior': 'smooth', 'top': scrollToTop});
            });
        }

        return el;
    }

    /** Updates element with attributes needed for Popper indicator. */
    private selectElement(el: SelectedElement, currentSelectionIndex: number): void {
        this.deselect();

        // Mark the element as selected
        el.element.setAttribute(HtmlPreviewDriver.customAttributes.selected, '');

        const template = new HtmlPreviewSelectionTemplate();
        const $indicator = template.apply({
            'ALLY_DOMAIN': this.baseUrl,
            'className': HtmlPreviewDriver.customElementClassNames.selectionContainer,
            'content': (this.i18n.X_OF_Y as string)
                .replace('{0}', (currentSelectionIndex + 1).toString())
                .replace('{1}', this.elements.length.toString()),
            'i18n': this.i18n
        }).css({'scroll-margin': '50px'});
        $(this.indicatorContainer).append($indicator);

        const offset = this.isCanvasVideo(el) ? 6 : 0;

        this.popper = createPopper(el.element, $indicator[0], {
            'modifiers': [
                {
                    'name': 'flip',
                    'options': {
                        'boundary': this.tooltipContainer,
                        'fallbackPlacements': ['right', 'left', 'bottom'],
                        'rootBoundary': 'document'
                    },
                },
                // CAR WYSIWYG have issues with adaptive styles of popper, due to that they needs to be disabled
                {
                    'name': 'computeStyles',
                    'options': {
                        'adaptive': false,
                    },
                },
                {
                    'name': 'offset',
                    'options': {
                        'offset': ({
                            placement,
                            popper,
                            reference
                        }: {
                            placement: string,
                            popper: Rect,
                            reference: Rect
                        }): [number, number] => {
                            if (placement.startsWith('bottom') || placement.startsWith('top')) {
                                return [(popper.width / 2 - reference.width / 2) - offset, offset];
                            } else {
                                return [popper.height / 2 - reference.height / 2, 0];
                            }
                        }
                    }
                }
            ],
            'placement': 'top'
        });
        this.currentTooltip = $indicator;
    }

    /** Re-fetch, highlight and select elements if current ones were detached from DOM. */
    private refreshHighlight(): void {
        if (this.highlights.length === 0) {
            return;
        }

        let elements: SelectedElement[] | undefined;
        for (let i = 0; i < this.elements.length; i++) {
            if (this.contentContainer.contains(this.elements[i].element)) {
                continue;
            }

            if (elements === undefined) {
                elements = this.elementSupplier();
            }
            if (this.elements.length !== elements.length) {
                return;
            } else if (!NullUtil.hasValue(elements[i])) {
                continue;
            }

            this.elements[i] = elements[i];
            this.highlights[i] = this.highlightElement(this.elements[i]);
        }

        if (NullUtil.hasValue(this.currentSelectionIndex)) {
            const elem = this.elements[this.currentSelectionIndex];
            if (NullUtil.hasValue(elem) &&
                !elem.element.hasAttribute(HtmlPreviewDriver.customAttributes.selected)) {
                this.selectElement(elem, this.currentSelectionIndex);
            }
        }
    }

    private applyReversibleUpdate(
        el: HTMLElement,
        {
            attributes = {},
        }: Partial<IHTMLElementUpdate>
    ): IHTMLElementUpdate {
        const reversed: IHTMLElementUpdate = {
            // Attributes will be hand-picked based on the ones that were updated
            'attributes': {},
        };

        // Update the attributes, copying existing values to the reversal object
        Object.keys(attributes).forEach((k) => {
            const v = attributes[k];
            reversed.attributes[k] = el.getAttribute(k);

            if (NullUtil.hasValue(v)) {
                el.setAttribute(k, v);
            } else {
                el.removeAttribute(k);
            }
        });

        return reversed;
    }

    private evaluateXpath(xpath: string): HTMLElement {
        return evaluateXpath(xpath, this.document, this.contentContainer);
    }

    /** The issue element supplier function. */
    private elementSupplier: () => SelectedElement[] = () => [];

}

export function evaluateXpath(xpath: string, document: Document, contentContainer: HTMLElement): HTMLElement {
    try {
        return document.evaluate(
            xpath,
            contentContainer,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        ).singleNodeValue as HTMLElement;
    } catch (ex) {
        console.error(`Invalid xpath: "${xpath}"`, ex);
        throw ex;
    }
}
