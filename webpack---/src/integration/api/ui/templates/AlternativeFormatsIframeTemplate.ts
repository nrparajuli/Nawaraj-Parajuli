
import {IBaseLegacyTemplateParams, Template} from './Template';

export interface IParams extends IBaseLegacyTemplateParams {
    platformName: string;
    platformUi: string | null;
    locale: string;
}

export class AlternativeFormatsIframeTemplate extends Template<IParams> {
    protected template = require('src/integration/templates/ally-accessible-versions-iframe.handlebars');
}
