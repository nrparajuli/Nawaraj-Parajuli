
import * as NullUtil from 'src/shared/NullUtil';
import {IUploadReportMap} from '../../client/client.model';
import {FileReport} from '../../client/FileReport';
import {AlternativeTextUtil} from '../AlternativeTextUtil';
import {ContentInstance, ContentInstanceType, IContentInstances} from '../ContentInstance';
import {Ui} from '../Ui';
import {UiComponent} from '../UiComponent';
import {UiDirective} from '../UiDirective';

/**
 * A directive that shows/hides elements based on state of ally data associated to the content item it references.
 *
 * # Attributes:
 *
 * * `data-ally-show` - Indicates that this element should only show based on a trait specified as its value. The hiding
 * logistics apply a `display: none;` to the CSS of the element. To show an item, by default `display: block;` is added
 * * `data-ally-show-display` - When an item is shown as a result of this directive, this value indicates what to set as
 * its `display` CSS attribute
 *
 * # data-ally-show
 *
 * The acceptable values are:
 *
 * * `instructorfeedback` - Only shows if instructor feedback data is available
 * * `instructorfeedback-score-low` - Only shows if the feedback data is available and reaches the "low" threshold
 * * `instructorfeedback-score-medium` - Only shows if the feedback data is available and reaches the "medium" threshold
 * * `instructorfeedback-score-high` - Only shows if the feedback data is available and reaches the "high" threshold
 * * `instructorfeedback-score-perfect`- Only shows if the feedback data is available and reaches the "medium" threshold
 * * `alternativeformats` - Only shows if there are alternative formats available
 * * `seizureinducing` - Only shows if the content item is flagged as being a seizure risk
 *
 * In addition to singular values for the `data-ally-show` attribute, a space-separated list is allowed that indicates
 * the element will be shown if _any_ of the feature sets are available.
 *
 * # data-ally-content-ref
 *
 * This directive supports a `*` being provided as the content reference, which indicates that it will be shown if _any_
 * content instance supports any of the specified feature sets. This is useful in cases where certain UI components
 * should only show if there is any Ally support on the page whatsoever.
 *
 * # Examples
 *
 * Only show the div if instructor feedback is available for the image:
 * ```
 *  <img src="" data-ally-content-id="1" data-ally-file-eid="file3" />
 *  <div data-ally-content-ref="1" data-ally-show="instructorfeedback" data-ally-show-display="inline"
 *       style="display: none;"></div>
 * ```
 *
 * Only show the div if instructor feedback OR alternative formats are available for the image:
 * ```
 *  <img src="" data-ally-content-id="1" data-ally-file-eid="file3" />
 *  <div data-ally-content-ref="1" data-ally-show="alternativeformats instructorfeedback"
 *       data-ally-show-display="inline" style="display: none;"></div>
 * ```
 *
 * Only show the div if _any_ of the content instances on the page support any of alternativeformats or
 * instructorfeedback:
 * ```
 *  <img src="image.png" data-ally-content-id="1" data-ally-file-eid="file3" />
 *  <a href="assignment1.pdf" data-ally-content-id="2" data-ally-file-eid="file4" />
 *  <div data-ally-content-ref="*" data-ally-show="alternativeformats instructorfeedback" style="display: none;"></div>
 * ```
 */
class Show extends UiDirective {

    public isApplicable(ui: Ui, component: UiComponent, contentInstances: IContentInstances,
        reports: IUploadReportMap): boolean {
        return component.hasDataAllyAttr('show');
    }

    public run(ui: Ui, component: UiComponent, contentInstances: IContentInstances, reports: IUploadReportMap): void {
        const id = component.getContentInstanceId();
        const showValues = NullUtil.orElse<string>(component.getDataAllyAttrValue('show'), '').split(' ');
        const display = NullUtil.orElse<string>(component.getDataAllyAttrValue('show-display'), 'block');

        // Since we support an asterisk expression, we'll treat the content instances we care about as an array since
        // there could be one or many
        const selectedContentInstances = ContentInstance.findContentInstances(contentInstances, id);
        const shouldShowContentInstances = selectedContentInstances.filter((ci) => {
            return showValues.filter((v) => this.shouldShow(component, v, ci, reports[ci.getId()])).length > 0;
        });
        if (shouldShowContentInstances.length > 0) {
            component.$el.css('display', display);
        } else {
            component.$el.hide();
        }
    }

