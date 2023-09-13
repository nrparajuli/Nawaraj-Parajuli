
import * as $ from 'jquery';
import * as CollectionUtil from 'src/shared/CollectionUtil';
import * as NullUtil from 'src/shared/NullUtil';

import { IClient, IUploadReportMap } from '../client/client.model';
import { from } from '../client/ClientFactory';
import { IJsFileReferences } from '../client/FileReference';
import { AlternativeFormats } from './AlternativeFormats';
import { LearnUltraAnnotator } from './annotators/LearnUltraAnnotator';
import { ContentInstance, ContentInstanceType, IContentInstances } from './ContentInstance';
import invokeDirective from './directives/Invoke';
import showDirective from './directives/Show';
import tooltipDirective from './directives/Tooltip';
import { I18n } from './I18n';
import { InstructorFeedback } from './InstructorFeedback';
import scoreIndicatorMacro from './macros/ScoreIndicator';
import { SeizureGuard } from './SeizureGuard';
import { UiComponent } from './UiComponent';
import { IUiConfigObj, UiConfig } from './UiConfig';
import { UiDirective } from './UiDirective';
import { UiMacro } from './UiMacro';
import {
    IHelpConfig, IMock, IMockCourseEmbedInfos, IMockCourseReports, IMockCourses, UiMock
} from './UiMock';

const IframeMessagingUtil = require('src/integration/iframeMessagingUtil');

const coreCssPath = require('src/integration/css/ally.css');

/** Keep track of the current global content id. */
let currentContentId = 0;

/**
 * Represents our main entry point to create a [[Ui]] integration. This is the global `ui` object that the consumer will
 * have available to create a configured instance of `Ui`.
 */
export interface IJsUiFactory {
    /**
     * Create a [[Ui]] instance from the simple [[IUiConfigObj]] configuration object.
     *
     * @param obj   The configuration object describing how to configure the [[Ui]] instance
     * @return      The configured [[Ui]] instance
     */
    (obj: IUiConfigObj): Ui;

    /**
     * Convenience function to create a new unique content instance id.
     *
     * @return  A unique content instance id
     */
     nextContentId: () => string;

    /**
     * Create a [[IMock]] instance that can be used to mock a set of Ally server data.
     *
     * @param data  The data to be held by the [[IMock]]
     * @return      An [[IMock]] that can be passed into the [[IClientConfigObj]] that causes it to use mocked data
     * @see [[IClientConfigObj.jQuery]]
     */
    $mock: (
        data: IMockCourses,
        embedInfos: IMockCourseEmbedInfos,
        helpConfig?: IHelpConfig,
        courseReports?: IMockCourseReports
    ) => IMock;
}

export const JsUiFactory = ((obj: IUiConfigObj) => {
    return Ui.fromConfigObject(window, obj, Ui.allDirectives, Ui.allMacros);
}) as IJsUiFactory;
JsUiFactory.nextContentId = () => (++currentContentId).toString();
JsUiFactory.$mock = UiMock.$mock;

/** Options available for automatically updating the DOM */
export interface IAutoUpdateOptions {
    /**
     * Represents the millisecond interval at which to automatically update the DOM. If a number `> 0` is specified, a
     * loop will begin running [[update]] at this frequency. Otherwise, no loop is started and only events based on
     * instructor feedback changes will trigger update cycles.
     */
    domWatch?: number;

    /** The element whose children to update according to directive specifications. */
    el?: HTMLElement;

    /**
     * A function that gets executed before every update invocation. This allows the caller to do any extra checks or
     * DOM setup. It also allows the caller to short-circuit the [[update]] operation by returning a `false` value.
     */
    preHook?: () => boolean;
}

export interface IAutoUpdateResult {
    /**
     * If [[IAutoUpdateOptions.domWatch]] was enabled, then this handler will be the interval handler that can be used
     * to clear the update cycle, such as:
     *
     * ```javascript
     * clearInterval(result.intervalHandler)
     * ```
     */
    intervalHandler?: number;
}

/** The I18n dictionary */
export interface II18n {
    // Don't type the init function, there's not a good way to model this object. It comes out of the integration nls
    // and is probably not worth overcomplicating
    // init: (locale: string) => void
    [key: string]: any;
}

/**
 * External interface for UI
 */
