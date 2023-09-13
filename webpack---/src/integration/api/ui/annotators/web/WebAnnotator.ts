
import * as $ from 'jquery';

import { UrlUtil } from 'projects/utils/src/UrlUtil';
import * as LoaderUtil from 'src/integration/api/ui/LoaderUtil';
import {AlternativeFormatsWebLauncherTemplate} from 'src/integration/api/ui/templates/AlternativeFormatsWebLauncherTemplate';
import {JsUiFactory, Ui} from 'src/integration/api/ui/Ui';
import * as NullUtil from 'src/shared/NullUtil';
import * as NumberUtil from 'src/shared/NumberUtil';

import {HtmlPreviewDriver} from './HtmlPreviewDriver';

export enum AfStyle {
    BarBottom = 'bar_bottom',
    FlagLarge = 'flag_large',
    FlagSmall = 'flag_small'
}

export const afStyleMapper: {[key: string]: AfStyle} = {
    'bar_bottom': AfStyle.BarBottom,
    'flag_large': AfStyle.FlagLarge,
    'flag_small': AfStyle.FlagSmall
};

export class WebAnnotator {

    public static annotate(
        thisWindow: Window,
        parentWindow: Window,
        $allyLoaderEl: JQuery<HTMLElement>
    ): Promise<Ui | null> {
        const dataAllyAttrs = LoaderUtil.findDataAllyAttributes($allyLoaderEl);
        const platformName = NullUtil.orElse<string>(dataAllyAttrs['platform-name'], '').toLowerCase();
        if (platformName === 'web') {
            // This is a web integration. To keep injection simple we'll do some auto-configuration rather than
            // requiring the customer to copy/paste JavaScript code into their page
            const clientId = NumberUtil.intOrNull(dataAllyAttrs['client-id']);
            if (typeof clientId === 'number') {
                const baseUrl = LoaderUtil.getBaseUrl($allyLoaderEl);
                const styleAttr = NullUtil.orElse<string>(dataAllyAttrs['af-style'], 'none');
                const style = (styleAttr in afStyleMapper) ? afStyleMapper[styleAttr] : null;
                const $body = WebAnnotator.findEl(dataAllyAttrs['selector-root'], 'body', $('body'));
                const $main = WebAnnotator.findEl(dataAllyAttrs['selector-main'], 'main,[role=main]', $body);
                const contentId = '0';
                const mockAttr = dataAllyAttrs.mock;
                const $mock = (mockAttr !== undefined) ?
                    (thisWindow as any)[mockAttr] as JQueryStatic : undefined;
                const client = {
                    baseUrl,
                    clientId,
                    'jQuery': $mock
                };
                const ui = JsUiFactory({
                    client,
                    // The root of the content will be the designated "main" portion of the page
                    'contentRoot': $main[0],
                    'platformName': 'web',
                    'role': 'anonymous'
                });
                const i18n = ui.i18n;

                // Annotate the main content element as the webpage root. This avoids including things like navigation
                // links as content that requires alternative formats
                $main
                    .attr('data-ally-content-id', contentId)
                    .attr('data-ally-webpage', '');

                // Apply and bind the launcher if a valid style was specified
                if (style !== null) {
                    const launcher = new AlternativeFormatsWebLauncherTemplate();
                    $body.append(launcher.apply({baseUrl, contentId, i18n, style}));
                }

                // Determine if we are being nested in preview mode from instructor feedbck. If we are, then there will
                // be a ?data-ally-preview query-string parameter in the location
                const isPreviewing = NullUtil.hasValue(
                    UrlUtil.getQueryStringParam(thisWindow.location.search, 'data-ally-preview')
                );

                if (!isPreviewing) {
                    // Apply an update/binding sweep to the entire body. While the content of the page may only lay
                    // under some designated "main" portion, icons to launch alternative formats for the page may well
                    // fall outside of that region, as it is a control / navigation, after all
                    return ui.update($body[0]).then(() => ui);
                } else {
                    // We are in preview made of the page because there was a `data-ally-preview` query string
                    // parameter. Start up the preview driver which will take over the page very intrusively
                    const htmlPreviewDriver = new HtmlPreviewDriver(baseUrl, ui.i18n);
                    ui.onDestroy(() => {
                        return Promise.resolve(htmlPreviewDriver.destroy());
                    });

                    return this.startDriver(htmlPreviewDriver, thisWindow, parentWindow)
                        .then(() => ui);
                }
            } else {
                return Promise.reject(new Error(
                    'Ally loader script is missing data-ally-client-id attribute. Aborting.'
                ));
            }
        } else {
            return Promise.resolve(null);
        }
    }

    private static startDriver(driver: HtmlPreviewDriver, thisWindow: Window, parentWindow: Window): Promise<void> {
        return new Promise((accept) => {
            // By looking for these elements, and then checking if their bounding client rect top !== 0, we're
            // essentially checking if the browser as finished reflowing and positioning the elements on the page. When
            // the page loads, while there could be elements on the DOM, it's not guaranteed the browser has actually
            // put them in any position. The main issue this causes is since we initially order all highlight elements
            // by their top position (instead of DOM order), we need to know the top coordinate so that we can do the
            // sort comparisons. Once there exists any element that has a non-0 top position, we know as best we can
            // the elements have been placed by the browser.
            const els = $('p,span,div,h1,h2,h3,h4,h5,h6').toArray();
            const handle = setInterval(() => {
                for (const el of els) {
                    if (el.getBoundingClientRect().top !== 0) {
                        clearInterval(handle);
                        driver.start({parentWindow, thisWindow});
                        accept();
                        return;
                    }
                }
            }, 500);
        });
    }

    private static findEl(
        selector: string | null | undefined,
        defaultSelector: string,
        $defaultElement: JQuery<HTMLElement>
    ): JQuery<HTMLElement> {
        const $el = $(NullUtil.orElse<string>(selector, defaultSelector)).first();
        const el0 = $el[0] as HTMLElement | undefined;
        if (el0) {
            return $el;
        } else {
            return $defaultElement;
        }
    }
}
