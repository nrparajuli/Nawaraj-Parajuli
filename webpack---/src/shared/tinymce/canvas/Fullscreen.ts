import * as $ from 'jquery';
import {hasValue, whenHasValue} from 'src/shared/NullUtil';

/** The CSS property dictionary */
interface ICssFields {
    [_: string]: string;
}

/** TinyMCE pre fullscreen metadata used for leaving fullscreen */
export interface IFullscreenInfo {
    container: ICssFields;
    iframe: ICssFields;
    windowScrollY: number;
    editorContainer?: ICssFields;
    editorHeader?: ICssFields;
}

const TOX_FULLSCREEN_CLASS = 'tox-fullscreen';

/**
 * Lookups all the metadata and elements used for entering/leaving fullscreen TinyMCE mode.
 *
 * @param container TinyMCE container element
 * @param iframe    TinyMCE content element
 * @param use       Callback handling the actual fullscreen operation
 */
function withEditor<R>(container: HTMLElement, iframe: HTMLIFrameElement, use: (
    $container: JQLite, $iframe: JQLite, $editorContainer: JQLite, $header: JQLite, styledElements: JQLite[]
) => R): R {
    const $iframe = $(iframe);
    const $container = $(container);
    const $editorContainer = $container.find('.tox-editor-container');
    const $header = $container.find('.tox-editor-header');

    const $toxElements: JQLite[] = [document.body, document.documentElement, container]
        .map((e) => $(e));

    return use($container, $iframe, $editorContainer, $header, $toxElements);
}

/** Retrieves CSS properties based on provided keys to element */
function getCssProperties(keys: string[], $element: JQLite): ICssFields {
    const result: ICssFields = {};
    keys.forEach((key: string) => {
        if (key === 'width' || key === 'height') {
            const value = $element[0].style[key];
            if (hasValue(value)) {
                result[key] = value;
            }
        } else {
            result[key] = $element.css(key);
        }
    });
    return result;
}

/**
 * Restyles TinyMCE editor to fullscreen mode
 *
 * @param container TinyMCE container element
 * @param iframe    TinyMCE content element
 * @return info     TinyMCE pre fullscreen CSS metadata
 */
export function enterFullscreen(container: HTMLElement, iframe: HTMLIFrameElement): IFullscreenInfo {
    return withEditor(container, iframe, (
        $container: JQLite, $iframe: JQLite, $editorContainer: JQLite, $header: JQLite, $toxElements: JQLite[]
    ) => {
        const screenInfo: IFullscreenInfo = {
            'container': getCssProperties(['height', 'width'], $container),
            'iframe': getCssProperties(['height', 'width'], $iframe),
            'windowScrollY': window.scrollY,
        };

        if ($container.hasClass('tox-tinymce--toolbar-sticky-on')) {
            screenInfo.editorHeader = getCssProperties(['position', 'width'], $header);
            screenInfo.editorContainer = getCssProperties(['padding-top'], $editorContainer);

            $editorContainer.css('padding-top', 0);
            $header.css('position', 'inherit');
            $header.css('width', 'auto');
        }

        $iframe.css('width', '100%');
        $iframe.css('height', '100%');
        $container.css('width', '');
        $container.css('height', '');

        $toxElements.forEach((e) => e.addClass(TOX_FULLSCREEN_CLASS));

        return screenInfo;
    });
}

/** Updates CSS properties based on provided keys to element */
function setCssProperties(fields: ICssFields, $element: JQLite) {
    Object.entries(fields).forEach(([key, value]) => $element.css(key, value));
}

/**
 * Restyles TinyMCE editor from fullscreen mode
 *
 * @param container TinyMCE container element
 * @param iframe    TinyMCE content element
 * @param info      TinyMCE pre fullscreen CSS metadata
 */
export function exitFullscreen(container: HTMLElement, iframe: HTMLIFrameElement, info: IFullscreenInfo) {
    return withEditor(container, iframe, (
        $container: JQLite, $iframe: JQLite, $editorContainer: JQLite, $header: JQLite, $toxElements: JQLite[]
    ) => {
        setCssProperties(info.iframe, $iframe);
        setCssProperties(info.container, $container);

        whenHasValue(info.editorHeader, (fields) => setCssProperties(fields, $header));
        whenHasValue(info.editorContainer, (fields) => setCssProperties(fields, $editorContainer));

        setTimeout(() => window.scrollTo(0, info.windowScrollY), 0);

        $toxElements.forEach((e) => e.removeClass(TOX_FULLSCREEN_CLASS));
    });
}
