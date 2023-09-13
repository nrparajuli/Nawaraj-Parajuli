
import {whenHasValue} from 'src/shared/NullUtil';

/** Parse a URL string into a [HTMLHyperlinkElementUtils] which allows us to extract URL parts like `pathname`. */
export function parseHref(href: string): HTMLHyperlinkElementUtils {
    const a = document.createElement('a');
    a.href = href;
    const link = {
        'hash': a.hash,
        'host': a.host,
        'hostname': a.hostname,
        'href': a.href,
        'origin': a.origin,
        'password': a.password,
        'pathname': a.pathname,
        'port': a.port,
        'protocol': a.protocol,
        'search': a.search,
        'username': a.username
    };

    // IE11 does not return the initial slash when requesting the pathname, patch this up
    // See https://stackoverflow.com/questions/956233/javascript-pathname-ie-quirk
    /* istanbul ignore if */
    if (link.pathname.length > 0 && link.pathname[0] !== '/') {
        link.pathname = `/${location.pathname}`;
    }

    return link;
}

/** Find a node by the specified xpath string. */
export function findNodeByXpath(document: Document, rootEl: Node, xpath: string): Node | null {
    try {
        return document.evaluate(xpath, rootEl, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    } catch (e) {
        return null;
    }
}

/**
 * Change the name of the tag of the specified element by raw HTML replacement. Note that this is only suitable if we
 * don't care about aspects of the DOM that are not apparent in the raw HTML, such as event listeners.
 *
 * @param $ The static jQuery dependency
 * @param el The HTML element whose tag name to change
 * @param to The new tag name
 */
export function replaceTagName($: JQueryStatic, el: HTMLElement, to: string): void {
    const innerContent = el.outerHTML.trim().slice(
        // Skip the opening tag prefix (`<` + the tag name)
        el.tagName.length + 1,
        // Skip the closing tag suffix (the tag name + `>`)
        -1 * el.tagName.length - 1
    );
    // Replace the opening/closing tag bits with the new tag
    $(el).replaceWith(`<${to}${innerContent}${to}>`);
}

/**
 * Get the extension of the generated format from a download URL
 *
 * @param url The URL to derive the format's extension from.
 * @return The extension of the filename encoded in the URL. Returns `null` if extension could be identified
 */
export function getExtension(url: string): string | null {
    const u = new URL(url);

    return whenHasValue(
        u.hostname.endsWith('.s3.amazonaws.com') ?
            u.pathname : u.searchParams.get('key'),
        getPathNameExtension
    );
}

export function extractYoutubeVideoId(url: string): string | undefined {
    // tslint:disable: max-line-length
    const match = url.match(/^(?:https?:)?(?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.[a-zA-Z]+\/(?:watch|v|embed)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]{7,15})(?:[\?&][a-zA-Z0-9\_-]+=[a-zA-Z0-9\_-]+)*(?:[&\/\#].*)?$/);
    if (match !== null && match[1] !== null) {
        return match[1];
    } else {
        return undefined;
    }
}

export function extractVimeoVideoId(url: string): string | undefined {
    const match = url.match(/^(?:https?:)?(?:\/\/)?player\.vimeo\.[a-zA-Z]+\/video\/(\d+)(\?(.*))?/);
    if (match !== null && match[1] !== null) {
        return match[1];
    } else {
        return undefined;
    }
}

/** Get the extension of the AF pathname */
function getPathNameExtension(pathname: string | null) {
    return whenHasValue(pathname, (p) => {
        const segments = p.split('.');
        if (segments.length > 1) {
            return segments[segments.length - 1];
        }
        return null;
    });
}
