
import {IBaseLegacyTemplateParams, Template} from './Template';

export interface IParams extends IBaseLegacyTemplateParams {
    locale: string;
}

export class InstructorFeedbackIframeTemplate extends Template<IParams> {
    protected template = require('src/integration/templates/ally-instructor-feedback-iframe.handlebars');
}
