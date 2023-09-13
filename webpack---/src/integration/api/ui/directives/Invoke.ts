
import * as $ from 'jquery';

import {PartialFalsey} from 'src/integration/api/PartialFalsey';
import {isUltraUi, renderPolicyFilter} from 'src/integration/api/ui/annotators/learn-ultra/LearnUltraUtil';
import * as DomUtil from 'src/shared/DomUtil';
import {FileType} from 'src/shared/file-type.model';
import * as NullUtil from 'src/shared/NullUtil';
import {RuleName} from 'src/shared/rule-name.model';
import * as TooltipUtil from 'src/shared/tscomponents/tooltip/TooltipUtil';
import {IUploadReportMap} from '../../client/client.model';
import {IFileReference} from '../../client/FileReference';
import {FileReport} from '../../client/FileReport';
import {
    AlternativeFormats,
    IAaasContentInfo,
    IBasicAssociatedFileReference,
    IDirectFileOnWebPageInfo,
    ILaunchCallbacks as IAlternativeFormatsLaunchCallbacks
} from '../AlternativeFormats';
import {ContentInstance, ContentInstanceType, IContentInstances} from '../ContentInstance';
import {ILaunchCallbacks, InstructorFeedback, Target} from '../InstructorFeedback';
import {Ui} from '../Ui';
import {UiComponent} from '../UiComponent';
import {IAlternativeFormatsConfig} from '../UiConfig';
import {UiDirective} from '../UiDirective';
import {Webpage} from '../Webpage';
import {WebpageLink} from '../WebpageLink';

const {updateCarFeedback} = require('src/integration/instructorFeedbackUtil');

/**
 * A directive that conditionally binds a click handler based on the state of ally data associated to the content item
 * it references. This directive should generally be used in unison with the [[Show]] directive that would conditionally
 * show or hide a parent of the element if instructor feedback is available. If this directive is used without [[Show]],
 * and instructor feedback is not available, then there will be a dead link.
 *
 * # Attributes:
 *
 *  * `data-ally-invoke`: Indicates that a click handler should be bound to the element conditionally based on
 *     whether or not the functionality associated to the handler type is available
 *  * `data-ally-invoke-prop-target`: An instructor feedback only attribute that indicates whether to launch on top of
 *     the current page in an iframe or in a new window
 *  * `data-ally-invoke-prop-window-title`: An instructor feedback only attribute that sets the title of the new window
 *     in case the invoke target is a new window. When left blank this will read `Instructor feedback for yourfile`.
 *  * `data-ally-invoke-prop-issue`: An instructor feedback only attribute that indicates the issue that should be shown
 *     when invoking the instructor feedback. When left blank, the issue with the biggest impact on the content item's
 *     score will be shown. See [[RuleName]] for all available options.
 * * `invoke-direct-file`: An alternative formats only attribute that indicates the alternative formats should be
 *     launched for the linked file. This is only applicable to Ally for Web clients and on `a` elements. The link is
 *     identified through the `href` attribute.
 *
 * # data-ally-invoke
 *
 *  The acceptable values are:
 *
 *  - `instructorfeedback`      -   The instructor feedback modal will be launched for the content when clicked
 *  - `alternativeformats`      -   The alternative formats modal will be launched for the content when clicked
 *
 * # data-ally-invoke-prop-target
 *
 * An optional attribute that defaults to [[Target.Iframe]] if no value is provided. See [[Target]] for all options
 *
 * # data-ally-invoke-prop-window-title
 *
 * When launching from a new window, indicates what the title of the window should be.
 *
 * # Examples
 *
 * Open instructor feedback for an embedded image when the link is clicked:
 * ```
 *  <img src="" data-ally-content-id="1" data-ally-file-eid="file3" />
 *  <a data-ally-content-ref="1" data-ally-invoke="instructorfeedback">Open instructor feedback</a>
 * ```
 *
 * Open alternative formats for a link to a file when the link is clicked:
 * ```
 *  <a href="myfile.pdf" data-ally-content-id="2" data-ally-file-eid="file4" />
 *  <a data-ally-content-ref="2" data-ally-invoke="alternativeformats">Open alternative formats</a>
 * ```
 *
 * Open instructor feedback for an embedded image in a new window when the link is clicked:
 * ```
 *  <img src="" data-ally-content-id="1" data-ally-file-eid="file3" />
 *  <a data-ally-content-ref="1" data-ally-invoke="instructorfeedback" data-ally-invoke-prop-target="window"
 *     data-ally-invoke-prop-window-title="My course - example.pdf">
 *      Open instructor feedback
 *  </a>
 * ```
 */
class Invoke extends UiDirective {

    public isApplicable(ui: Ui, component: UiComponent, contentInstances: IContentInstances,
        reports: IUploadReportMap): boolean {
        return component.hasDataAllyAttr('invoke');
    }

