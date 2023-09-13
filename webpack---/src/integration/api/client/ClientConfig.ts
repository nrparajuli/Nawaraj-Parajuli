
import * as $ from 'jquery';

import * as NullUtil from 'src/shared/NullUtil';

/** Represents a simplified model of an HTTP error */
export interface IHttpError {
    /** The status code of the failed response */
    code: number;
    /** The body of the failed response. Hopefully this was a simple text message... */
    msg: string;
}

export type AuthCallback = (err: IHttpError | Error | null, data?: {bearer?: string}) => void;
export type AuthFunction = (eid: string | null, callback: AuthCallback) => Promise<{bearer?: string}> | void;

/**
 * A simple data object for configuring an instance of [[Client]]. This is the main data entry-point, allowing an
 * instance of the [[Client]] to be created from JavaScript in the following way:
 *
 * ```javascript
 * ally.ui({
 *     'client': {
 *         'auth': () => Promise.resolve({'bearer': 'The bearer token'}),
 *         'baseUrl': 'http://localhost:9080',
 *         'clientId': 123
 *     },
 *     'courseId': '_123_1',
 *     'locale': $('html').attr('lang'),
 *     'platformName': 'learn',
 *     'role': 'instructor'
 * });
 * ```
 */
export interface IClientConfigObj {
    /** The ally base url (e.g., https://prod.ally.ac or http://localhost:9080 ). */
    baseUrl: string;
    /** The LMS base url (e.g., https://moodle-performance-clone.ally.ac). */
    lmsUrl?: string | null;
    /** The id of the client, as provided by the Ally team. */
    clientId: number;
    /**
     * The authentication mechanism that provides the bearer token. This should be a JWT token and its exact format is
     * currently dependent on the particular platform. Collaboration with the Ally team will be necessary to identify
     * the proper mechanism of authentication.
     *
     * This function can be used either as a callback or Promise-yielding function. If the invocation returns
     * `undefined`, then it will be treated as a callback. Otherwise it will be treated as a [[Promise]].
     */
    auth?: AuthFunction;
    /**
     * Specifies if, when fetching file reports for a course, instructor feedback should be forced to be enabled despite
     * server side configuration.
     */
    forceInstructorFeedbackEnabled?: boolean;
    /**
     * An optional injection of a custom `jQuery` instance. Internally, the [[Client]] uses `$.ajax` to perform HTTP
     * requests to the Ally server for file accessibility metadata. When this is not overridden, the [[Client]] behaves
     * normally with its internal version of `jQuery`. When overridden, the [[Client]] uses this `jQuery.ajax` function
     * to call to the Ally servers.
     *
     * Additionally, the [[JsUiFactory]] provides a [[JsUiFactory.$mock]] function that can be used to properly mock
     * this functionality given a simple set of accessibility metadata defined by [[IMockCourses]]. This allows a test
     * environment to be mocked without a running Ally server in the following manner:
     *
     * ```javascript
     * const $mock = ally.ui.$mock({
     *     "course_0": {
     *         "file_0": {
     *             "availableAlternativeFormats": null,
     *             "creator": null,
     *             "decorative": null,
     *             "description": "a meaningful description",
     *             "id": "file_0",
     *             "isVersioned": false,
     *             "libraryReference": null,
     *             "name": "photo.png",
     *             "producer": null,
     *             "results": {},
     *             "score": 0.9,
     *             "size": 12345,
     *             "suggestions": {},
     *             "type": "image"
     *         }
     *     }
     * });
     *
     * ally.ui({
     *     'client': {
     *         'auth': () => Promise.resolve({'bearer': 'The bearer token'}),
     *         'baseUrl': 'http://localhost:9080',
     *         'clientId': 123,
     *         // Override jQuery with the mocked data
     *         'jQuery': $mock
     *     },
     *     'courseId': '_123_1',
     *     'locale': $('html').attr('lang'),
     *     'platformName': 'learn',
     *     'role': 'instructor'
     * });
     * ```
     */
    jQuery?: JQueryStatic;
}

/**
 * The full configuration used by the [[Client]] to operate. A [[ClientConfig]] is typically created from JavaScript by
 * providing a [[IClientConfigObj]] to the `ally.ui(...)` factory function.
 */
export class ClientConfig {

    /**
     * Create a [[ClientConfig]] from a simple [[IClientConfigObj]].
     *
     * @param obj   The [[IClientConfigObj]]
     * @return      A fully configured [[ClientConfig]]
     */
    public static fromConfigObject(obj: IClientConfigObj) {
        return new ClientConfig(
            obj.baseUrl,
            obj.clientId,
            obj.forceInstructorFeedbackEnabled,
            obj.lmsUrl,
            obj.auth,
            obj.jQuery,
        );
    }

    /** @see [[IClientConfigObj.baseUrl]] */
    public baseUrl: string;
    /** @see [[IClientConfigObj.lmsUrl]] */
    public lmsUrl?: string | null;
    /** @see [[IClientConfigObj.clientId]] */
    public clientId: number;
    /** @see [[IClientConfigObj.auth]] */
    public auth: AuthFunction;
    /** @see [[IClientConfigObj.forceInstructorFeedbackEnabled]] */
    public forceInstructorFeedbackEnabled: boolean | null;
    /** @see [[IClientConfigObj.jQuery]] */
    public jQuery: JQueryStatic;

    constructor(
        baseUrl: string,
        clientId: number,
        forceInstructorFeedbackEnabled?: boolean | null,
        lmsUrl?: string | null,
        auth?: AuthFunction,
        jQuery?: JQueryStatic
    ) {
        this.baseUrl = baseUrl;
        this.lmsUrl = lmsUrl;
        this.clientId = clientId;

        if (auth) {
            this.auth = auth;
        } else {
            this.auth = () => Promise.resolve({});
        }

        if (NullUtil.hasValue(forceInstructorFeedbackEnabled)) {
            this.forceInstructorFeedbackEnabled = forceInstructorFeedbackEnabled;
        } else {
            this.forceInstructorFeedbackEnabled = null;
        }

        if (jQuery) {
            this.jQuery = jQuery;
        } else {
            this.jQuery = $;
        }
    }
}
