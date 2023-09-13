
import { IClient, IClientInfo, IUploadReportMap } from 'src/integration/api/client/client.model';
import * as CollectionUtil from 'src/shared/CollectionUtil';
import * as NullUtil from 'src/shared/NullUtil';
import { aaasContentReportToFileReport, IJsAaasContentBatchRequest, IJsAaasContentBatchResponse } from './AaasContentReport';
import { AuthCallback, ClientConfig } from './ClientConfig';
import { ClientError } from './ClientError';
import { IJsFileReference, IJsFileReferences } from './FileReference';
import { FileReport } from './FileReport';
import { RichContentReport } from './RichContentReport';
import { IUploadsResponse } from './UploadReport';

/**
 * The web client for talking to the Ally Rest APIs. This object abstracts the actual HTTP requests needed to access
 * accessibility metadata information, as well as **caching semantics** to ensure that accessibility metadata isn't
 * being fetched remotely unnecessarily.
 *
 * **IMPORTANT:** As mentioned, the [[Client]] instance caches accessibility metadata that it has already fetched once.
 * This means that if files change on the server, the cache of the client needs to be explicitly cleared by using either
 * [[clearFileIdFromCache]] or [[clearAllFromCache]] to realize the changes. If your application knows that a change has
 * been made, the following action can be performed to update the directive states:
 *
 * ```javascript
 * ui.client.clearFileIdFromCache(fileId);
 * ui.update();
 * ```
 */
export class Client implements IClient {

    /** The `jQuery` instance to use for HTTP requests */
    public jQuery: JQueryStatic;

    /** An internal cache used to avoid constantly refetching page items that likely never change */
    private cache: {[courseId: string]: IUploadReportMap};

    constructor(public readonly config: ClientConfig, private readonly platformName: string | null) {
        this.config = config;
        this.cache = {};
        this.jQuery = config.jQuery;
    }

    /**
     * Get the file reports for the specified file references.
     *
     * @param courseId  The id of the course for which to get the file reports
     * @param refsById  The file references keyed by an arbitrary id that will be used to provide a keyed response
     * @return          The file reports, keyed by the respective id provided by the `refsById`
     */
    public getFileReports(courseId: string, refsById: IJsFileReferences): Promise<IUploadReportMap> {
        const [hits, misses] = this.getCachedFileReports(courseId, refsById);
        if (Object.keys(misses).length === 0) {
            return Promise.resolve(hits);
        }

        return this.getFileReports0(courseId, misses).then((reports) => {
            // Populate the cache with the misses
            Object.keys(misses).forEach((id) => {
                const ref = misses[id];
                this.cache[courseId] = (courseId in this.cache) ? this.cache[courseId] : {};
                this.cache[courseId][this.getUploadReferenceCacheKey(ref)] = reports[id];
            });

            // Fetch from cache now and return the hits since we have them all cached
            return this.getCachedFileReports(courseId, refsById)[0];
        });
    }

    public generateAxeFeedback(axeResults: JSON): Promise<any> {
        const url = `/api/v1/${this.config.clientId}/content/generateFeedback/axe`;
        const ajaxSettings: JQuery.UrlAjaxSettings = {
            'contentType': 'application/json',
            'data': JSON.stringify(axeResults),
            'method': 'POST',
            url,
        };

        // Execute and authenticate the request, parsing as a file report map
        return this.authenticateAndExec(ajaxSettings);
    }

    public applyWysiwygFix(courseId: string, fileId: string, quickFix: any): Promise<string> {
        const encodedFileId = encodeURIComponent(fileId);
        const url = `/api/v1/${this.config.clientId}/content/course/${courseId}/applyFix/${encodedFileId}`;
        const ajaxSettings: JQuery.UrlAjaxSettings = {
            'contentType': 'application/json',
            'data': JSON.stringify(quickFix),
            'method': 'POST',
            url,
        };

        return this.authenticateAndExec(ajaxSettings);
    }

    public getClientInfo(courseId: string | null): Promise<IClientInfo> {
        if (NullUtil.hasValue(courseId)) {
            return this.authenticateAndExec({
                'data': {'courseId': encodeURIComponent(courseId)},
                'method': 'GET',
                'url': `/api/v1/${this.config.clientId}`,
            });
        } else {
            return this.authenticateAndExec({
                'method': 'GET',
                'url': `/api/v1/${this.config.clientId}`,
            });
        }
    }

    /**
     * Clear all cached file reports that are associated to the specified file id, across all potential courses this
     * client was used for.
     *
     * @param fileId    The id of the file whose cached reference reports to clear
     */
    public clearFileIdFromCache(fileId: string): void {
        Object.keys(this.cache).forEach((courseId) => {
            Object.keys(this.cache[courseId]).forEach((key) => {
                if (this.getExternalIdFromReferenceCacheKey(key) === fileId) {
                    delete this.cache[courseId][key];
                }
            });
        });
    }

