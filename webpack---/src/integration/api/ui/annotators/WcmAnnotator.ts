import { HtmlPreviewDriver } from './web/HtmlPreviewDriver';

import { UrlUtil } from 'projects/utils/src/UrlUtil';
import * as LoaderUtil from 'src/integration/api/ui/LoaderUtil';
import * as NullUtil from 'src/shared/NullUtil';
import { I18n } from '../I18n';

export class WcmAnnotator {

    public static annotate(
        thisWindow: Window,
        parentWindow: Window,
        $allyLoaderEl: JQuery<HTMLElement>
    ): Promise<void> {
        // Determine if we are being nested in preview mode from instructor feedbck. If we are, then there will
        // be a ?data-ally-preview query-string parameter in the location
        const platformName = UrlUtil.getQueryStringParam(thisWindow.location.search, 'data-ally-platform-name');
        if (NullUtil.hasValue(platformName) && platformName.toLowerCase() === 'wcm') {
            const isPreviewing = NullUtil.hasValue(
                UrlUtil.getQueryStringParam(thisWindow.location.search, 'data-ally-preview')
            );

            if (isPreviewing) {
                // We are in preview mode of the page because there was a `data-ally-preview` query string parameter.
                // Start up the preview driver which will take over the page very intrusively
                const baseUrl = LoaderUtil.getBaseUrl($allyLoaderEl);
                const driver = new HtmlPreviewDriver(baseUrl, I18n.allI18n);
                driver.start({parentWindow, thisWindow});
            }
        }
        return Promise.resolve();
    }
}