    public run(ui: Ui, component: UiComponent, contentInstances: IContentInstances, reports: IUploadReportMap): void {
        const contentInstance = contentInstances[component.getContentInstanceId()];
        const contentId = contentInstance.getId();
        const report = reports[contentId];
        const invokeValue = component.getDataAllyAttrValue('invoke');
        if (invokeValue === 'instructorfeedback') {
            const courseId = ui.config.courseId;
            const platformName = ui.config.platformName;
            if (courseId === null) {
                throw new Error(
                    'Cannot attach file instructor feedback without specifying a course id in ally.ui config'
                );
            }

            // If the invoke is based on instructorfeedback, we only bind a click handler if a score is available
            // for the file. This encompasses both access and relevance checks
            if (report && typeof report.score === 'number') {
                // The instructor feedback can be invoked for a specific issue
                const invokeIssue = this.resolveIssue(component);
                const invokeTarget = this.resolveTarget(component);
                const invokeWindowTitle = this.resolveWindowTitle(ui, component, report);

                const fileReference = NullUtil.assertValue(contentInstance.getFileReference());
                this.bindClickIfNecessary(component.$el, 'ally-instructorfeedback', (ev) => {
                    const parentRichContent = ContentInstance.findContainingRichContent(contentInstance);
                    const opts = {
                        'filePreviewUrl': contentInstance.getFilePreviewUrl(),
                        'issue': invokeIssue,
                        'locale': ui.config.locale,
                        'locator': contentInstance.getRichContentLocator(ui),
                        'richContentId': (parentRichContent) ? parentRichContent.getRichContentEid() : null,
                        'target': invokeTarget,
                        'windowLauncher': ui.config.instructorFeedback.windowLauncher,
                        'windowTitle': invokeWindowTitle
                    };
                    const callerCallbacks: PartialFalsey<ILaunchCallbacks> = {
                        // When we return from instructor feedback, we should focus the element that launched it by
                        // default. Sometimes that element may not be available on the DOM anymore due to a collapsing
                        // menu. In this case, the consumer should provide their own more advanced functionality in the
                        // user callbacks to manage this
                        'closed': () => component.$el.focus(),
                        'fixHtmlIssue': async (ruleName, locators, fixOptions) => {
                            const isD2lHtmlFile = contentInstance.type === ContentInstanceType.file &&
                                platformName === 'd2l' &&
                                report.mimeType === FileType.ApplicationXHtmlFragment;

                            if (contentInstance.type === ContentInstanceType.richContent || isD2lHtmlFile) {
                                updateCarFeedback(
                                    await ui.client.applyWysiwygFix(courseId, fileReference.id(), {
                                        'fixOptions': fixOptions,
                                        'locators': locators,
                                        'rulename': ruleName
                                    }),
                                    isD2lHtmlFile
                                );
                            }
                        }
                    };

                    if (invokeTarget === Target.Window) {
                        // This is necessary as tooltips are bound to an element in the current window. When launching
                        // into a new window, that element becomes inactive in some browsers. Inactive elements don't
                        // emit events such as focusout. When that happens, the jQuery Tooltip has no way of knowing
                        // when to fade out the tooltips. When the IF is launched in a new window, all tooltips can be
                        // cleared from the DOM
                        TooltipUtil.clearAllTooltips();
                    }

                    InstructorFeedback.launch(
                        ui,
                        courseId,
                        fileReference as IFileReference,
                        opts,
                        callerCallbacks
                    );
                    return false;
                });
            } else {
                // If the invoke is based on instructorfeedback and it should not have a handler, we unbind any
                // potential click handler we had bound earlier
                component.$el.unbind('click.ally-instructorfeedback');
            }
        } else if (invokeValue === 'alternativeformats' && (
            contentInstance.type === ContentInstanceType.file ||
            contentInstance.type === ContentInstanceType.richContent
        )) {
            const courseId = ui.config.courseId;
            if (courseId === null) {
                throw new Error(
                    'Cannot attach file alternative formats without specifying a course id in ally.ui config'
                );
            }

            if (report && report.availableAlternativeFormats && report.availableAlternativeFormats.length > 0) {
                // If the invoke is based on alternativeformats, and there are alternative formats available for this
                // file, we bind a click handler. This encompasses both access and relevance checks
                this.bindClickIfNecessary(component.$el, 'ally-alternativeformats', () => {
                    let associatedFiles: IBasicAssociatedFileReference[] = [];
                    if (contentInstance.type === ContentInstanceType.richContent) {
                        associatedFiles = this.getAssociatedFiles(
                            contentInstance, isUltraUi(ui) ? renderPolicyFilter : () => true
                        );
                    }
                    const opts = {
                        'associatedFiles': associatedFiles,
                        'closeWhenFormatReady': this.getCloseWhenFormatReady(ui.config.alternativeFormats),
                        'locale': ui.config.locale,
                        'renderAudioOnMobileInline': this.getRenderAudioOnMobileInline(ui.config.alternativeFormats)
                    };
                    const callerCallbacks = this.getDefaultCallerCallbacks(component);
                    AlternativeFormats.launchFile(ui, courseId, contentId, report, opts, callerCallbacks);
                    return false;
                });
            } else {
                // If the invoke is based on alternativeformats and it should not have a handler, we unbind any
                // potential click handler we had bound earlier
                component.$el.unbind('click.ally-alternativeformats');
            }
        } else if (invokeValue === 'alternativeformats' && contentInstance.type === ContentInstanceType.aaasContent) {
            if (report && report.availableAlternativeFormats && report.availableAlternativeFormats.length > 0) {
                const url = contentInstance.getAaasDownloadUrl();
                if (!NullUtil.hasValue(url))  {
                    throw new Error('Cannot attach file alternative formats without specifying a download url');
                }

                // If the invoke is based on alternativeformats, and there are alternative formats available for this
                // file, we bind a click handler. This encompasses both access and relevance checks
                this.bindClickIfNecessary(component.$el, 'ally-alternativeformats', () => {
                    const opts = {
                        'closeWhenFormatReady': this.getCloseWhenFormatReady(ui.config.alternativeFormats),
                        'locale': ui.config.locale,
                        'renderAudioOnMobileInline': this.getRenderAudioOnMobileInline(ui.config.alternativeFormats)
                    };
                    const contentInfo: IAaasContentInfo = {
                        'contentHash': report.id,
                        'url': url
                    };
                    const callerCallbacks = this.getDefaultCallerCallbacks(component);
                    AlternativeFormats.launchAaasContent(ui, contentId, opts, contentInfo, callerCallbacks);
                    return false;
                });
            } else {
                // If the invoke is based on alternativeformats and it should not have a handler, we unbind any
                // potential click handler we had bound earlier
                component.$el.unbind('click.ally-alternativeformats');
            }
        } else if (invokeValue === 'alternativeformats' && contentInstance.type === ContentInstanceType.webpage) {
            this.bindClickIfNecessary(component.$el, 'ally-alternativeformats', () => {
                const webpage = Webpage.fromMain(contentInstance.$el);
                const opts = {
                    'closeWhenFormatReady': this.getCloseWhenFormatReady(ui.config.alternativeFormats),
                    'locale': ui.config.locale,
                    'renderAudioOnMobileInline':  this.getRenderAudioOnMobileInline(ui.config.alternativeFormats)
                };
                const callerCallbacks = this.getDefaultCallerCallbacks(component);

                // TODO: Remove the direct-file logic as it's only used by the file transfomer which can be moved to
                // the AaaS
                const directFile = component.getDataAllyAttrValue('invoke-direct-file');
                const webpageLink = WebpageLink.fromEl(component.$el);
                if (NullUtil.hasValue(directFile) && NullUtil.hasValue(webpageLink)) {
                    const fileName = this.resolveFilenameFromUrl(webpageLink.href);
                    const [mimeType, fileType] = this.resolveMimeAndFileType(fileName);
                    const link: IDirectFileOnWebPageInfo = {
                        'fileType': fileType,
                        'href': webpageLink.href,
                        'id': 'semi-random-link',
                        'mimeType': mimeType,
                        'text': NullUtil.hasValue(webpageLink.text) ? webpageLink.text : webpageLink.href,
                        'url': webpageLink.href
                    };
                    AlternativeFormats.launchDirectFileOnWebpage(ui, contentId, webpage, opts, link, callerCallbacks);
                } else {
                    AlternativeFormats.launchWebpage(ui, contentId, webpage, opts, callerCallbacks);
                }
                return false;
            });
        }
    }

