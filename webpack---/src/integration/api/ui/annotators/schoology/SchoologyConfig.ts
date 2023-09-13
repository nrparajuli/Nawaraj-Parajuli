import * as jwtDecode from 'jwt-decode';

import * as NullUtil from 'src/shared/NullUtil';
import { SchoologyAnnotatorError } from './SchoologyAnnotatorError';

/** The configuration object that's provided by Schoology and is exposed on `window.allyConfig`. */
export interface IJsPageConfig {
    /** The Ally client ID */
    allyClientId: string;

    /** The JWT token that's siged by Schoology using the Ally LTI secret */
    token: string;
}

/**
 * The JWT token from the [[IJsPageConfig]] object once it has been parsed.
 *
 * ```
 * {
 *   "name": "Christopher Aldin",
 *   "locale": "en",
 *   "roles": "Administrator,Instructor",
 *   "user_id": 104426000,
 *   "district_id": 4696135096,
 *   "section_id": 4885251100,
 *   "custom_building_id": "$com.schoology.Context.Building.id",
 *   "iat": 1624874898,
 *   "exp": 1624878498,
 *   "iss": "schoology"
 * }
 * ```
 */
export interface IJsJwtTokenPayload {
    /** The ID of the district the section belongs to */
    district_id: number;
    /** When the JWT token expires */
    exp: number;
    /** When the JWT token was issued */
    iat: number;
    /** The user's locale */
    locale: string;
    /** The user's profile name */
    name: string;
    /** The section its id */
    section_id: number;
    /** The set of LTI roles the user has */
    roles: string;
    /** The user's profile id */
    user_id: number;
}

export enum SchoologyPageType {
    /** The list of materials in a course section /course/4885251100/materials */
    ListOfMaterials,

    /** A file profile in a course section /course/4885251100/materials/gp/4893555363 */
    FileProfile,

    /** A static page /page/4885260409 */
    Page,

    /** A discussion which might have attachments /course/4885251100/materials/discussion/view/4961810515 */
    Discussion,

    /** An assignment /assignment/4885260702/info */
    Assignment
}

export interface ISchoologyPageInfo {
    /** The Schoology page */
    pageType: SchoologyPageType;

    /** The resource id within schoology, if any. e.g. if this is a page, the resource id could be 4885260409 */
    resourceId: string | null;

    /** The Ally rich content type prefix. e.g. page, discussion, assignment */
    richContentType: string | null;
}

interface IPageInfoResolver {
    regex: RegExp;

    /** If the page hosts a rich content item, the prefix of the ally external id (e.g. "page", "discussion", ...) */
    richContentType: string | null;
}

const pageRegexes: {[key in SchoologyPageType]: IPageInfoResolver} = {
    [SchoologyPageType.ListOfMaterials]: {
        'regex': /^\/course\/\d+\/materials$/,
        'richContentType': null
    },
    [SchoologyPageType.FileProfile]: {
        'regex': /^\/course\/\d+\/materials\/gp\/(\d+)$/,
        'richContentType': null
    },
    [SchoologyPageType.Page]: {
        'regex': /^\/page\/(\d+)$/,
        'richContentType': 'page'
    },
    [SchoologyPageType.Discussion]: {
        'regex': /^\/course\/\d+\/materials\/discussion\/view\/(\d+)$/,
        'richContentType': 'discussion'
    },
    [SchoologyPageType.Assignment]: {
        // Note that the list of materials links to /assignment/123 which then redirects to /assignment/123/info. Both
        // cases should be supported
        'regex': /^\/assignment\/(\d+)/,
        'richContentType': 'assignment'
    },
};

export class SchoologyConfig {

    public static fromPage(
        locationHref: HTMLHyperlinkElementUtils,
        $allyLoader: JQuery<HTMLElement>,
        pageConfig: IJsPageConfig | undefined
    ): SchoologyConfig | SchoologyAnnotatorError {
        const allyLoaderSrc = NullUtil.orElse<string>($allyLoader.attr('src'), '');
        if (allyLoaderSrc !== '' && allyLoaderSrc.indexOf('platform-name=schoology') !== -1) {
            if (pageConfig) {
                const baseUrl = allyLoaderSrc.split('/').slice(0, 3).join('/');
                const token = this.parseJwtToken(pageConfig.token);
                const pageInfo = resolvePageInfo(locationHref);
                if (NullUtil.hasValue(pageInfo)) {
                    const clientId = this.parseClientId(pageConfig);
                    if (NullUtil.hasValue(clientId)) {
                        return new SchoologyConfig(
                            baseUrl,
                            clientId,
                            token.section_id,
                            token.locale,
                            token.roles.split(','),
                            pageConfig.token,
                            token,
                            pageInfo
                        );
                    } else {
                        return SchoologyAnnotatorError.MissingAllyClientId;
                    }
                } else {
                    return SchoologyAnnotatorError.NotASupportedPageType;
                }
            } else {
                return SchoologyAnnotatorError.NoConfigObjectAvailable;
            }
        } else {
            return SchoologyAnnotatorError.NotAschoologyPlatform;
        }
    }

    public static parseJwtToken(rawToken: string): IJsJwtTokenPayload {
        return jwtDecode(rawToken);
    }

    private static parseClientId(pageConfig: IJsPageConfig): number | null {
        const clientId = parseInt(pageConfig.allyClientId, 10);
        if (!isNaN(clientId)) {
            return clientId;
        } else {
            return null;
        }
    }

    constructor(
        /** The base url of the Ally server. */
        public readonly baseUrl: string,
        /** The numerical Ally client id. */
        public readonly clientId: number,
        /** The numerical Schoology course id. */
        public readonly courseId: number,
        /** The configured user locale. */
        public readonly locale: string,
        /** The user LTI roles. */
        public readonly roles: string[],
        /** The raw JWT token to use for authentication. */
        public readonly jwtToken: string,
        /** The parsed JWT token provided by Schoology */
        public readonly parsedToken: IJsJwtTokenPayload,
        /** The type of page that is currently active. */
        public readonly pageInfo: ISchoologyPageInfo
    ) {}
}

/** Using the given URL, determine what schoology page is displayed, resolving any resource IDs if applicable */
export function resolvePageInfo(location: HTMLHyperlinkElementUtils): ISchoologyPageInfo | null {
    for (const key in SchoologyPageType) {
        if (!isNaN(parseInt(key, 10))) {
            const parsedKey = parseInt(key, 10);
            const pageType = parsedKey as SchoologyPageType;
            const match = location.pathname.match(pageRegexes[pageType].regex);
            if (match !== null) {
                const resourceId = NullUtil.orNull(match[1]);
                const richContentType = pageRegexes[pageType].richContentType;
                return {pageType, resourceId, richContentType};
            }
        }
    }
    return null;
}
