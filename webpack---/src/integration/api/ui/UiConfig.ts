
import * as $ from 'jquery';

import {Clientable} from 'src/integration/api/client/ClientFactory';
import {PartialFalsey} from 'src/integration/api/PartialFalsey';
import * as NullUtil from 'src/shared/NullUtil';
import {orElse, whenHasValue} from 'src/shared/NullUtil';
import {IAlternativeFormatAccessedData, IAlternativeFormatsFormatsConfig, IAlternativeFormatsGeneratedData, ILaunchCallbacks as IAlternativeFormatsCallbacks} from './AlternativeFormats';
import {LearnUltraUtil} from './annotators/learn-ultra/LearnUltraUtil';
import {ILaunchCallbacks as IInstructorFeedbackCallbacks} from './InstructorFeedback';
import {IJsScoreIndicatorIconSet} from './templates/ScoreIndicatorTemplate';
import {UiDirective} from './UiDirective';
import {UiMacro} from './UiMacro';

/** The external UI event tracker signature. */
export type EventTracker = (event: string, data: Record<string, string>) => void;

/**
 * A simple data object for configuring an instance of [[Ui]]. This is the main data entry-point, allowing an instance
 * of the [[Ui]] to be created from JavaScript in the following way:
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
export interface IUiConfigObj {
    /** Configuration for all alternative formats-related functionality. */
    alternativeformats?: IAlternativeFormatsConfig;
    /** The configuration for the [[Client]] API. Allows any type represented by the [[Clientable]] alias. */
    client: Clientable;
    /** The root of the DOM where all content instances should be found. Defaults to `document.body` */
    contentRoot?: HTMLElement;
    /** The id of the course in which this [[Ui]] instance is being run, if applicable. */
    courseId?: string;
    /** Configuration for all instructor feedback-related functionality. */
    instructorfeedback?: IInstructorFeedbackConfig;
    /** The locale of the current user. */
    locale?: string;
    /** The platform name (e.g., learn, canvas, moodle, wcm, web...) */
    platformName: string;
    /** The UI Ally is integrated in as some platforms have multiple UIs (e.g. `learn` has `original` and `ultra`). */
    platformUi?: string;
    /** The role of the current user. Should be one of: `admin`, `instructor`, `student`, `anonymous` */
    role: string;
    /** The external UI event tracking service. */
    eventTracker?: EventTracker;
}

/** Configuration for all instructor feedback-related functionality. */
export interface IInstructorFeedbackConfig {
    /**
     * A function that can resolve a file download URL, enabling users to download an original file through the
     * instructor feedback functionality.
     *
     * @param fileId    The eid of the file for which to get a fully qualified and authenticated download URL
     * @param callback  The callback function in which to pass the result url. The first argument is an error (if any),
     *                  and the second is the fully qualified URL
     * @return          The fully qualified and authenticated download URL contained in a promise. If the response is
     *                  passed through the callback, then use that instead
     */
    getFileDownloadUrl?: (fileId: string, callback: (err: any, url: string) => void) => Promise<string> | void;

    /** A set of callbacks that can be used to be notified when certain instructor feedback-related events occur. */
    callbacks: IInstructorFeedbackCallbacks;

    /**
     * A function that can be used to open a new window
     *
     * @param url    The URL that the new window should open
     */
    windowLauncher?: (url: string) => void;

    /** Allows for specifying the custom icon set */
    customIconSet?: IJsScoreIndicatorIconSet;
}

/** Configuration for all alternative formats-related functionality. */
export interface IAlternativeFormatsConfig {
    /** A set of callbacks that can be used to be notified when certain alternative formats-related events occur. */
    callbacks: IAlternativeFormatsCallbacks;

    /** Any configuration related to specific alternative formats */
    formats?: IAlternativeFormatsFormatsConfig;
}

/**
 * The full configuration used by the [[Ui]] to operate. A [[UiConfig]] is typically created from JavaScript by
 * providing a [[IUiConfigObj]] to the `ally.ui(...)` factory function.
 */
