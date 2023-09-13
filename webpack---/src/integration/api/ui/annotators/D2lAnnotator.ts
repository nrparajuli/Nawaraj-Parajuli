
import * as $ from 'jquery';

import {JsUiFactory, Ui} from 'src/integration/api/ui/Ui';
import * as DomUtil from 'src/shared/DomUtil';

import {IClientInfo} from 'src/integration/api/client/client.model';
import {UiConfig} from '../UiConfig';
import { UiWysiwygFeedbackController } from '../wysiwyg/UiWysiwygFeedbackController';
import {D2lAnnotatorError} from './d2l/D2lAnnotatorError';
import {D2lConfig, D2lPageType, IJsPageConfig} from './d2l/D2lConfig';
import {D2lContentItem} from './d2l/D2lContentItem';
import { D2lTinyMceEditorListener } from './d2l/wysiwyg/D2lTinyMceEditorListener';

const coreCssPath = require('src/integration/d2l/d2l.css');

export class D2lAnnotator {

    public static async annotate(
        $root: JQuery<HTMLElement>,
        locationHref: string,
        $allyLoaderEl: JQuery<HTMLElement>,
        clientInfoSupplier: (ui: Ui) => Promise<IClientInfo>
    ): Promise<Ui | D2lAnnotatorError> {
        const location = DomUtil.parseHref(locationHref);
        const pageConfig = (window as any).allyConfig as IJsPageConfig | undefined;
        const config = D2lConfig.fromPage(location, $allyLoaderEl, pageConfig);

        if (typeof config !== 'number') {
            D2lAnnotator.addCss(config);

            // Create the UI instance
            const ui = D2lAnnotator.getUi(config, $root[0], $allyLoaderEl);
            const uiOptions = {
                'domWatch': 500,

                // Some elements need shuffling around depending on the page we're on.
                'preHook': () => D2lAnnotator.annotatePage(config, $root, ui)
            };

            // Whether the user is on the D2L new lessons experience or not
            const isNewLessonsExperience = config.pageType === D2lPageType.NewContentExperienceView;

            // Initialize Wysiwyg feedback functionality
            const clientInfo = await clientInfoSupplier(ui);
            if (clientInfo.flags.ifLaunchFromWysiwyg) {
                const tinyMceEditorListener = new D2lTinyMceEditorListener(
                    config.baseUrl,
                    ui.i18n,
                    window as any,
                    !clientInfo.flags.nativeWysiwygAxEnabled,
                    {
                        'checkIntervalMs': 250
                    },
                    isNewLessonsExperience
                );

                const wysiwygFeedbackController = new UiWysiwygFeedbackController(
                    config.baseUrl,
                    ui,
                    tinyMceEditorListener
                );
                wysiwygFeedbackController.start();
            }

            if (isNewLessonsExperience) {
                this.tweakNewLessonsExperience();
            }

            return ui.autoUpdate(uiOptions).then(() => ui);
        } else {
            return Promise.resolve(config);
        }
    }

    public static getUi(config: D2lConfig, root?: HTMLElement, $allyLoaderEl?: JQuery<HTMLElement>): Ui {
        let $mock;
        if ($allyLoaderEl !== undefined && $allyLoaderEl.attr('data-ally-mock') !== undefined) {
            const mockAttr = $allyLoaderEl.attr('data-ally-mock');
            if (mockAttr !== undefined) {
                $mock = (window as any)[mockAttr];
            }
        }
        const client = {
            'auth': () => Promise.resolve({'bearer': config.jwtToken}),
            'baseUrl': config.baseUrl,
            'clientId': config.clientId,
            'jQuery': $mock
        };

        // If the instructor deletes a file through the IF, we should reload the page as the D2L dom is not going to be
        // in an accurate state any longer.
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
            'fixHtmlIssue': async () => {
                reloadPage = true;
            },
            'replacedFile': () => reloadPage = true
        };

        return JsUiFactory({
            client,
            'contentRoot': root,
            'courseId': config.courseId.toString(),
            'instructorfeedback': {
                'callbacks': instructorfeedbackCallbacks,
                'customIconSet': {
                    'high': require('src/integration/d2l/img/ally-icon-indicator-high.svg'),
                    'low': require('src/integration/d2l/img/ally-icon-indicator-low.svg'),
                    'medium': require('src/integration/d2l/img/ally-icon-indicator-medium.svg'),
                    'perfect': require('src/integration/d2l/img/ally-icon-indicator-perfect.svg')
                },
                'getFileDownloadUrl': (fileId: string, callback: (err: any, url: string) => void) => {
                    const loc = window.location;
                    const host = `${loc.protocol}//${loc.host}`;
                    const url = `${host}/d2l/api/le/1.12/${config.courseId}/content/topics/${fileId}/file?stream=true`;
                    return callback(null, url);
                }
            },
            'platformName': 'd2l',
            'role': 'anonymous'
        });
    }

    /** This is necessary to load some of the API UI assets at least once */
    private static hasRanAtLeastOneApiUpdateCycle = false;

    /**
     * D2L updates the padding of the save/cancel button bar on resize events directly. Ensure that its kept in-sync
     * with the WYSIWYG scoring. Note that we can't set a padding-right ourselves, as D2L erases custom attributes on
     * resize. Hence why a custom CSS variable is set and a CSS rule is applied from our custom CSS.
     */
    private static tweakNewLessonsExperience(): void {
        const $editButtons = $('.edit-buttons');
        if ($editButtons.length > 0) {
            const paddingLeft = $editButtons.css('padding-left');
            $('.edit-buttons').css('--ally-edit-buttons-padding', paddingLeft);
        }

        setTimeout(() => this.tweakNewLessonsExperience(), 500);
    }

    /**
     * Annotates the current page
     *
     * @param page The page that's currently displayed
     * @param config The ally configuration holding basic information
     * @return Returns `true` if any updates were made to the page DOM, `false` otherwise
     */
    private static annotatePage(config: D2lConfig, $root: JQuery<HTMLElement>, ui: Ui): boolean {
        let hasChange = false;
        D2lContentItem.fromPage(config, $root).forEach((item) => {
            const changed = item.annotate(config, ui);
            hasChange = hasChange || changed;
        });
        if (!this.hasRanAtLeastOneApiUpdateCycle) {
            hasChange = true;
            this.hasRanAtLeastOneApiUpdateCycle = true;
        }
        return hasChange;
    }

    /** Load up the D2l css */
    private static addCss(config: D2lConfig): void {
        Ui.addStylesheet(`${config.baseUrl}/${coreCssPath}`, 'ally-d2l-styles');
    }
}
