
import * as $ from 'jquery';

import {Template} from 'src/integration/api/ui/templates/Template';

export interface IParams {
    externalId: string;
    alwaysShowForImage?: boolean;
}

export class Indicator extends Template<IParams> {
    protected template = require('./indicator.handlebars');

    public apply(params: IParams): JQuery<HTMLElement> {
        return $(this.template({'alwaysShowForImage': false, ...params}));
    }
}
