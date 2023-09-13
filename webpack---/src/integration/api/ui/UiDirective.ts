
import {IUploadReportMap} from '../client/client.model';
import {IContentInstances} from './ContentInstance';
import {Ui} from './Ui';
import {UiComponent} from './UiComponent';

/**
 * Base model of a directive that is used to apply very low-level and non-intrusive effects onto an HTML element. These
 * would typically only have very basic sets of functionality, such as hiding/showing an element, or binding/unbinding
 * a specific click handler. But nothing as obtrusive as mutating the content of the element or removing the element
 * from the DOM.
 *
 * See the directory containing the [[Show]] directive for all available directive implementations.
 */
export abstract class UiDirective {

    /** Run a directive rendering cycle across all specified directives. */
    public static run(ui: Ui, component: UiComponent, contentInstances: IContentInstances, reports: IUploadReportMap,
        allDirectives: UiDirective[]): void {
        allDirectives.forEach((d) => {
            if (d.isApplicable(ui, component, contentInstances, reports)) {
                d.run(ui, component, contentInstances, reports);
            }
        });
    }

    /**
     * Whether or not this directive is applicable in this context. If this method returns `false`, then the `run`
     * method will never be executed.
     */
    public abstract isApplicable(ui: Ui, component: UiComponent, contentInstances: IContentInstances,
        reports: IUploadReportMap): boolean;

    /** Apply the directive logic onto the component. */
    public abstract run(ui: Ui, component: UiComponent, contentInstances: IContentInstances,
        reports: IUploadReportMap): void;
}
