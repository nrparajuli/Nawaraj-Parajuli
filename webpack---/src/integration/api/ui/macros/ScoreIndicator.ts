
import {isUltraUi} from 'src/integration/api/ui/annotators/learn-ultra/LearnUltraUtil';
import * as NullUtil from 'src/shared/NullUtil';
import {IUploadReportMap} from '../../client/client.model';
import {AttrUtil} from '../AttrUtil';
import {IContentInstances} from '../ContentInstance';
import {Target} from '../InstructorFeedback';
import * as Templates from '../Templates';
import {ScoreIndicatorStyle} from '../templates/ScoreIndicatorTemplate';
import {Ui} from '../Ui';
import {UiComponent} from '../UiComponent';
import {UiMacro} from '../UiMacro';

/**
 * Expands a template that will display a score indicator for a file.
 */
class ScoreIndicator extends UiMacro {

    public isApplicable(
        ui: Ui,
        component: UiComponent,
        contentInstances: IContentInstances,
        reports: IUploadReportMap
    ): boolean {
        return component.hasDataAllyAttr('scoreindicator') && component.$el.find('*').length === 0;
    }

    public run(ui: Ui, component: UiComponent, contentInstances: IContentInstances, reports: IUploadReportMap): void {
        const contentInstance = contentInstances[component.getContentInstanceId()];
        const scoreIndicatorValue = NullUtil.orElse<string>(component.getDataAllyAttrValue('scoreindicator'), '');
        const alwaysShowForImg = NullUtil.orElse(component.getDataAllyAttrValue('show-always-show-for-image'), 'false');
        const $scoreIndicator = Templates.scoreIndicator.apply({
            'alwaysShowForImage': alwaysShowForImg,
            'baseUrl': ui.client.config.baseUrl,
            'contentId': contentInstance.getId(),
            'customIconSet': ui.config.instructorFeedback.customIconSet,
            'i18n': ui.i18n,
            'style': this.resolveScoreIndicatorStyle(ui, scoreIndicatorValue),
            'target': this.resolveTarget(component)
        });

        // We only show this item if instructor feedback is available for the content
        component.$el.attr(AttrUtil.getDataAllyAttrName('show'), 'instructorfeedback');
        component.$el.empty().append($scoreIndicator);
    }

    private resolveScoreIndicatorStyle(ui: Ui, scoreIndicatorValue: string): ScoreIndicatorStyle {
        let style = ScoreIndicatorStyle.standard;
        if (scoreIndicatorValue === 'custom') {
            style = ScoreIndicatorStyle.custom;
        } else if (scoreIndicatorValue === 'circle') {
            style = ScoreIndicatorStyle.circle;
        } else if (scoreIndicatorValue === 'learnUltra') {
            style = ScoreIndicatorStyle.learnUltra;
        }

        if (style === ScoreIndicatorStyle.standard || style === ScoreIndicatorStyle.circle) {
            // Platform-specific defaults
            if (isUltraUi(ui)) {
                style = ScoreIndicatorStyle.learnUltra;
            }
        }

        return style;
    }

    private resolveTarget(component: UiComponent): Target | undefined {
        const attrValue = component.getDataAllyAttrValue('scoreindicator-target');
        if (attrValue === 'window') {
            return Target.Window;
        } else if (attrValue === 'iframe') {
            return Target.Iframe;
        } else {
            return undefined;
        }
    }
}

export default new ScoreIndicator();
