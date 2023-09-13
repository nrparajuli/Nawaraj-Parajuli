
import * as $ from 'jquery';

const images: any = require('src/integration/img').images;

export interface IBaseLegacyTemplateParams {
    ALLY_DOMAIN: string;
    i18n: any;
}

/** Represents a compiled handlebars template that can be rendered with some generic set of parameters `P`. */
export abstract class Template<P> {
    protected abstract template: (params: P) => string;
    public apply(params: P): JQuery<HTMLElement> {
        (params as any).images = images;
        return $(this.template(params));
    }
}
