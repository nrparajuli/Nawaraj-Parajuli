import * as $ from 'jquery';

import {JsUiFactory, Ui} from 'src/integration/api/ui/Ui';
import * as DomUtil from 'src/shared/DomUtil';
import * as NullUtil from 'src/shared/NullUtil';
import { AuthCallback, IClientConfigObj } from '../../client/ClientConfig';
import { Clientable } from '../../client/ClientFactory';

import {UiConfig} from '../UiConfig';
import { IAnnotationOptions } from './schoology/annotators/IAnnotationOptions';
import { annotateFileProfile } from './schoology/annotators/SchoologyFileProfile';
import { annotateListOfMaterials } from './schoology/annotators/SchoologyListOfMaterials';
import { annotateResourcePage } from './schoology/annotators/SchoologyUtil';
import {SchoologyAnnotatorError} from './schoology/SchoologyAnnotatorError';
import {IJsPageConfig, SchoologyConfig, SchoologyPageType} from './schoology/SchoologyConfig';

const coreCssPath = require('src/integration/schoology/schoology.css');
export class SchoologyAnnotator {

    public static annotate(
        $root: JQuery<HTMLElement>,
        locationHref: string,
        $allyLoaderEl: JQuery<HTMLElement>
    ): Promise<Ui | SchoologyAnnotatorError> {
        const location = DomUtil.parseHref(locationHref);
        const pageConfig = (window as any).allyConfig as IJsPageConfig | undefined;
        const config = SchoologyConfig.fromPage(location, $allyLoaderEl, pageConfig);
        if (typeof config !== 'number') {
            SchoologyAnnotator.addCss(config);

            // Create the UI instance
            const ui = SchoologyAnnotator.getUi(config, $root[0], $allyLoaderEl, location);
            const uiOptions = {
                'domWatch': 500,

                // Some elements need shuffling around depending on the page we're on.
                'preHook': () => SchoologyAnnotator.annotateCurrentPage(config, $root, ui, locationHref)
            };
            return ui.autoUpdate(uiOptions).then(() => ui);
        } else {
            return Promise.resolve(config);
        }
    }

