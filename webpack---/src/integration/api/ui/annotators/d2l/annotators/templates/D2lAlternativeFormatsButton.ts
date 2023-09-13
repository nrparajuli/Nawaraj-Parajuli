
import * as $ from 'jquery';

import {Template} from 'src/integration/api/ui/templates/Template';

export interface IParams {
    baseUrl: string;
    contentRef: string;
    i18n: any;
}

/** A D2L button that contains the Ally icon and the text "Alternative Formats". The icon's color can be specified. */
export class D2lAlternativeFormatsButton extends Template<IParams> {
    protected template = require('./alternativeformatsbutton.handlebars');
    private blackAfIcon = require('src/integration/img/ally-icon-af-download-logo.svg');

    public apply(params: IParams): JQuery<HTMLElement> {
        return $(this.template({...params, 'aafIcon': this.blackAfIcon}));
    }
}
