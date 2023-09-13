
import * as $ from 'jquery';

import {Template} from 'src/integration/api/ui/templates/Template';

export interface IParams {
    contentRef: string;
    i18n: any;
}

export class AlternativeFormatsIcon extends Template<IParams> {
    protected template = require('./alternativeformatsicon.handlebars');

    public apply(params: IParams): JQuery<HTMLElement> {
        return $(this.template(params));
    }
}
