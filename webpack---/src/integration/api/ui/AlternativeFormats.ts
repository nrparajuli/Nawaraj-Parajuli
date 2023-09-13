
import {FileReport} from 'src/integration/api/client/FileReport';
import {PartialFalsey} from 'src/integration/api/PartialFalsey';
import * as Templates from 'src/integration/api/ui/Templates';
import {Ui} from 'src/integration/api/ui/Ui';
import {IJsWebpage, Webpage} from 'src/integration/api/ui/Webpage';
import * as NullUtil from 'src/shared/NullUtil';

const AlternativeFormatsUtil = require('src/integration/alternativeFormatsUtil');

type FileLaunchArgs = [
    string,
    string,
    string | null,
    number,
    string,
    string,
    FileReport,
    JQuery<HTMLElement>,
    ILaunchOpts,
    ILaunchCallbacks
];

type WebpageLaunchArgs = [
    string,
    string,
    string | null,
    number,
    string,
    IJsWebpage,
    JQuery<HTMLElement>,
    ILaunchOpts,
    ILaunchCallbacks,
    IDirectFileOnWebPageInfo?
];

type AaasContentLaunchArgs = [
    string,
    string,
    string | null,
    number,
    string,
    JQuery<HTMLElement>,
    ILaunchOpts,
    ILaunchCallbacks,
    IAaasContentInfo
];

export interface IAlternativeFormatsFormatsConfig {
    /**
     * Whether to close the formats dialog when a format has been emitted
     */
    closeWhenFormatReady: boolean;

    /**
     * Whether to render an audio player for the Tts format on mobile devices. Defaults to `true`. If set to `false`,
     * the audio file will be downloaded (or a URL will be bubbled up to the caller).
     */
    renderAudioOnMobileInline: boolean;
}

/** An associated file reference */
export interface IBasicAssociatedFileReference {
    externalId: string;
    title: string | null;
}

/** The associated file information as returned by the back-end */
export interface IJsAssociatedFile {
    externalId: string;
    fileName?: string;
    fileType: string;
    mimeType: string;
    supportsAlternativeFormats: boolean;
    title?: string;
}

export interface ILaunchOpts {
    associatedFiles?: IBasicAssociatedFileReference[];
    locale: string;
    parentEl?: HTMLElement;
    renderAudioOnMobileInline?: boolean;
}
export interface IDirectFileOnWebPageInfo {
    fileType: string;
    href: string;
    id: string;
    mimeType: string;
    text: string;
    url: string;
}

export interface IAaasContentInfo {
    contentHash: string;
    url: string;
}

export interface IAlternativeFormatsGeneratedData {
    /** The generated format (e.g. OcredPdf, Html, Epub, Tts, ...) */
    format: string;

    /** The mime type of the generated format. If unknown, this is `null` */
    formatMimeType: string | null;

    /** The extension of the generated format (e.g. html, pdf, ...) */
    extension: string;

    /** The signed URL where the format can be downloaded from. This is typically only valid for a few minutes */
    url: string;

    /** The language of the format in case a translation was requested */
    language: string | null;

    /** The ally content id of the content instance */
    contentId: string;
}

export interface IAlternativeFormatAccessedData {
    /** The ally content id of the content instance */
    contentId: string;
}

export interface ILaunchCallbacks {
    /** Invoked when the user closes the alternative formats modal. */
    closed: () => void;

    /** Invoked when a format has been generated */
    formatGenerated: (data: IAlternativeFormatsGeneratedData) => void;

    /**
     * Open the given URL in a browser window.
     *
     * Note that the alternative formats app by default simply opens the link in a new tab/window. By specifying this
     * callback, that behaviour won't take place and it's up to the caller to direct the user to the correct page.
     *
     * Keep in mind that this callback is invoked after having received a message via the iframe's postMessage
     * mechanism and NOT on a user event. This will most likely prevent the caller from using `window.open` without
     * running into some kind of pop-up blocker in most modern browsers.
     *
     * @param url The url to open
     */
    openUrl?: (url: string) => void;

    /**
     * Indicates that the item was accessed by the end user, whether that's via
     * the immersive reader, inline, or by download.
     */
    alternativeFormatAccessed?: (data: IAlternativeFormatAccessedData) => void;
}

export class AlternativeFormats {