export interface IAllyUi {
    config: UiConfig;
    client: IClient;
    i18n: II18n;
    /**
     * Update all components contained in the specified element `el` and watch for instructor feedback updates in which
     * to continuously re-update the elements.
     *
     * @param options   Optional arguments describing how to update the DOM
     * @return          The auto update result, containing any resources that can be destroyed when auto-update should
     *                  be terminated
     * @see [[update]]
     */
    autoUpdate(options?: IAutoUpdateOptions): Promise<IAutoUpdateResult>;
    /**
     * Update all components contained in the specified element `el`, by using all content items available in the
     * specified element `contentRoot`. Essentially, the UI Components (i.e., those with a `data-ally-content-ref`
     * attribute) are searched for in `el`, while the Content Instances (i.e., those with a `data-ally-content-id`
     * attribute) are searched for in `contentRoot`. Only elements inside `el` will be manipulated according to the
     * directives.
     *
     * @param el    The element whose children to update according to directive specifications. Defaults to the
     *              [[UiConfig.contentRoot]]
     * @return      A [[Promise]] that resolves when the UI update has completed
     */
    update(el?: HTMLElement): Promise<void>;
    /**
     * Destroy any global stateful information in the page associated to this listener. This includes:
     *
     *  * Any existing instructor feedback state
     *  * Any existing alternative formats state
     *  * Any existing seizure guard state
     *
     * This allows the [[Ui]] instance to be destroyed and then recreated with a new configuration to handle situations
     * where single page applications maintain the same page session across courses.
     */
    destroy(): Promise<void>;

    /** Hook a handler to be called when the [[Ui]] object is destroyed. */
    onDestroy(handler: () => Promise<void>): void;
}

/**
 * An instance of `Ui` is the actual object a consumer uses to apply changes to directive and macro elements on their
 * page.
 */
export class Ui implements IAllyUi {

    // An array of all core macros
    public static allMacros: UiMacro[] = [
        scoreIndicatorMacro
    ];

    // An array of all core directives
    public static allDirectives: UiDirective[] = [
        invokeDirective,
        showDirective,
        tooltipDirective
    ];

    public static fromConfigObject(
        window: Window,
        obj: IUiConfigObj,
        directives: UiDirective[],
        macros: UiMacro[]
    ): Ui {
        const ui = new Ui(UiConfig.from(window, obj, directives, macros));

        /* istanbul ignore next */
        // tslint:disable-next-line:no-floating-promises
        LearnUltraAnnotator.annotate(ui, window);
        return ui;
    }

    /** Add the given URL as a stylesheet to the current page */
    public static addStylesheet(url: string, id: string, elementToAddStyles?: Element): void {
        if ($(`.ally-styles[href="${url}"]`).length === 0) {

            const attrs = {
                'class': 'ally-styles',
                'href': url,
                'id': id,
                'rel': 'stylesheet'
            };
            const $styles = $('<link />', attrs);
            const el = NullUtil.orElse(elementToAddStyles, document.head);
            $(el).append($styles);
        }
    }

    public config: UiConfig;
    public client: IClient;
    public i18n: II18n;

    private autoUpdates: Array<{el: HTMLElement}> = [];
    private domWatches: number[] = [];
    private onDestroyHandlers: Array<() => Promise<void>> = [];

    /** Keep track of whether or not we've loaded the iframe listeners. */
    private isListeningOnIframe = false;

    constructor(config: UiConfig) {
        this.config = config;
        this.client = from(config.client, config.platformName);
        this.i18n = I18n.allI18n;

        // Determine the language that should be used from the passed in locale. Do this here rather than in the
        // UiConfig, so that the configured value can be passed on to the instructorfeedback and/or alternative formats
        // apps as-is
        this.i18n.init(I18n.resolveSupportedLanguage(config.locale));

        // Bind listeners to automatically clear file cache and update auto-update bindings when files are updated
        // through instructor feedback
        InstructorFeedback.onContentDeleted('ui', (fileId) => this.doAutoUpdate(fileId));
        InstructorFeedback.onContentReplaced('ui', (oldFileId, newFileInfo) => this.doAutoUpdate(oldFileId,
            newFileInfo.id));
        InstructorFeedback.onContentUpdated('ui', (fileReport) => this.doAutoUpdate(fileReport.id));
    }

    /**
     * Update all components contained in the specified element `el` and watch for instructor feedback updates in which
     * to continuously re-update the elements.
     *
     * @param options   Optional arguments describing how to update the DOM
     * @return          The auto update result, containing any resources that can be destroyed when auto-update should
     *                  be terminated
     * @see [[update]]
     */
    public autoUpdate(options: IAutoUpdateOptions = {}): Promise<IAutoUpdateResult> {
        const el = (options.el) ? options.el : this.config.contentRoot;
        this.autoUpdates.push({el});

        // Default the pre-hook. If no pre-hook was provided, the `update()` should get executed everytime.
        const preHook = NullUtil.orElse<() => boolean>(options.preHook, () => true);

        // Run the pre-hook and update the UI if necessary
        const updatePromise = preHook() ? this.update(el) : Promise.resolve();
        return updatePromise.then(() => {
            // Casting as `any` here because TypeScript doesn't understand that this returns a number in the browser.
            // Not a [[NodeJS.Timer]] and I can't seem to get it to interpret that properly.
            let intervalHandler: any = null;
            if (NullUtil.orElse<number>(options.domWatch, 0) > 0) {
                intervalHandler = setInterval(() => {
                    if (preHook()) {
                        void this.update(el);
                    }
                }, options.domWatch);
                this.domWatches.push(intervalHandler);
            }
            return {intervalHandler};
        });
    }

