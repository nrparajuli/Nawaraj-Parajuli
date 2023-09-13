import * as $ from 'jquery';

import * as DomUtil from 'src/shared/DomUtil';

import { IAnnotationOptions } from './IAnnotationOptions';
import { AlternativeFormatsIcon } from './templates/AlternativeFormatsIcon';
import { Indicator } from './templates/Indicator';

/** Annotate the file profile page */
export function annotateFileProfile(
    $root: JQuery<HTMLElement>,
    annotationOptions: IAnnotationOptions
): boolean {
    let hasChange = false;
    const afIconTpl = new AlternativeFormatsIcon();
    const indicatorTpl = new Indicator();

    // Regular files
    $root.find('.attachments-file-name a.sExtlink-processed[href*="/source/"]').each((i, el) => {
        const $link = $(el);
        // Don't re-annotate if this page was already annotated
        if ($link.attr('data-ally-content-id') !== undefined) {
            return;
        }

        // Mark the content wrapper so that we can selectively apply CSS
        $root.find('#main-content-wrapper').addClass('ally-augmented');

        // Add the UI API attributes
        const externalId = DomUtil.parseHref(annotationOptions.locationHref).pathname.split('/').pop()!;
        $link.attr('data-ally-content-id', externalId);
        $link.attr('data-ally-file-eid', externalId);

        // Add the IF and AF launchers
        const $afIconInstance = $(afIconTpl.apply({
            'baseUrl': annotationOptions.baseUrl,
            'contentRef': externalId,
            'i18n': annotationOptions.i18n
        }));
        const $indicator = $(indicatorTpl.apply({externalId}));
        $root.find('.attachments-file-name').append($indicator);
        $afIconInstance.insertAfter($root.find('#center-top h2'));

        hasChange = true;
    });

    // Images
    const $img = $root.find('#content-wrapper img[src^="/attachment/"]');
    if ($img.length === 1 && $img.attr('data-ally-content-id') === undefined) {
        // Mark the content wrapper so that we can selectively apply CSS
        $root.find('#main-content-wrapper').addClass('ally-augmented').addClass('ally-augmented-file-image');

        // Add the UI API attributes
        const externalId = DomUtil.parseHref(annotationOptions.locationHref).pathname.split('/').pop()!;
        $img.attr('data-ally-content-id', externalId);
        $img.attr('data-ally-file-eid', externalId);

        // Add the IF launchers
        const $indicator = $(indicatorTpl.apply({externalId, 'alwaysShowForImage': true}));
        $root.find('h2').append($indicator);

        hasChange = true;
    }

    return hasChange;
}
