
import {IUploadReportMap} from '../client/client.model';
import {IContentInstances} from './ContentInstance';
import {Ui} from './Ui';
import {UiComponent} from './UiComponent';

/**
 * Base model of a macro that is used to apply multiple directives, bindings and take full control of the component on
 * which it is placed. When applying a [[Ui.update]] operation onto the DOM, there is a full cycle of rendering that
 * occurs for macros, followed by a full cycle of rendering for directives. That allows us to expand directives inside
 * a template that will then be picked up by the following cycle.
 *
 * See the directory containing the [[ScoreIndicator]] macro for all available macro implementations.
 */
export abstract class UiMacro {

    public static run(ui: Ui, component: UiComponent, contentInstances: IContentInstances, reports: IUploadReportMap,
        allMacros: UiMacro[]): void {
        allMacros.forEach((d) => {
            if (d.isApplicable(ui, component, contentInstances, reports)) {
                d.run(ui, component, contentInstances, reports);
            }
        });
    }

    /**
     * Whether or not this macro is applicable in this context. If this method returns `false`, then the `run` method
     * will never be executed.
     */
    public abstract isApplicable(ui: Ui, component: UiComponent, contentInstances: IContentInstances,
        reports: IUploadReportMap): boolean;

    /** Apply the macro logic onto the component. */
    public abstract run(ui: Ui, component: UiComponent, contentInstances: IContentInstances,
        reports: IUploadReportMap): void;
}