    /**
     * Update all components contained in the specified element `el`, by using all content items available in the
     * specified element `contentRoot`. Essentially, the UI Components (i.e., those with a `data-ally-content-ref`
     * attribute) are searched for in `el`, while the Content Instances (i.e., those with a `data-ally-content-id`
     * attribute) are searched for in `contentRoot`. Only elements inside `el` will be manipulated according to the
     * directives.
     *
     * @param el    The element whose children to update according to directive specifications. Defaults to the
     *              [[UiConfig.contentRoot]]
     * @return      A [[Promise]] that resolves when the UI update has completed
     */
    public update(el?: HTMLElement): Promise<void> {
        const resolvedEl = (NullUtil.hasValue(el)) ? el : this.config.contentRoot;
        const contentInstances = ContentInstance.fromRoot($(this.config.contentRoot));
        return this.getFileReportMapIfNecessary(contentInstances).then((reports) => {
            this.initStyles();
            this.listenOnIframeIfNecessary(contentInstances, reports);

            // Apply workarounds where applicable for each content instance (e.g., apply Ally-held alt text to embedded
            // images that are missing it)
            Object.keys(reports).forEach((id) => contentInstances[id].applyAllyWorkArounds(this, reports[id]));

            // Apply all macros to expand their templates (including items that contain directives)
            UiComponent.fromRoot($(resolvedEl)).forEach((c) => {
                // Only run a macro if the component references an existing content instance
                if (ContentInstance.findContentInstances(contentInstances, c.getContentInstanceId()).length > 0) {
                    UiMacro.run(this, c, contentInstances, reports, this.config.macros);
                }
            });

            // Apply all our directives
            UiComponent.fromRoot($(resolvedEl)).forEach((c) => {
                // Only run a directive if the component references an existing content instance
                if (ContentInstance.findContentInstances(contentInstances, c.getContentInstanceId()).length > 0) {
                    UiDirective.run(this, c, contentInstances, reports, this.config.directives);
                }
            });
        });
    }

    /**
     * Destroy any global stateful information in the page associated to this listener. This includes:
     *
     *  * Any existing instructor feedback state
     *  * Any existing alternative formats state
     *  * Any existing seizure guard state
     *
     * This allows the [[Ui]] instance to be destroyed and then recreated with a new configuration to handle situations
     * where single page applications maintain the same page session across courses.
     */
    public destroy(): Promise<void> {
        // First clear out our DOM watches and auto-updates, clearing the associated reference arrays
        this.domWatches.forEach((handler) => clearInterval(handler));
        this.domWatches = [];
        this.autoUpdates = [];

        // Destroy instructor feedback iframe and handlers
        InstructorFeedback.destroy();

        // Destroy alternative formats iframe and handlers
        AlternativeFormats.destroy();

        // Destroy seizure guard elements, handlers and position monitors
        SeizureGuard.destroyAll();

        // Safely call all consumer-specified destroy handlers
        return this.runAllSafe(this.onDestroyHandlers)
            .then(() => this.onDestroyHandlers = [])
            .then(() => undefined);

    }

    public onDestroy(handler: () => Promise<void>): void {
        this.onDestroyHandlers.push(handler);
    }

    private runAllSafe(ps: Array<() => Promise<void>>): Promise<void> {
        const p = ps.shift();
        if (NullUtil.hasValue(p)) {
            try {
                return p()
                    .catch((err) => console.error(err))
                    .then(() => this.runAllSafe(ps));
            } catch (err) {
                console.error(err);
                return this.runAllSafe(ps);
            }
        } else {
            return Promise.resolve();
        }
    }

    private getFileReportMapIfNecessary(contentInstances: IContentInstances): Promise<IUploadReportMap> {
        const courseId = this.config.courseId;
        const fileReferences: IJsFileReferences = {};
        Object.keys(contentInstances).forEach((id) => {
            const contentInstance = contentInstances[id];
            const fileReference = contentInstance.getFileReference();
            if (NullUtil.hasValue(fileReference)) {
                fileReferences[id] = fileReference.data();
            }
        });
        if (this.isLmsOrWebContext() && NullUtil.hasValue(courseId)) {
            return this.client.getFileReports(courseId, fileReferences);
        } else if (this.isAaaContext()) {
            return this.client.getFileReports('irrelevant', fileReferences);
        } else {
            return Promise.resolve({});
        }
    }