    /** Get the associated files for a given content instance. This will pull out any linked files */
    private getAssociatedFiles(
        contentInstance: ContentInstance,
        fileFilter: (ci: ContentInstance) => boolean
    ): IBasicAssociatedFileReference[] {
        const contentInstances = ContentInstance.fromRoot(contentInstance.$el);
        return Object.values(contentInstances)
            .filter((ci) => ci.type === ContentInstanceType.file)
            .filter(fileFilter)
            .map((ci) => {
                const externalId = ci.getFileEid();
                if (NullUtil.hasValue(externalId)) {
                    let title: string | null = ci.$el.text().trim();
                    if (!NullUtil.hasValue(title) || title === '') {
                        title = null;
                    } else if (NullUtil.hasValue(title) && title.indexOf('http') === 0) {
                        title = this.resolveFilenameFromUrl(title);
                    }
                    return {
                        externalId,
                        title
                    };
                }
            })
            .filter(NullUtil.hasValue);
    }

    /**
     * Resolve whether a specific issue should be displayed
     */
    private resolveIssue(component: UiComponent): RuleName | null {
        const invokePropIssueAttr = component.getDataAllyAttrValue('invoke-prop-issue');
        if (invokePropIssueAttr !== null && invokePropIssueAttr !== '') {
            return (invokePropIssueAttr as RuleName);
        } else {
            return null;
        }
    }

