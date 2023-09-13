
import * as $ from 'jquery';

import * as NullUtil from 'src/shared/NullUtil';

export interface IJsWebpageLink {
    href: string;
    text: string | null;
    title: string | null;
}

/** Represents a single link on a webpage. */
export class WebpageLink {

    /** Create a [[WebpageLink]] from the specified element, if possible. */
    public static fromEl($el: JQuery): WebpageLink | null {
        const href = WebpageLink.resolveNonEmptyHref($el);
        if (NullUtil.hasValue(href)) {
            const text = WebpageLink.resolveSimpleText($el, href);
            const title = NullUtil.orNull($el.attr('title'));
            return new WebpageLink(href, text, title);
        } else {
            return null;
        }
    }

    /** Extract a valid `href` attribute from the element, if possible. */
    private static resolveNonEmptyHref($el: JQuery): string | null {
        const rawHref = $el.attr('href');
        if (NullUtil.hasValue(rawHref) && rawHref.trim() !== '' && rawHref.indexOf('#') !== 0) {
            // To sanitize links, we grab the href, strip away anchors and remove trailing whitespace
            const sanitizedHref = rawHref.split('#')[0].trim();
            if (
                // It cannot be empty
                sanitizedHref !== '' &&
                // It cannot just be javascript functionality
                sanitizedHref.toLowerCase().indexOf('javascript:') !== 0
            ) {
                return sanitizedHref;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    /** Extract link text if it's not structural. */
    private static resolveSimpleText($el: JQuery, href: string): string | null {
        if (WebpageLink.hasStructuralElements($el)) {
            return null;
        } else {
            const text = $el.text().trim();
            if (text === '') {
                return null;
            } else {
                return text;
            }
        }
    }

    private static hasStructuralElements($el: JQuery): boolean {
        const $structuralElements = $el
            .find('*')
            .filter((i, el) => NullUtil.orElse<string>($(el).css('display'), '').indexOf('inline') === -1);
        return $structuralElements.length > 0;
    }

    constructor(
        /** The link reference. */
        public readonly href: string,
        /** The inner text of the link, if simple content. */
        public readonly text: string | null,
        /** The title attribute of the link, if specified. */
        public readonly title: string | null) {

        }

    /** Convert the link to a simple JSON model. */
    public toJson(): IJsWebpageLink {
        return {
            'href': this.href,
            'text': this.text,
            'title': this.title
        };
    }
}
