import * as $ from 'jquery';

import * as NullUtil from 'src/shared/NullUtil';

import {Target} from '../InstructorFeedback';
import {Template} from './Template';

export enum ScoreIndicatorStyle {
    circle = 'circle',
    custom = 'custom',
    learnUltra = 'learnUltra',
    standard = 'standard'
}

export interface IParams {
    /**
     * The value to populate `data-ally-show-always-show-for-image` with which controls whether the indicator should be
     * shown regardless of the ImageDescription rule.
     */
    alwaysShowForImage?: string;
    baseUrl: string;
    contentId: string;
    customIconSet?: IJsScoreIndicatorIconSet;
    i18n: any;
    style: ScoreIndicatorStyle;
    target?: Target;
}

export interface IJsScoreIndicatorIconSet {
    high: any;
    low: any;
    medium: any;
    perfect: any;
}

export class ScoreIndicatorTemplate extends Template<IParams> {
    protected template = require('./scoreindicator.handlebars');

    // Each icon. We can't do this very dynamically as webpack will be resolving a hashed URL based on these require
    // statements for each, so we must enumerate them here
    private icons = {
        'circle': {
            'high': require('src/integration/img/ally-icon-indicator-high-circle.svg'),
            'low': require('src/integration/img/ally-icon-indicator-low-circle.svg'),
            'medium': require('src/integration/img/ally-icon-indicator-medium-circle.svg'),
            'perfect': require('src/integration/img/ally-icon-indicator-perfect-circle.svg')
        },
        'learnUltra': {
            'high': require('src/integration/img/ally-icon-indicator-high-learnUltra.svg'),
            'low': require('src/integration/img/ally-icon-indicator-low-learnUltra.svg'),
            'medium': require('src/integration/img/ally-icon-indicator-medium-learnUltra.svg'),
            'perfect': require('src/integration/img/ally-icon-indicator-perfect-learnUltra.svg')
        },
        'standard': {
            'high': require('src/integration/img/ally-icon-indicator-high.svg'),
            'low': require('src/integration/img/ally-icon-indicator-low.svg'),
            'medium': require('src/integration/img/ally-icon-indicator-medium.svg'),
            'perfect': require('src/integration/img/ally-icon-indicator-perfect.svg')
        }
    };

    public apply(params: IParams): JQuery<HTMLElement> {
        // Add our icon src urls given the score indicator style
        let icons = this.icons.standard;
        if (params.style === ScoreIndicatorStyle.custom) {
            // If a custom style was requested, but no custom icon set was configured, the standard icon set will be
            // used as a fall-back.
            if (params.customIconSet !== undefined) {
                icons = params.customIconSet;
            }
        } else {
            icons = this.icons[params.style];
        }
        const target = NullUtil.orElse<Target>(params.target, Target.Iframe);
        const templateParams = {'alwaysShowForImage': 'false', ...params, icons, target};
        return $(this.template(templateParams));
    }
}