    /**
     * Clear all cached file reports.
     */
    public clearAllFromCache(): void {
        this.cache = {};
    }

    /**
     * Authenticate the ajax settings and execute the request. Any request error will be coerced into a model of the
     * form [[IHttpError]] (i.e., `{code: xhr.status, msg: xhr.responseText}`).
     * @see [[authenticate]]
     */
    public authenticateAndExec(ajaxSettings: JQuery.UrlAjaxSettings): Promise<any> {
        return this.authenticate(ajaxSettings).then((authenticatedSettings) => {
            return new Promise<any>((accept, reject) => {
                authenticatedSettings.error = (xhr: any) => reject(new ClientError(xhr.status, xhr.responseText));
                authenticatedSettings.success = accept;
                this.jQuery.ajax(authenticatedSettings);
            });
        });
    }

    /**
     * Get an authenticated version of the given AJAX settings using the configured authentication strategy for the
     * client.
     *
     * @param ajaxSettings  The JQuery ajax settings to authenticate
     */
    public authenticate(ajaxSettings: JQuery.UrlAjaxSettings): Promise<JQuery.UrlAjaxSettings> {
        return Promise.resolve(this.extractAuthResourceEid(ajaxSettings))
            .then((eid) => this.auth(eid))
            .then((authStrategy) => {
                // Do a simple copy of the ajax settings base and headers keys to avoid mutating the input settings
                const ajaxSettingsCloned = {...ajaxSettings};
                if (ajaxSettings.headers) {
                    ajaxSettingsCloned.headers = {...ajaxSettings.headers};
                } else {
                    ajaxSettingsCloned.headers = {};
                }
                ajaxSettingsCloned.url = this.getFullUrlFromPath(ajaxSettings.url);

                // Bearer token authentication was chosen
                if (NullUtil.hasValue(authStrategy.bearer)) {
                    ajaxSettingsCloned.headers.Authorization = `Bearer ${authStrategy.bearer}`;
                }

                return ajaxSettingsCloned;
            });
    }