export class UiConfig {

    /**
     * Create a [[UiConfig]] from a simple [[IUiConfigObj]].
     *
     * @param obj   The simple [[IUiConfigObj]]
     * @return      The fully resolved [[UiConfig]]
     */
    public static from(window: Window, obj: IUiConfigObj, directives: UiDirective[], macros: UiMacro[]): UiConfig {
        const platformUi = this.resolvePlatformUi(window, obj.platformName, obj.platformUi);
        const alternativeFormats = UiConfig.resolveAlternativeFormats(obj.alternativeformats);
        const instructorFeedback = UiConfig.resolveInstructorFeedback(obj.instructorfeedback);
        const contentRoot = (obj.contentRoot) ? obj.contentRoot : document.body;
        const locale = UiConfig.resolveLocale(obj.locale);
        const eventTracker: EventTracker | undefined = orElse(
            whenHasValue(obj.eventTracker, (tracker) => (event, data = {}) => tracker('click', {...data, event})),
            undefined
        );
        return new UiConfig(
            obj.platformName,
            platformUi,
            NullUtil.orNull(obj.courseId),
            obj.role,
            locale,
            obj.client,
            alternativeFormats,
            instructorFeedback,
            contentRoot,
            directives,
            macros,
            eventTracker
        );
    }

    /**
     * Resolve all necessary defaults for a partial alternative formats configuration.
     *
     * @param alternativeFormats    The partial alternative formats configuration
     * @return                      The resolved [[IAlternativeFormatsConfig]]
     */
    public static resolveAlternativeFormats(alternativeFormats?: any): IAlternativeFormatsConfig {
        alternativeFormats = (alternativeFormats) ? alternativeFormats : {};
        alternativeFormats.callbacks = UiConfig.resolveAlternativeFormatsCallbacks(alternativeFormats.callbacks);
        alternativeFormats.formats = UiConfig.resolveAlternativeFormatsFormatsConfig(alternativeFormats.formats);
        return alternativeFormats;
    }

    /**
     * Resolve all necessary defaults for a partial instructur feedback configuration.
     *
     * @param instructorFeedback    The partial instructur feedback configuration
     * @return                      The resolved [[IInstructorFeedbackConfig]]
     */
    public static resolveInstructorFeedback(instructorFeedback?: any): IInstructorFeedbackConfig {
        instructorFeedback = (instructorFeedback) ? instructorFeedback : {};
        instructorFeedback.callbacks = UiConfig.resolveInstructorFeedbackCallbacks(instructorFeedback.callbacks);
        return instructorFeedback;
    }

    /**
     * Resolve the locale of the page from a locale. If the locale is specified, it will be used. Otherwise we will look
     * at the HTML `lang` attribute. If not specified, we will finally fall back to `en-us`.
     *
     * @param locale The configured locale
     * @return The resolved locale
     */
    public static resolveLocale(locale?: string): string {
        if (typeof locale === 'string') {
            return locale;
        }

        const htmlLocale = $('html').attr('lang');
        if (typeof htmlLocale === 'string') {
            return htmlLocale;
        }

        return 'en-us';
    }

    /**
     * Resolve all necessary defaults for a partial alternative formats callbacks configuration.
     *
     * @param callbacks The partial alternative formats callbacks configuration
     * @return          The resolved [[IAlternativeFormatsCallbacks]]
     */
    public static resolveAlternativeFormatsCallbacks(
        callbacks?: PartialFalsey<IAlternativeFormatsCallbacks>
    ): IAlternativeFormatsCallbacks {
        callbacks = (callbacks) ? callbacks : {};

        // The default for when a format is generated, is to simply redirect to the generated URL
        /* istanbul ignore next */
        let formatGenerated = (data: IAlternativeFormatsGeneratedData) => {
            window.location.href = data.url;
        };
        if (NullUtil.hasValue(callbacks.formatGenerated)) {
            formatGenerated = callbacks.formatGenerated;
        }

        let closed: () => void = () => undefined;
        if (NullUtil.hasValue(callbacks.closed)) {
            closed = callbacks.closed;
        }

        let openUrl: ((url: string) => void) | undefined;
        if (NullUtil.hasValue(callbacks.openUrl)) {
            openUrl = callbacks.openUrl;
        }

        let alternativeFormatAccessed: ((data: IAlternativeFormatAccessedData) => void) | undefined;
        if (NullUtil.hasValue(callbacks.alternativeFormatAccessed)) {
            alternativeFormatAccessed = callbacks.alternativeFormatAccessed;
        }

        return {
            alternativeFormatAccessed,
            closed,
            formatGenerated,
            openUrl
        };
    }