    public static getUi(
        config: SchoologyConfig,
        root: HTMLElement,
        $allyLoaderEl: JQuery<HTMLElement>,
        location: HTMLHyperlinkElementUtils
        ): Ui {
        let $mock = $;
        if ($allyLoaderEl !== undefined && $allyLoaderEl.attr('data-ally-mock') !== undefined) {
            const mockAttr = $allyLoaderEl.attr('data-ally-mock');
            if (mockAttr !== undefined) {
                $mock = (window as any)[mockAttr];
            }
        }
        const client: IClientConfigObj = {
            'auth': (eid: string | null, callback: AuthCallback) => {
                // No specific resources are being requested. Just return the default JWT token
                if (!NullUtil.hasValue(eid)) {
                    return callback(null, {'bearer': config.jwtToken});
                }

                // An explicit resource is being requested. Get a JWT token from the Schoology REST API that proves the
                // user in context has access to it. This is necessary to support AF requests.
                const decodedExternalId = decodeURIComponent(eid);
                let [resourceType, resourceId] = decodedExternalId.split(':');
                if (!NullUtil.hasValue(resourceId)) {
                    resourceId = resourceType;
                    resourceType = 'document';
                }
                this.getJwtToken(
                    client,
                    config,
                    resourceType,
                    resourceId,
                    (err: Error | null, token: string | undefined) => {
                        if (NullUtil.hasValue(err)) {
                            return callback(err);
                        }

                        // Depending on how many files are attached to the resource, the JWT token can be absolutely
                        // massive. Exchange it with Ally for a slimmer one. This is necessary as this token goes into
                        // the Authorization header which has (by default) an 8kb cap.
                        $mock.ajax({
                            'data': {
                                'token': token
                            },
                            'error': () => callback(new Error('Unable to exchange JWT token')),
                            'headers': {
                                'Authorization': `Bearer ${config.jwtToken}`
                            },
                            'method': 'POST',
                            'success': (allyData: any) => callback(null, {'bearer': allyData.token}),
                            'url': `${config.baseUrl}/api/v1/${config.clientId}/lms/schoology/token/exchange`
                        });
                    }
                );
            },
            'baseUrl': config.baseUrl,
            'clientId': config.clientId,
            'jQuery': $mock
        };

        // If the instructor deletes a file through the IF, we should reload the page as the Schoology dom is not going
        // to be in an accurate state any longer.
        let reloadPage = false;
        /* istanbul ignore next */
        const instructorfeedbackCallbacks = {
            ...UiConfig.resolveInstructorFeedbackCallbacks(),
            'closed': () => {
                if (reloadPage) {
                    window.location.reload();
                }
            },
            'deleted': () => reloadPage = true,
            'replacedFile': () => reloadPage = true
        };

        return JsUiFactory({
            client,
            'contentRoot': root,
            'courseId': config.courseId.toString(),
            'instructorfeedback': {
                'callbacks': instructorfeedbackCallbacks,
                'getFileDownloadUrl': (fileId: string, callback: (err: any, url: string) => void) => {
                    $mock.ajax({
                        'error': () => callback({'code': 500, 'msg': 'Failed to retrieve download path'}, ''),
                        'success': (data: any) => {
                            const apiUrl = data.attachments.files.file[0].download_path;
                            const schoologyUrl = apiUrl.split('/').slice(3).join('/');
                            return callback(null, `${location.protocol}//${location.hostname}/${schoologyUrl}`);
                        },
                        'type': 'GET',
                        'url': `/v1/sections/${config.courseId}/documents/${fileId}`
                    });
                }
            },
            'platformName': 'schoology',
            'role': 'anonymous'
        });
    }

    /**
     * Annotates the current page
     *
     * @param config The ally configuration holding basic information
     * @param $root the HTML element (jquery wrapped) that's being annotated
     * @param ui the Ally [[Ui]] instance
     * @param locationHref the location of the current page (i.e. window.location.href)
     * @return Returns `true` if any updates were made to the page DOM, `false` otherwise
     */
    private static annotateCurrentPage(
        config: SchoologyConfig,
        $root: JQuery<HTMLElement>,
        ui: Ui,
        locationHref: string
    ): boolean {
        const annotationOptions: IAnnotationOptions = {
            'baseUrl': config.baseUrl,
            'i18n': ui.i18n,
            'locationHref': locationHref
        };
        switch (config.pageInfo.pageType) {
            case SchoologyPageType.ListOfMaterials:
                return annotateListOfMaterials($root, annotationOptions);
            case SchoologyPageType.FileProfile:
                return annotateFileProfile($root, annotationOptions);
            case SchoologyPageType.Page:
            case SchoologyPageType.Discussion:
            case SchoologyPageType.Assignment:
                return annotateResourcePage(
                    config.pageInfo.richContentType!,
                    config.pageInfo.resourceId,
                    $root,
                    annotationOptions
                );
        }
    }

    private static getJwtToken(
        client: Clientable,
        config: SchoologyConfig,
        resourceType: string,
        resourceId: string,
        callback: (err: Error | null, token?: string) => void
    ) {
        client.jQuery!.ajax({
            'error': () => callback(new Error('Unable to retrieve JWT token')),
            'headers': {
                'Accept': 'application/json'
            },
            'method': 'GET',
            'success': (data: any) => callback(null, data.jwt),
            'url': `/v1/sections/${config.courseId}/${resourceType}s/${resourceId}?with_jwt=1&with_attachments=true`,
        });
    }

    /** Load up the Schoology css */
    private static addCss(config: SchoologyConfig): void {
        Ui.addStylesheet(`${config.baseUrl}/${coreCssPath}`, 'ally-schoology-styles');
    }
}
