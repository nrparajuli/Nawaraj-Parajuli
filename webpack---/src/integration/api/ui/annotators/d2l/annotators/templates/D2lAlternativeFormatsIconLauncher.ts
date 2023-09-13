
import * as $ from 'jquery';

import {Template} from 'src/integration/api/ui/templates/Template';

export interface IParams {
    baseUrl: string;
    contentRef: string;
    i18n: any;
}

/** A simple image holding the Ally logo that can be used to trigger the alternative formats */
export class D2lAlternativeFormatsIconLauncher extends Template<IParams> {
    protected template = require('./alternativeformatsiconlauncher.handlebars');
    protected aafIcon = require('src/integration/img/ally-icon-af-download-logo.svg');

    public apply(params: IParams): JQuery<HTMLElement> {
        return $(this.template({...params, 'aafIcon': this.aafIcon}));
    }
}