    /**
     * Determine if instructor feedback should show for the specified directive value, content instance and file report
     * data.
     *
     * @param showValue         The value of the `data-ally-show` attribute
     * @param contentInstance   The content instance
     * @param report            The file report data
     * @return                  Whether or not the element should be shown
     */
    private shouldShow(
        component: UiComponent,
        showValue: string,
        contentInstance: ContentInstance,
        report: FileReport | null
    ): boolean {
        if (NullUtil.hasValue(report)) {
            if (showValue.indexOf('instructorfeedback') === 0) {
                const ifValues = this.shouldShowInstructorFeedback(component, contentInstance, report);
                if (NullUtil.hasValue(ifValues)) {
                    const score = ifValues;
                    return (showValue === 'instructorfeedback' ||
                        showValue === `instructorfeedback-score-${FileReport.scoreLabel(score)}`);
                } else {
                    return false;
                }
            } else if (
                showValue === 'alternativeformats' &&
                (
                    contentInstance.type === ContentInstanceType.file ||
                    contentInstance.type === ContentInstanceType.richContent ||
                    contentInstance.type === ContentInstanceType.aaasContent
                ) &&
                report.availableAlternativeFormats &&
                report.availableAlternativeFormats.length > 0
            ) {
                return true;
            } else if (showValue === 'seizureinducing' && report.seizureRisk === true) {
                return true;
            }
        } else if (showValue === 'alternativeformats' && contentInstance.type === ContentInstanceType.webpage) {
            return true;
        }

        return false;
    }

    /**
     * Whether or not instructor feedback should be shown in any capacity for the specified content instance. This takes
     * care of some tricky integration support logic:
     *
     *  * It should only be available to show if the item has a score
     *  * If the content instance is an embedded image, there are trickier issues:
     *      * If the image is in a rich content item that supports updates, the indicator should show
     *      * If the image is in NOT in a rich content item that supports updates:
     *          * If the image can induce seizures, the indicator should show
     *          * If the user has not provided meaningful alt text manually to the file, the indicator should show
     *          * Otherwise, suppress the score indicator
     *
     * @param contentInstance   The content instance referenced by the directive
     * @param report            The file report of the content instance
     * @return                  Whether or not instructor feedback should be visible
     */
    private shouldShowInstructorFeedback(
        component: UiComponent,
        contentInstance: ContentInstance,
        report: FileReport
    ): number | null {
        // Instructor feedback is only ever applicable if there is a score available
        if (typeof report.score === 'number') {
            if (contentInstance.$el[0].tagName !== 'IMG') {
                // We only have special display rules when the content instance is an embedded image
                return report.score;
            } else if (report.seizureRisk === true) {
                // Always allow instructor feedback to show if it's an image that carries seizure risk
                return report.score;
            } else if (component.getDataAllyAttrValue('show-always-show-for-image') === 'true') {
                // Allow overrides on the component through a data-ally-show-alwayts-show-for-image="true" attribute.
                // This is used in the Schoology integration to show indicators for images as it doesn't support the
                // description workarounds
                return report.score;
            } else if (!AlternativeTextUtil.isMeaningful(contentInstance.getSourceAttrValue('alt'), report.name)) {
                // If the user has not specified a meaningful alt text into the WYSIWYG editor, we always show the
                // indicator as well
                return report.score;
            } else if (ContentInstance.findContainingRichContent(contentInstance)) {
                // If the embedded content is inside a supported rich content instance (i.e., replacing alt text is
                // supported), then we always always show the score indicator
                return report.score;
            } else {
                // Otherwise, do not show the indicator for this embedded image
                return null;
            }
        } else {
            return null;
        }
    }
}

export default new Show();
