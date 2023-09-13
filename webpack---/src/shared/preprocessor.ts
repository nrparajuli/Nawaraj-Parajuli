
import {extractVimeoVideoId, extractYoutubeVideoId} from 'src/shared/DomUtil';
import * as NullUtil from 'src/shared/NullUtil';

import { StringUtil } from './stringutil';

export type Preprocessor = (target: Document) => void;

const ALT_ATTRIBUTE = 'alt';
const AUDIO_TAG = 'audio';
const BORDER_ATTRIBUTE = 'border';
const DATA_DECORATIVE_ATTRIBUTE = 'data-decorative';
const EMPTY_PLACEHOLDER = '_ALLY_EMPTY_PLACEHOLDER_';
const HREF_ATTRIBUTE = 'href';
const IFRAME_TAG = 'iframe';
const IMG_TAG = 'img';
const LAZY_VALUE = 'lazy';
const LINK_TAG = 'link';
const LOADING_ATTRIBUTE = 'loading';
const PRE_LOAD_ATTRIBUTE = 'preload';
const ROLE_ATTRIBUTE = 'role';
const SOURCE_TAG = 'source';
const SRC_ATTRIBUTE = 'src';
const TABLE_TAG = 'table';
const TRACK_TAG = 'track';
const VIDEO_TAG = 'video';

const CANVAS_ALLOWED_IFRAME_ATTRIBUTES = [
    {'key': 'data-media-id', 'value': null},
    {'key': 'data-media-type', 'value': 'video'}
];

const CANVAS_IMG_NORMALIZE = (e: HTMLElement) => {
    const alt = e.getAttribute(ALT_ATTRIBUTE);
    const dataDecorative = (e.getAttribute(DATA_DECORATIVE_ATTRIBUTE) ?? EMPTY_PLACEHOLDER).toLowerCase();
    const role = (e.getAttribute(ROLE_ATTRIBUTE) ?? EMPTY_PLACEHOLDER).toLowerCase();

    if (role === 'presentation' || dataDecorative === 'true') {
        e.setAttribute(ALT_ATTRIBUTE, '');
    } else if (alt === '') {
        e.removeAttribute(ALT_ATTRIBUTE);
    } else if (alt !== null && alt !== '' && StringUtil.isDefaultDescription(alt as string)) {
        e.removeAttribute(ALT_ATTRIBUTE);
    }
};

const CANVAS_FILTER_IFRAMES = (frame: HTMLIFrameElement) => {
    const isCanvasVideo = CANVAS_ALLOWED_IFRAME_ATTRIBUTES.every((attr) => {
        return (frame.hasAttribute(attr.key) && !NullUtil.hasValue(attr.value)) ||
             NullUtil.hasValue(attr.value) && frame.getAttribute(attr.key) === attr.value;
    });
    if (!isCanvasVideo && !isYoutubeVideo(frame.src) && !isVimeoVideo(frame.src)) {
        frame.remove();
    } else {
        frame.hidden = true;
        frame.setAttribute(LOADING_ATTRIBUTE, LAZY_VALUE);
    }
};

const DEFAULT_FILTER_IFRAMES = (frame: HTMLIFrameElement) => {
    if (!isYoutubeVideo(frame.src) && !isVimeoVideo(frame.src)) {
        frame.remove();
    } else {
        frame.hidden = true;
        frame.setAttribute(LOADING_ATTRIBUTE, LAZY_VALUE);
    }
};

export const CANVAS: Preprocessor = (target = document) => {
    Array.from(target.getElementsByTagName(IMG_TAG)).forEach(CANVAS_IMG_NORMALIZE);
    Array.from(target.getElementsByTagName(IFRAME_TAG)).forEach(CANVAS_FILTER_IFRAMES);
};

/** BbMl content contains editor id only for WYSIWYG or in case of static HTML it contains data-bbid. */
function isBbml(target = document): boolean {
    const lookup = Array.from(target.getElementsByTagName('div')).find((e) => {
        return /bbml-editor-.*-rte/s.test(e.id) || e.hasAttribute('data-bbid');
    });
    return lookup !== undefined;
}

export const LEARN: Preprocessor = (target = document) => {
    if (isBbml(target)) {
        LEARN_ULTRA(target);
    } else {
        LEARN_ORIGINAL(target);
    }
};

/**
 * Massage HTML content originating from the Learn Original editor
 *
 * The Learn Original Editor renders alt="" in images if the user left the alternative description field blank. When
 * adding an image, the alt attribute is by default empty. Therefore, alt="" is not an acceptable value and should be
 * raised as an accessibility issue.
 *
 * Images that get marked as decorative through Ally their alt attribute gets set to "_DECORATIVE". Additionally, the
 * value is persisted in the fragment of the src url in the data-ally-user-updated-alt map.
 * See [[SrcFragmentAnnotatedImgAltTextUpdateStrategy]].
 *
 * In summary, when scoring HTML for Learn Original RichContent:
 * - If the image src fragment metadata indicates that the user physically set the alt text, the value there should be
 *   substituted into the alt attribute of the image
 * - If the image alt attribute is empty and there is no src fragment metadata indicating an update, then the alt
 *   attribute should be removed
 * - If the image alt attribute is a file name, it should be removed as it is useless
 */
