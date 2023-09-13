
import * as NullUtil from 'src/shared/NullUtil';

export enum MoodleAnnotatorError {
    /** We didn't annotate the page because the script tag didn't have a `platform-name=moodle` query string param. */
    NotAMoodlePlatform,

    /** The Ally filter could not be resovled through Moodle's requirejs */
    MoodleAllyFilterNotFound,

    /** The current page is not in a course */
    NotAMoodleCourse
}

/**
 * The JWT token once it has been parsed.
 *
 * ```
 * {
 *     "iat": 1593791377,
 *     "course_id": 14,
 *     "roles": "urn:lti:role:ims/lis/Instructor,urn:lti:role:ims/lis/Administrator",
 *     "user_id": 4,
 *     "locale": "en",
 *     "return_url": "http://178.62.43.85"
 * }
 * ```
 */
export interface IJsJwtTokenPayload {
    course_id: number;
    iat: number;
    locale: string;
    return_url: string;
    roles: string;
    user_id: number;
}

export class MoodleConfig {
    public static fromPage(
        $allyLoader: JQuery<HTMLElement>,
        window: Window
    ): MoodleConfig | MoodleAnnotatorError {
        const allyLoaderSrc = NullUtil.orElse<string>($allyLoader.attr('src'), '');
        if (allyLoaderSrc.indexOf('platform-name=moodle') === -1) {
            return MoodleAnnotatorError.NotAMoodlePlatform;
        }

        const courseId = this.getCourse(window);
        if (!NullUtil.hasValue(courseId)) {
            return MoodleAnnotatorError.NotAMoodleCourse;
        }

        const require = (window as any).require;
        if (typeof require !== 'function') {
            return MoodleAnnotatorError.MoodleAllyFilterNotFound;
        }

        const allyMoodleAmd = require('filter_ally/ally');
        if (!NullUtil.hasValue(allyMoodleAmd) || typeof allyMoodleAmd !== 'object') {
            return MoodleAnnotatorError.MoodleAllyFilterNotFound;
        }

        const baseUrl = allyMoodleAmd.getAllyBaseUrl();
        const clientId = allyMoodleAmd.config().clientid;
        const locale = window.document.documentElement.getAttribute('lang');
        const token = allyMoodleAmd.token();

        return new MoodleConfig(
            baseUrl,
            clientId,
            courseId,
            NullUtil.orElse<string>(locale, 'en'),
            token
        );
    }

    private static getCourse(window: Window): number | null {
        const courseId: string | undefined = NullUtil.orElse<string>(window.document.body.getAttribute('class'), '')
            .split(' ')
            .filter((className) => className.indexOf('course-') === 0)
            .map((className) => className.split('-')[1])[0];

        // Ignore course id 1 as that's the main dashboard context and not relevant to Ally
        if (NullUtil.hasValue(courseId) && courseId !== '1') {
            const courseIdNumber = parseInt(courseId, 10);
            return (isNaN(courseIdNumber)) ? null : courseIdNumber;
        } else {
            return null;
        }
    }

    public constructor(
        /** The base url of the Ally server. */
        public readonly baseUrl: string,
        /** The numerical Ally client id. */
        public readonly clientId: number,
        /** The numerical Moodle course id. */
        public readonly courseId: number,
        /** The configured user locale. */
        public readonly locale: string,
        /** The raw JWT token to use for authentication. */
        public readonly jwtToken: string
    ) {}
}