    /** Carries the previous launch args that were used to launch alternative formats for a file. */
    public static previousFileLaunchArgs: FileLaunchArgs;

    /** Carries the previous launch args that were used to launch alternative formats for a webpage. */
    public static previousWebpageLaunchArgs: WebpageLaunchArgs;

    /** Carries the previous launch args that were used to launch alternative formats for an Ally as a Service item. */
    public static previousAaasLaunchArgs: AaasContentLaunchArgs;

    /**
     * Launch the alternative formats on the page for a specific file that Ally knows about. This expands an html
     * template containing the alternative formats iframe that is overlayed onto the page.
     *
     * @param ui                The current [[Ui]] instance associated to the element which triggered this launch
     * @param courseId          The id of the course to which the file belongs
     * @param contentId         The arbitrary content id that the file correlates to
     * @param fileReport        The report data of the file being launched
     * @param opts              Launch arguments
     * @param callerCallbacks   Caller callbacks that can be used to connect functionality to alternative format events.
     *                          This will be invoked after internal system callbacks, but before the user callbacks
     *                          provided in the [[UiConfig]]
     */
    public static launchFile(
        ui: Ui,
        courseId: string,
        contentId: string,
        fileReport: FileReport,
        opts: ILaunchOpts,
        callerCallbacks: PartialFalsey<ILaunchCallbacks>
    ): void {
        const baseUrl = ui.client.config.baseUrl;
        const platformName = ui.config.platformName;
        const platformUi = ui.config.platformUi;
        const clientId = ui.client.config.clientId;

        const iframeHtml = Templates.alternativeFormatsIframe.apply({
            'ALLY_DOMAIN': ui.client.config.baseUrl,
            'i18n': ui.i18n,
            'locale': ui.config.locale,
            'platformName': platformName,
            'platformUi': platformUi
        });

        AlternativeFormats.previousFileLaunchArgs = [
            baseUrl,
            platformName,
            platformUi,
            clientId,
            courseId,
            contentId,
            fileReport,
            iframeHtml,
            opts,
            AlternativeFormats.resolveCallbacks(ui, callerCallbacks)
        ];

        AlternativeFormatsUtil.launch.call(null, ...AlternativeFormats.previousFileLaunchArgs);
    }

    /**
     * Launch the alternative formats on the page for a specific webpage that Ally is installed on This expands an html
     * template containing the alternative formats iframe that is overlayed onto the page.
     *
     * @param ui The current [[Ui]] instance associated to the element which triggered this launch
     * @param contentId The arbitrary content id that the file correlates to
     * @param webpage The webpage data of the page being launched
     * @param opts Launch arguments
     * @param callerCallbacks Caller callbacks that can be used to connect functionality to alternative format events.
     *                        This will be invoked after internal system callbacks, but before the user callbacks
     *                        provided in the [[UiConfig]]
     */
    public static launchWebpage(
        ui: Ui,
        contentId: string,
        webpage: Webpage,
        opts: ILaunchOpts,
        callerCallbacks: PartialFalsey<ILaunchCallbacks>
    ): void {
        const baseUrl = ui.client.config.baseUrl;
        const i18n = ui.i18n;
        const platformName = ui.config.platformName;
        const platformUi = ui.config.platformUi;
        const clientId = ui.client.config.clientId;

        const iframeHtml = Templates.alternativeFormatsIframe.apply({
            'ALLY_DOMAIN': baseUrl,
            'i18n': i18n,
            'locale': ui.config.locale,
            'platformName': platformName,
            'platformUi': platformUi
        });

        AlternativeFormats.previousWebpageLaunchArgs = [
            baseUrl,
            platformName,
            platformUi,
            clientId,
            contentId,
            webpage.toJson(),
            iframeHtml,
            opts,
            AlternativeFormats.resolveCallbacks(ui, callerCallbacks)
        ];

        AlternativeFormatsUtil.launchWebpage.call(null, ...AlternativeFormats.previousWebpageLaunchArgs);
    }

