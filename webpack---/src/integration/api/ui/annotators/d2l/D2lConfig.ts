import * as jwtDecode from 'jwt-decode';

import * as NullUtil from 'src/shared/NullUtil';
import { D2lAnnotatorError } from './D2lAnnotatorError';

const tableOfContentsPagePathRegex = /^\/d2l\/le\/content\/\d+\/Home/;
const individualcontentViewPagePathRegex = /^\/d2l\/le\/content\/\d+\/viewContent\/\d+\/View/;

/** The configuration object that's provided by D2L and is exposed on `window.allyConfig`. */
export interface IJsPageConfig {
    /** The Ally client ID */
    clientId: number;

    /** The JWT token that's siged by D2L using the Ally LTI secret */
    token: string;
}

/**
 * The JWT token from the [[IJsPageConfig]] object once it has been parsed.
 *
 * ```
 * {
 *   "iat": 1555403590,
 *   "exp": 1555446790,
 *   "course_id": 6609,
 *   "roles": "urn:lti:role:ims/lis/Instructor,urn:lti:role:ims/lis/Administrator",
 *   "locale": "en-us",
 *   "user_id": 30220,
 *   "return_url": "http://ally201904051613.devlms.brightspace.com/d2l/le/content/6609/Home",
 *   "can_create_content": true,
 *   "can_update_content": true,
 *   "can_delete_content": true,
 *   "can_download_content": true
 * }
 * ```
 */
export interface IJsJwtTokenPayload {
    course_id: number;
    exp: number;
    iat: number;
    locale: string;
    return_url: string;
    roles: string;
    user_id: number;
    can_create_content: boolean;
    can_update_content: boolean;
    can_delete_content: boolean;
    can_download_content: boolean;
}

export enum D2lPageType {
    /** The table of contents for a course (e.g., `/d2l/le/content/<course id>/Home`). */
    TableOfContents,

    /**
     * A page holding an individual content item. Typically with a pdf.js rendering of the document
     * (e.g., `/d2l/le/content/<course id>/viewContent/<file id>/View`)
     */
    IndividualContentView,

    /** D2L's new table of content experience. Slightly different from the other views, this runs in an iframe */
    NewContentExperienceView
}

export class D2lConfig {

    public static fromPage(
        locationHref: HTMLHyperlinkElementUtils,
        $allyLoader: JQuery<HTMLElement>,
        pageConfig: IJsPageConfig | undefined
    ): D2lConfig | D2lAnnotatorError {
        const allyLoaderSrc = NullUtil.orElse<string>($allyLoader.attr('src'), '');
        if (allyLoaderSrc !== '' && allyLoaderSrc.indexOf('platform-name=d2l') !== -1) {
            if (pageConfig) {
                const baseUrl = allyLoaderSrc.split('/').slice(0, 3).join('/');
                const token = this.parseJwtToken(pageConfig.token);
                const pageType = resolvePageType(locationHref);
                if (NullUtil.hasValue(pageType)) {
                    return new D2lConfig(
                        baseUrl,
                        pageConfig.clientId,
                        token.course_id,
                        token.locale,
                        token.roles.split(','),
                        pageConfig.token,
                        token,
                        pageType
                    );
                } else {
                    return D2lAnnotatorError.NotASupportedPageType;
                }
            } else {
                return D2lAnnotatorError.NoConfigObjectAvailable;
            }
        } else {
            return D2lAnnotatorError.NotAD2lPlatform;
        }
    }

    public static parseJwtToken(rawToken: string): IJsJwtTokenPayload {
        return jwtDecode(rawToken);
    }

    constructor(
        /** The base url of the Ally server. */
        public readonly baseUrl: string,
        /** The numerical Ally client id. */
        public readonly clientId: number,
        /** The numerical D2l course id. */
        public readonly courseId: number,
        /** The configured user locale. */
        public readonly locale: string,
        /** The user LTI roles. */
        public readonly roles: string[],
        /** The raw JWT token to use for authentication. */
        public readonly jwtToken: string,
        /** The parsed JWT token provided by D2L */
        public readonly parsedToken: IJsJwtTokenPayload,
        /** The type of page that is currently active. */
        public readonly pageType: D2lPageType
    ) {}
}

function resolvePageType(location: HTMLHyperlinkElementUtils): D2lPageType | null {
    if (tableOfContentsPagePathRegex.test(location.pathname)) {
        return D2lPageType.TableOfContents;
    } else if (individualcontentViewPagePathRegex.test(location.pathname)) {
        return D2lPageType.IndividualContentView;
    } else if (location.pathname.indexOf('/apps/smart-curriculum') !== -1) {
        return D2lPageType.NewContentExperienceView;
    }

    console.warn('unsupported page type', location.pathname);
    return null;
}