    /** Wrap the nuances of callback v.s. promise handling of the auth function into a convenient promise. */
    private auth(eid: string | null): Promise<{bearer?: string}> {
        return new Promise<{bearer?: string}>((accept, reject) => {
            // The callback function is provided to the invocation, but may not be used. If `p` ends up being set, then
            // we treat it like a promise. Otherwise this callback function should have been invoked.
            const callback: AuthCallback = (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    accept(NullUtil.orElse<{bearer?: string}>(data, {}));
                }
            };
            const p = this.config.auth(eid, callback);

            // When `p` is set, it must be a promise. Bind it to the accept/reject handlers
            if (p) {
                // tslint:disable-next-line: no-floating-promises
                p.then(accept);
                p.catch(reject);
            }
        });
    }

    /**
     * Get the file reports available in the cache for this course. The result is expressed as a tuple of hits (i.e.,
     * we had a report in the cache) and misses (i.e., we didn't have a report in the cache), respectively.
     */
    private getCachedFileReports(courseId: string, refsById: IJsFileReferences): [IUploadReportMap, IJsFileReferences] {
        const hits = {} as IUploadReportMap;
        const misses = {} as IJsFileReferences;

        Object.keys(refsById).forEach((id) => {
            const ref = refsById[id];
            const key = this.getUploadReferenceCacheKey(ref);
            if (courseId in this.cache && key in this.cache[courseId]) {
                hits[id] = this.cache[courseId][key];
            } else {
                misses[id] = ref;
            }
        });

        return [hits, misses];
    }

    private getFileReports0(
        courseId: string,
        refsById: IJsFileReferences
    ): Promise<IUploadReportMap> {
        if (this.platformName === 'AaaS') {
            return this.getAaasFileReports0(refsById);
        } else {
            return this.getLmsFileReports0(courseId, refsById);
        }
    }

    /** Get the file reports from the server. Each call to this function will remotely call to the Ally server. */
    private getLmsFileReports0(
        courseId: string,
        refsById: IJsFileReferences
    ): Promise<IUploadReportMap> {
        const [ids, refs] = CollectionUtil.unzipObject(refsById);
        let url = [
            '/api/v1',
            this.config.clientId,
            'reports/courses',
            encodeURIComponent(courseId),
            'content'
        ].join('/');
        if (NullUtil.hasValue(this.config.forceInstructorFeedbackEnabled)) {
            url += `?forceInstructorFeedbackEnabled=${this.config.forceInstructorFeedbackEnabled}`;
        }

        const ajaxSettings: JQuery.UrlAjaxSettings = {
            'contentType': 'application/json',
            'data': JSON.stringify(refs),
            'method': 'POST',
            'url': url
        };

        // Execute and authenticate the request, parsing as a file report map
        return this.authenticateAndExec(ajaxSettings).then((data: IUploadsResponse) => {
            const reports = data.uploadsReport.map((uploadReport) => {
                if (!NullUtil.hasValue(uploadReport)) {
                    return null;
                } else if (uploadReport.uploadType === 'RichContent') {
                    return RichContentReport.fromResponseItem(uploadReport);
                } else {
                    return FileReport.fromResponseItem(uploadReport);
                }
            });
            return CollectionUtil.zipObject(ids, reports);
        });
    }

    /** Get the AaaS file reports from the server. Each call to this function will remotely call to the Ally server. */
    private getAaasFileReports0(refsById: IJsFileReferences): Promise<IUploadReportMap> {
        const [ids, refs] = CollectionUtil.unzipObject(refsById);
        const batchParams: IJsAaasContentBatchRequest = {
            'references': refs.map((r) => ({'hash': r.id}))
        };
        const url = [
            '/api/v2/clients',
            this.config.clientId,
            'content/batch?formats=true'
        ].join('/');
        const ajaxSettings: JQuery.UrlAjaxSettings = {
            'contentType': 'application/json',
            'data': JSON.stringify(batchParams),
            'method': 'POST',
            'url': url
        };

        // Execute and authenticate the request, parsing as a file report map
        return this.authenticateAndExec(ajaxSettings).then((data: IJsAaasContentBatchResponse) => {
            const reports = data.reports.map((jsReport) => {
                if (NullUtil.hasValue(jsReport)) {
                    return aaasContentReportToFileReport(jsReport);
                } else {
                    return null;
                }
            });
            return CollectionUtil.zipObject(ids, reports);
        });
    }

    /**
     * Extract a potential single resource that is involved in this request that will require explicit access
     * authorization. This allows for when, for example, a student is requesting to download an alternative format and
     * we need the platform to certify that they have access to read the resource.
     */
    private extractAuthResourceEid(ajaxSettings: JQuery.UrlAjaxSettings): string | null {
        // Resource pattern regexes that will extract an eid as a single grouping. Only endpoints that will require
        // explicit file authorization should be added here
        const resourcePatterns = [
            // Explicit file authorization for alternative formats
            /^\/api\/v1\/[\d]+\/formats\/[^\/]+\/([^\/]+)\/[^\/]+$/,
            /^\/api\/v2\/clients\/[\d]+\/courses\/[\d]+\/files\/([^\/]+)\/report$/,
            /^\/api\/v2\/clients\/[\d]+\/courses\/[\d]+\/rich-content\/([^\/]+)\/report$/,
            /^\/api\/v2\/clients\/[\d]+\/content\/((?!batch).*)[\?|$]/
        ];
        const path = ajaxSettings.url;
        for (const regex of resourcePatterns) {
            const exec = regex.exec(path);
            if (exec) {
                return exec[1];
            }
        }

        // TODO: It's hacky to have this here just to support formats for Ally as a Service.
        const isContentConvertRequest = /\/api\/v1\/[\d]+\/content\/convert/.test(path);
        if (isContentConvertRequest) {
            return this.getAaasContentHashFromContentConvertDownload(ajaxSettings.data);
        }

        return null;
    }

    private getFullUrlFromPath(path: string): string {
        return `${this.config.baseUrl}${path}`;
    }

    /** Get the AaaS content download hash out of the XHR data settings if it exists */
    private getAaasContentHashFromContentConvertDownload(data: any): string | null {
        if (typeof data === 'string') {
            try {
                return JSON.parse(data).download.contentHash;
            } catch {
                return null;
            }
        }
        return null;
    }

    /**
     * Convert a file reference into a consistent cache key whose value will act as an identity to the relevant
     * information we use for accessibility checks in the item. This means that if something changes that can result
     * in a new accessibility score (e.g., change in alt text of the file reference), then it should result in a new
     * cache key.
     */
    private getUploadReferenceCacheKey(ref: IJsFileReference): string {
        const parts: Array<string | undefined> = [ref.uploadType, ref.id];
        if (ref.uploadType === 'File' && NullUtil.hasValue(ref.embed)) {
            parts.push(ref.embed.altText);
        }
        return JSON.stringify(parts);
    }

    /** Extract just the external id portion out of a key that was created from [[getUploadReferenceCacheKey]]. */
    private getExternalIdFromReferenceCacheKey(cacheKey: string): string {
        return JSON.parse(cacheKey)[1];
    }
}
