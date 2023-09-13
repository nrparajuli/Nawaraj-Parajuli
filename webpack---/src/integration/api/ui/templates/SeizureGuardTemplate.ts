
import * as $ from 'jquery';

import {IBaseLegacyTemplateParams, Template} from './Template';

export class SeizureGuardTemplate extends Template<IBaseLegacyTemplateParams> {
    protected template = require('./seizureguard.handlebars');

    private icons = {'seizureFlag': require('src/integration/img/ally-icon-seizure-flag.svg')};

    public apply(params: IBaseLegacyTemplateParams): JQuery<HTMLElement> {
        return $(this.template({...params, 'icons': this.icons}));
    }
}
