
import * as $ from 'jquery';

import {IJsWebpageLink, WebpageLink} from 'src/integration/api/ui/WebpageLink';
import * as CollectionUtil from 'src/shared/CollectionUtil';

export interface IJsWebpage {
    title: string;
    url: string;
    links: IJsWebpageLink[];
}

/**
 * Represents preliminary webpage data that is extracted from the DOM. This model is sent directly into alternative
 * formats in order to generate a sanitized webpage profile with links.
 */
export class Webpage {

    /**
     * Extract the webpage data from the specified main content portion of the webpage.
     *
     * @param $main The main portion of the current webpage, as configured on the UI configuration
     */
    public static fromMain($main: JQuery<HTMLElement>): Webpage {
        const links = $main
            // Ignore invisible links, and links which have the data-ally-af-disabled attribute
            .find('a:visible:not([data-ally-af-disabled])')
            .toArray()
            .map((el) => WebpageLink.fromEl($(el)));
        return new Webpage(
            document.title,
            window.location.href,
            CollectionUtil.compact(links)
        );
    }

    constructor(
        /** The title of the webpage. */
        public readonly title: string,
        /** The URL of the webpage. */
        public readonly url: string,
        /** A collection of links on the webpage. */
        public readonly links: WebpageLink[]
    ) {}

    /** Convert the webpage into a simple JSON object. */
    public toJson(): IJsWebpage {
        return {
            'links': this.links.map((l) => l.toJson()),
            'title': this.title,
            'url': this.url
        };
    }
}