    // TODO: Remove
    public static launchDirectFileOnWebpage(
        ui: Ui,
        contentId: string,
        webpage: Webpage,
        opts: ILaunchOpts,
        directFileInfo: IDirectFileOnWebPageInfo,
        callerCallbacks: PartialFalsey<ILaunchCallbacks>
    ): void {
        const baseUrl = ui.client.config.baseUrl;
        const i18n = ui.i18n;
        const platformName = ui.config.platformName;
        const platformUi = ui.config.platformUi;
        const clientId = ui.client.config.clientId;

        const iframeHtml = Templates.alternativeFormatsIframe.apply({
            'ALLY_DOMAIN': baseUrl,
            'i18n': i18n,
            'locale': ui.config.locale,
            'platformName': platformName,
            'platformUi': platformUi
        });

        AlternativeFormats.previousWebpageLaunchArgs = [
            baseUrl,
            platformName,
            platformUi,
            clientId,
            contentId,
            webpage.toJson(),
            iframeHtml,
            opts,
            AlternativeFormats.resolveCallbacks(ui, callerCallbacks),
            directFileInfo,
        ];

        AlternativeFormatsUtil.launchDirectFileOnWebpage.call(null, ...AlternativeFormats.previousWebpageLaunchArgs);
    }

    public static launchAaasContent(
        ui: Ui,
        contentId: string,
        opts: ILaunchOpts,
        contentInfo: IAaasContentInfo,
        callerCallbacks: PartialFalsey<ILaunchCallbacks>
    ): void {
        const baseUrl = ui.client.config.baseUrl;
        const i18n = ui.i18n;
        const platformName = ui.config.platformName;
        const platformUi = ui.config.platformUi;
        const clientId = ui.client.config.clientId;

        const iframeHtml = Templates.alternativeFormatsIframe.apply({
            'ALLY_DOMAIN': baseUrl,
            'i18n': i18n,
            'locale': ui.config.locale,
            'platformName': platformName,
            'platformUi': platformUi
        });

        AlternativeFormats.previousAaasLaunchArgs = [
            baseUrl,
            platformName,
            platformUi,
            clientId,
            contentId,
            iframeHtml,
            opts,
            AlternativeFormats.resolveCallbacks(ui, callerCallbacks),
            contentInfo,
        ];

        AlternativeFormatsUtil.launchAaasContent.call(null, ...AlternativeFormats.previousAaasLaunchArgs);
    }

    /**
     * Destroy all stateful functionality relating to alternative formats, such as any internal iframes that remain
     * available for the duration of the page session.
     */
    public static destroy(): void {
        AlternativeFormatsUtil.reset();
    }

    public static resolveCallbacks(
        ui: Ui,
        callerCallbacks: PartialFalsey<ILaunchCallbacks>
    ): ILaunchCallbacks {
        const callbacks: ILaunchCallbacks = {
            'alternativeFormatAccessed': (data: IAlternativeFormatAccessedData) => {
                if (NullUtil.hasValue(callerCallbacks.alternativeFormatAccessed)) {
                    callerCallbacks.alternativeFormatAccessed(data);
                }

                const callback = ui.config.alternativeFormats.callbacks.alternativeFormatAccessed;
                if (NullUtil.hasValue(callback)) {
                    // TODO: re-enable once AB#2165961 is resolved, as currently this tears down ultra UI down.
                    // callback(data);
                }
            },
            'closed': () => {
                if (NullUtil.hasValue(callerCallbacks.closed)) {
                    callerCallbacks.closed();
                }
                ui.config.alternativeFormats.callbacks.closed();
            },
            'formatGenerated': (data: IAlternativeFormatsGeneratedData) => {
                if (NullUtil.hasValue(callerCallbacks.formatGenerated)) {
                    callerCallbacks.formatGenerated(data);
                }
                ui.config.alternativeFormats.callbacks.formatGenerated(data);
            },
            'openUrl': undefined
        };

        // Only set callbacks.openUrl if a callback was explicitly given or set in the config
        if (
            NullUtil.hasValue(callerCallbacks.openUrl) ||
            NullUtil.hasValue(ui.config.alternativeFormats.callbacks.openUrl)
        ) {
            callbacks.openUrl = (url: string) => {
                if (NullUtil.hasValue(callerCallbacks.openUrl)) {
                    callerCallbacks.openUrl(url);
                }
                if (NullUtil.hasValue(ui.config.alternativeFormats.callbacks.openUrl)) {
                    ui.config.alternativeFormats.callbacks.openUrl(url);
                }
            };
        }

        return callbacks;
    }
}
