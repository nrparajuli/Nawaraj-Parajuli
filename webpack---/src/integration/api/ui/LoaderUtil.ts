
import * as $ from 'jquery';

import * as NullUtil from 'src/shared/NullUtil';

/** Get the Ally base URL from the specified Ally loader script. It is assumed it is a full URL. */
export function getBaseUrl($script: JQuery<HTMLElement>): string {
    return NullUtil.orElse<string>($script.attr('src'), '')
        .split('/')
        .slice(0, 3)
        .join('/');
}

/** Find all `data-ally-*` attributes on the specified script tag. */
export function findDataAllyAttributes($script: JQuery<HTMLElement>): {[key: string]: string} {
    const attrs: {[key: string]: string} = {};
    const scriptEl = $script[0] as HTMLElement | undefined;
    if (scriptEl) {
        $.each(scriptEl.attributes, (i, attr) => {
            if (attr.name.indexOf('data-ally-') === 0) {
                const name = attr.name.slice(10);
                attrs[name] = attr.value;
            }
        });
    }
    return attrs;
}
