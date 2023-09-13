
import * as $ from 'jquery';

import {Template} from 'src/integration/api/ui/templates/Template';

export interface IParams {
    contentRef: string;
    asCircle?: boolean;
}

export class MoodleScoreIndicatorTemplate extends Template<IParams> {
    protected template = require('./scoreindicator.handlebars');

    public apply(params: IParams): JQuery<HTMLElement> {
        let style = '';
        if (params.asCircle === true) {
            style = 'circle';
        }
        return $(this.template({...params, 'style': style}));
    }
}
