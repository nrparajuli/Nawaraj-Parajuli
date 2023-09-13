
import {IBaseLegacyTemplateParams, Template} from './Template';

export interface IParams extends IBaseLegacyTemplateParams {
    className: string;
    content: string;
}

export class HtmlPreviewSelectionTemplate extends Template<IParams> {
    protected template = require('./htmlpreviewselection.handlebars');
}