const LEARN_ORIGINAL_IMG_NORMALIZE = (e: HTMLElement) => {
    const alt = e.getAttribute(ALT_ATTRIBUTE);
    const role = (e.getAttribute(ROLE_ATTRIBUTE) ?? EMPTY_PLACEHOLDER).toLowerCase();

    const imageAltValue = alt !== null ? alt : (role.includes('presentation') ? '' : undefined);
    const src = (e.getAttribute('src') ?? '').trim();

    const userProvidedAlt = StringUtil.getAttributeMap(src).get('alt');

    if (NullUtil.hasValue(imageAltValue) && !StringUtil.isDefaultDescription(imageAltValue)) {
        // do nothing
    } else if (!NullUtil.hasValue(imageAltValue) && NullUtil.hasValue(userProvidedAlt) &&
        userProvidedAlt === '_DECORATIVE_') {
        e.setAttribute(ALT_ATTRIBUTE, '');
    } else if (!NullUtil.hasValue(imageAltValue) && NullUtil.hasValue(userProvidedAlt)) {
        e.setAttribute(ALT_ATTRIBUTE, userProvidedAlt);
    } else {
        e.removeAttribute(ALT_ATTRIBUTE);
    }
};

/**
 * Massage HTML content originating from the Learn ultra editor
 *
 * In summary, when scoring HTML for Learn Ultra RichContent:
 * - If the image alt attribute is a file name, it should be removed as it is useless
 */
const LEARN_ULTRA_IMG_NORMALIZE = (e: HTMLElement) => {
    const alt = e.getAttribute(ALT_ATTRIBUTE);

    if (alt !== null && alt !== '' && StringUtil.isDefaultDescription(alt as string)) {
        e.removeAttribute(ALT_ATTRIBUTE);
    }
};

const LEARN_ULTRA: Preprocessor = (target = document) => {
    Array.from(target.getElementsByTagName(IMG_TAG)).forEach(LEARN_ULTRA_IMG_NORMALIZE);
    Array.from(target.getElementsByTagName(IFRAME_TAG)).forEach(DEFAULT_FILTER_IFRAMES);
};

const LEARN_ORIGINAL: Preprocessor = (target = document) => {
    Array.from(target.getElementsByTagName(IMG_TAG)).forEach(LEARN_ORIGINAL_IMG_NORMALIZE);
    Array.from(target.getElementsByTagName(IFRAME_TAG)).forEach(DEFAULT_FILTER_IFRAMES);
};

export const NO_BORDER_TABLES: Preprocessor = (target = document) => {
    Array.from(target.getElementsByTagName(TABLE_TAG)).forEach((e) => {
        const border = Number.parseInt(
            NullUtil.orElse(e.getAttribute(BORDER_ATTRIBUTE), '0'),
            10
        );

        if (isNaN(border) || border <= 0) {
            e.setAttribute(BORDER_ATTRIBUTE, '1');
        }
    });
};

export const NO_EXTERNAL_RES: Preprocessor = (target = document) => {
    Array(AUDIO_TAG, IMG_TAG, LINK_TAG)
        .forEach((tag) => Array.from(target.getElementsByTagName(tag))
            .forEach((elm) => {
                if (elm.hasAttribute(SRC_ATTRIBUTE)) {
                    elm.setAttribute(SRC_ATTRIBUTE, '');
                } else if (elm.hasAttribute(HREF_ATTRIBUTE)) {
                    elm.setAttribute(HREF_ATTRIBUTE, '');
                }
            }));

    // exclude only when it's not in video
    Array(SOURCE_TAG, TRACK_TAG)
        .forEach((tag) => Array.from(target.getElementsByTagName(tag))
            .forEach((elm) => {
                if (elm.hasAttribute(SRC_ATTRIBUTE) && elm.parentNode?.nodeName.toLowerCase() !== VIDEO_TAG) {
                    elm.setAttribute(SRC_ATTRIBUTE, '');
                }
            }));

    Array.from(target.getElementsByTagName(VIDEO_TAG))
        .forEach((elm) => {
            elm.setAttribute(PRE_LOAD_ATTRIBUTE, 'none');
        });
};

export const DEFAULT_IFRAMES: Preprocessor = (target = document) => {
    Array.from(target.getElementsByTagName(IFRAME_TAG)).forEach(DEFAULT_FILTER_IFRAMES);
};

export function getPreprocessors(type: string): Preprocessor[] {
    const processors: Preprocessor[] = [];
    switch (type) {
        case 'canvas': processors.push(CANVAS, NO_EXTERNAL_RES, NO_BORDER_TABLES); break;
        case 'learn': processors.push(LEARN, NO_EXTERNAL_RES, NO_BORDER_TABLES); break;
        default: processors.push(NO_EXTERNAL_RES, NO_BORDER_TABLES, DEFAULT_IFRAMES); break;
    }
    return processors;
}

export function isDecorative(img: Node | null | undefined, type: string): boolean {
    if (!NullUtil.hasValue(img) || img.nodeType !== Node.ELEMENT_NODE) {
        return false;
    }

    const clone = img.cloneNode(true) as HTMLElement;
    switch (type) {
        case 'canvas': CANVAS_IMG_NORMALIZE(clone); break;
        case 'learn': LEARN_ORIGINAL_IMG_NORMALIZE(clone); break;
        default: break;
    }

    return clone.getAttribute(ALT_ATTRIBUTE) === '';
}

function isYoutubeVideo(url: string): boolean {
    return NullUtil.hasValue(extractYoutubeVideoId(url));
}

function isVimeoVideo(url: string): boolean {
    return NullUtil.hasValue(extractVimeoVideoId(url));
}