    /** Resolve all necessary defaults for the alternative formats configurations */
    public static resolveAlternativeFormatsFormatsConfig(formats?: any): IAlternativeFormatsFormatsConfig {
        return {
            'closeWhenFormatReady': (
                NullUtil.hasValue(formats) &&
                NullUtil.hasValue(formats.closeWhenFormatReady) &&
                formats.closeWhenFormatReady === false) ? false : true,
            'renderAudioOnMobileInline': (
                NullUtil.hasValue(formats) &&
                NullUtil.hasValue(formats.renderAudioOnMobileInline) &&
                formats.renderAudioOnMobileInline === false) ? false : true
        };
    }

    /**
     * Resolve all necessary defaults for a partial instructor feedback callbacks configuration.
     *
     * @param callbacks The partial instructor feedback callbacks configuration
     * @return          The resolved [[IInstructorFeedbackCallbacks]]
     */
    public static resolveInstructorFeedbackCallbacks(callbacks?: any): IInstructorFeedbackCallbacks {
        callbacks = (callbacks) ? callbacks : {};
        return {
            'closed': () => undefined,
            'deleted': () => undefined,
            'fixHtmlIssue': () => Promise.resolve(),
            'replacedFile': () => undefined,
            'updated': () => undefined,
            ...callbacks
        };
    }

    /**
     * Resolve the [[UiConfig.platformUi]] variable based on the specified platform and page context.
     *
     * @param window The global window object from which to derive the `platformUi`
     * @param platformName The configured platform name
     * @param platformUi The configured platform UI, if any
     * @param ultraVariant The variant of ultra platform default to `ultra`
     */
    public static resolvePlatformUi(
        window: Window, platformName: string, platformUi?: string, ultraVariant = 'ultra'
    ): string | null {
        if (platformName === 'learn' && !NullUtil.hasValue(platformUi)) {
            if (LearnUltraUtil.isUltra(window)) {
                return ultraVariant;
            } else {
                return 'classic';
            }
        } else {
            return NullUtil.orNull(platformUi);
        }
    }

    /**
     * @param platformName @see [[IUiConfigObj.platformName]]
     * @param platformUi @see [[IUiConfigObj.platformUi]]
     * @param courseId @see [[IUiConfigObj.courseId]]
     * @param role @see [[IUiConfigObj.role]]
     * @param locale @see [[IUiConfigObj.locale]]
     * @param client @see [[IUiConfigObj.client]]
     * @param alternativeFormats @see [[IUiConfigObj.alternativeFormats]]
     * @param instructorFeedback @see [[IUiConfigObj.instructorFeedback]]
     * @param contentRoot @see [[IUiConfigObj.contentRoot]]
     * @param directives The directives available for the [[Ui]].
     * @param macros The macros available for the [[Ui]].
     * @param eventTracker The event tracker to use for tracking events.
     */
    private constructor(
        public platformName: string,
        public platformUi: string | null,
        public courseId: string | null,
        public role: string,
        public locale: string,
        public client: Clientable,
        public alternativeFormats: IAlternativeFormatsConfig,
        public instructorFeedback: IInstructorFeedbackConfig,
        public contentRoot: HTMLElement,
        public directives: UiDirective[],
        public macros: UiMacro[],
        public eventTracker?: EventTracker
    ) {}
}