    /** Whether the UI api is being used in an LMS or Web context */
    private isLmsOrWebContext(): boolean {
        return this.config.platformName !== 'AaaS';
    }

    /** Whether the UI api is being used in an Ally as a Service context */
    private isAaaContext(): boolean {
        return this.config.platformName === 'AaaS';
    }

    /** Activate the iframe listeners, only if there is any Ally functionality available. */
    private listenOnIframeIfNecessary(contentInstances: IContentInstances, reports: IUploadReportMap): void {
        if (this.isActive(contentInstances, reports)) {
            this.listenOnIframe();
        }
    }

    /** Determine if any Ally functionality will be available on this page. */
    private isActive(contentInstances: IContentInstances, reports: IUploadReportMap): boolean {
        const webpageContentInstances = CollectionUtil.values(contentInstances)
            .filter((ci) => ci.type === ContentInstanceType.webpage);
        if (webpageContentInstances.length === 0) {
            return (CollectionUtil.values(reports).length > 0);
        } else {
            return true;
        }
    }

    private listenOnIframe(): void {
        if (this.isListeningOnIframe) {
            return;
        }

        this.isListeningOnIframe = true;

        IframeMessagingUtil.listen('http', (data: any, id: any, ev: any) => {
            const ajaxSettings: JQuery.UrlAjaxSettings = {
                'crossDomain': true,
                'data': data.parameters,
                'type': data.method,
                'url': data.path,
                'xhrFields': {
                    'withCredentials': false
                }
            };
            if (data.opts && data.opts.contentType) {
                ajaxSettings.contentType = data.opts.contentType;
            }

            if (data.opts && data.opts.headers) {
                ajaxSettings.headers = data.opts.headers;
            }

            this.client.authenticateAndExec(ajaxSettings)
                .then((response) => IframeMessagingUtil.send(ev.source, 'http-response', {response}, id))
                .catch((err) => IframeMessagingUtil.send(ev.source, 'http-response', {err}, id));
        });

        IframeMessagingUtil.listen('sign', (data: any, id: any, ev: any) => {
            const ajaxSettings: JQuery.UrlAjaxSettings = {
                'data': data.parameters,
                'url': data.path
            };
            this.client.authenticate(ajaxSettings)
                .then((req) => {
                    // While jQuery expects a 'data' object on the request, we use 'parameters' as the object for
                    // purposes of this API. So make sure that is available
                    const response = req as any;
                    response.parameters = req.data;
                    IframeMessagingUtil.send(ev.source, 'sign-response', {response}, id);
                })
                .catch((err) => IframeMessagingUtil.send(ev.source, 'sign-response', {err}, id));
        });

        IframeMessagingUtil.listen('getDownloadUrl', (data: any, id: any, ev: any) => {
            this.getFileDownloadUrl(data.parameters.fileId)
                .then((response) => IframeMessagingUtil.send(ev.source, 'getDownloadUrl-response', {response}, id))
                .catch((err) => IframeMessagingUtil.send(ev.source, 'getDownloadUrl-response', {err}, id));
        });

        IframeMessagingUtil.listen('platformui', (data: any, id: any, ev: any) => {
            IframeMessagingUtil.send(ev.source, 'platformui-response', this.config.platformUi, id);
        });
    }

    /**
     * Convenience function to promisify the hyrbid promise-callback format for the download url function.
     */
    private getFileDownloadUrl(fileId: string): Promise<string> {
        return new Promise<string>((accept, reject) => {
            const callback = (err: any, url: string) => {
                if (err) {
                    reject(err);
                } else {
                    accept(url);
                }
            };

            if (this.config.instructorFeedback.getFileDownloadUrl) {
                const p =  this.config.instructorFeedback.getFileDownloadUrl(fileId, callback);
                if (p) {
                    // tslint:disable-next-line: no-floating-promises
                    p.then(accept);
                    p.catch(reject);
                }
            } else {
                reject({'code': 501, 'msg': 'File downloads are not supported'});
            }
        });
    }

    private initStyles() {
        Ui.addStylesheet(this.resourcePath(coreCssPath), 'ally-styles');
    }

    private doAutoUpdate(...fileIds: string[]): Promise<void[]> {
        fileIds.forEach((fileId) => this.client.clearFileIdFromCache(fileId));
        const fs = this.autoUpdates.map((update) => () => this.update(update.el));
        return this.seq(fs);
    }

    private seq<T>(fs: Array<() => Promise<T>>, ts: T[] = []): Promise<T[]> {
        const f = fs.shift();
        if (f) {
            return f().then((t) => this.seq(fs, ts.concat(t)));
        } else {
            return Promise.resolve(ts);
        }
    }

    private resourcePath(path: string): string {
        return `${this.client.config.baseUrl}/${path}`;
    }
}