    /**
     * Resolve whether the instructor feedback should be opened in the current window or in a new window
     */
    private resolveTarget(component: UiComponent): Target {
        const invokeTargetAttr = component.getDataAllyAttrValue('invoke-prop-target');
        if (invokeTargetAttr === 'window') {
            return Target.Window;
        } else {
            return Target.Iframe;
        }
    }

    /**
     * Resolve a suitable title for the new window.
     */
    private resolveWindowTitle(ui: Ui, component: UiComponent, report: FileReport | null): string {
        const titleAttr = component.getDataAllyAttrValue('invoke-prop-window-title');
        if (titleAttr !== null && titleAttr !== '') {
            return titleAttr;
        } else {
            if (report && report.name !== undefined) {
                return ui.i18n.INSTRUCTOR_FEEDBACK_FOR.replace('{0}', report.name);
            } else {
                return ui.i18n.INSTRUCTOR_FEEDBACK;
            }
        }
    }

    /**
     * Takes care of binding a click handler to open instructor feedback, only if an existing click handler isn't
     * already bound. A namespace is provided that allows us to identify this handler later to be unbound.
     *
     * @param $el       The jQuery element to bind the handler to
     * @param namespace The unique namespace to bind that won't conflict with other potential applications
     * @param handler   The handler to invoke when the element is clicked
     */
    private bindClickIfNecessary(
        $el: JQuery<HTMLElement>,
        namespace: string,
        handler: JQuery.EventHandler<any>
    ): void {
        const existingHandlers = ($ as any)._data($el[0], 'events') as {click: any[]} | null;
        const [existingHandler = null] = (existingHandlers) ?
            existingHandlers.click.filter((h) => h.namespace === namespace) : [];
        if (!existingHandler) {
            $el.bind<string>(`click.${namespace}`, handler);
        }
    }

    /** Whether the audio format should be rendered in the alternative formats app */
    private getRenderAudioOnMobileInline(alternativeFormats: IAlternativeFormatsConfig): boolean | undefined {
        // Once we're on typescript 3.7+, this can use optional chaining
        if (NullUtil.hasValue(alternativeFormats.formats)) {
            return alternativeFormats.formats.renderAudioOnMobileInline;
        } else {
            return undefined;
        }
    }

    /** Whether to close the AF modal when a format is ready */
    private getCloseWhenFormatReady(alternativeFormats: IAlternativeFormatsConfig): boolean | undefined {
        // Once we're on typescript 3.7+, this can use optional chaining
        if (NullUtil.hasValue(alternativeFormats.formats)) {
            return alternativeFormats.formats.closeWhenFormatReady;
        } else {
            return undefined;
        }
    }

    private getDefaultCallerCallbacks(component: UiComponent): PartialFalsey<IAlternativeFormatsLaunchCallbacks>  {
        return {
            // When we return from alternative formats, we should focus the element that launched it by
            // default. Sometimes that element may not be available on the DOM anymore due to a collapsing
            // menu. In this case, the consumer should provide their own more advanced functionality in the
            // user callbacks to manage this
            'closed': () => component.$el.focus()
        };
    }

    /** Resolve a filename for a given URL. Defaults to `unknown` if none can be identified. */
    private resolveFilenameFromUrl(url: string): string {
        const parsed = DomUtil.parseHref(url);
        const fileName = parsed.pathname.split('/').pop();
        const defaultFilename: string = 'unknown';
        return NullUtil.orElse(fileName, defaultFilename);
    }

    /**
     * Resolve a mime and file type for a given filetype.
     *
     * Defaults to `application-octet-stream` and `unknown` if none can be identified.
     */
    private resolveMimeAndFileType(fileName: string): [string, string] {
        const ext = fileName.toLowerCase().split('.').pop();
        if (ext === 'pdf') {
            return ['application/pdf', 'pdf'];
        } else if (ext === 'doc' || ext === 'docx') {
            return ['application/msword', 'document'];
        } else if (ext === 'ppt' || ext === 'pptx') {
            return ['application/application/vnd.ms-powerpoint', 'presentation'];
        } else if (ext === 'html' || ext === 'htm') {
            return ['text/html', 'html-file'];
        } else {
            return ['application/octet-stream', 'unknown'];
        }
    }
}

export default new Invoke();
