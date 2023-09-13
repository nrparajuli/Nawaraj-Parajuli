
import * as $ from 'jquery';

import {Target} from 'src/integration/api/ui/InstructorFeedback';
import {Template} from 'src/integration/api/ui/templates/Template';

export interface IParams {
    contentRef: string;
    target?: Target;
}

/** A span that holds the necessary attributes for the Ally UI API to expand into the appropriate score indicator */
export class D2LScoreIndicatorTemplate extends Template<IParams> {
    protected template = require('./scoreindicator.handlebars');

    public apply(params: IParams): JQuery<HTMLElement> {
        const target = this.resolveTarget(params);
        const templateParams = {...params, target};
        return $(this.template(templateParams));
    }

    private resolveTarget(params: IParams): string {
        if (params.target === Target.Iframe || params.target === Target.Window) {
            return params.target;
        } else {
            return Target.Iframe;
        }
    }
}
