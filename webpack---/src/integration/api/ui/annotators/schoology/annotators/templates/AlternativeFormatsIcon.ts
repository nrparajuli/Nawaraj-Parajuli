
import * as $ from 'jquery';

import {Template} from 'src/integration/api/ui/templates/Template';

export interface IParams {
    baseUrl: string;
    contentRef: string;
    i18n: any;
}

export class AlternativeFormatsIcon extends Template<IParams> {
    protected template = require('./alternativeformatsicon.handlebars');
    private aafIcon = require('src/integration/img/ally-icon-af-download-logo.svg');

    public apply(params: IParams): JQuery<HTMLElement> {
        return $(this.template({...params, 'aafIcon': this.aafIcon}));
    }
}
