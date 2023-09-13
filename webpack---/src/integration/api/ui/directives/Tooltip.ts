import * as TooltipUtil from 'src/shared/tscomponents/tooltip/TooltipUtil';
import {IUploadReportMap} from '../../client/client.model';
import {IContentInstances} from '../ContentInstance';
import {Ui} from '../Ui';
import {UiComponent} from '../UiComponent';
import {UiDirective} from '../UiDirective';

/**
 * A directive that displays the title attribute in a tooltip.
 *
 * # Attributes:
 *
 *  `data-ally-tooltip`  -   Indicates that a tooltip should be bound to the element
 *  `title`              -   The tooltip content
 *
 * # Examples
 *
 * Add a tooltip on a div
 * ```
 *  <a src="" data-ally-content-id="1" data-ally-file-eid="file1" href="#">A file</a>
 *  <div data-ally-content-ref="1" data-ally-tooltip title="Alternative formats are available">...</div>
 * ```
 */
export class Tooltip extends UiDirective {

    public isApplicable(ui: Ui, component: UiComponent, contentInstances: IContentInstances,
        reports: IUploadReportMap): boolean {
        const hasTitle = component.$el.is('[title]') ||
            component.$el.is('[aria-label]') ;
        return component.hasDataAllyAttr('tooltip') && hasTitle;
    }

    public run(ui: Ui, component: UiComponent, contentInstances: IContentInstances, reports: IUploadReportMap): void {
        TooltipUtil.enableTooltips();
        component.$el.addClass('ally-add-tooltip');
    }
}

const tooltip = new Tooltip();

export default tooltip;
