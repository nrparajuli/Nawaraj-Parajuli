import * as $ from 'jquery';

import { IAnnotationOptions } from './IAnnotationOptions';
import { AlternativeFormatsIcon } from './templates/AlternativeFormatsIcon';
import { Indicator } from './templates/Indicator';

const afIconTpl = new AlternativeFormatsIcon();
const indicatorTpl = new Indicator();

/**
 * Annotate a generic resource page (page, discussion, assignment).
 *
 * This is typically comprised out of:
 *  - The WYSIWYG content
 *  - Optional file attachments
 */
export function annotateResourcePage(
    resourceType: string,
    resourceId: string | null,
    $root: JQuery<HTMLElement>,
    annotationOptions: IAnnotationOptions
): boolean {
    // Bail out if no resource IDs were provided
    if (resourceId === null) {
        return false;
    }

    // Annotate the WYSIWYG item itself
    const resourceChange = annotateResource(resourceType, resourceId, $root, annotationOptions);

    // Annotate the attachments of the WYSIWYG item, if any
    const attachmentsChange = annotateResourceAttachments(resourceType, resourceId, $root, annotationOptions);
    const hasChange = resourceChange || attachmentsChange;

    if (hasChange) {
        // Mark the content wrapper so that we can selectively apply CSS
        $root.find('#main-content-wrapper').addClass('ally-augmented');
    }

    return hasChange;
}

/** Annotate the WYSIWYG resource itself */
function annotateResource(
    resourceType: string,
    pageId: string,
    $root: JQuery<HTMLElement>,
    annotationOptions: IAnnotationOptions
): boolean {
    const $mainContent = $root.find('#main-content-wrapper');
    if ($mainContent.attr('data-ally-content-id') !== undefined) {
        return false;
    }

    const externalId = `${resourceType}:${pageId}`;
    $mainContent.attr('data-ally-content-id', externalId);
    $mainContent.attr('data-ally-richcontent-eid', externalId);
    $mainContent.addClass(`ally-augmented-richcontent-${resourceType}`);

    const $afIconInstance = $(afIconTpl.apply({
        'baseUrl': annotationOptions.baseUrl,
        'contentRef': externalId,
        'i18n': annotationOptions.i18n
    }));
    $root.find('.info-container').first().prepend($afIconInstance);

    return true;
}

/** Annotate the file attachments, if any */
function annotateResourceAttachments(
    resourceType: string,
    resourceId: string,
    $root: JQuery<HTMLElement>,
    annotationOptions: IAnnotationOptions
): boolean {
    let hasChange = false;

    // Straight-forward links
    $root.find('.attachments-file-name a.sExtlink-processed[href*="/source/"]').each((i, el) => {
        const $link = $(el);

        // Don't re-annotate if this attachment was already annotated
        if ($link.attr('data-ally-content-id') !== undefined) {
            return;
        }

        // The attachment ID can be inferred from the download link. It looks as follows:
        // /attachment/1821545608/source/0a882d0911d250f627072dd5462345dd.pdf
        const attachmentId = $link.attr('href').split('/')[2];
        const externalId = `${resourceType}:${resourceId}:${attachmentId}`;

        // Add the UI API attributes
        $link.attr('data-ally-content-id', externalId);
        $link.attr('data-ally-file-eid', externalId);

        // Add the IF and AF launchers
        const $afIconInstance = $(afIconTpl.apply({
            'baseUrl': annotationOptions.baseUrl,
            'contentRef': externalId,
            'i18n': annotationOptions.i18n
        }));
        const $indicator = $(indicatorTpl.apply({externalId}));
        const $filenameHolder = $link.closest('.attachments-file');
        $filenameHolder.append($indicator, $afIconInstance);
        hasChange = true;
    });

    // Embedded images in the list of attachments
    $root.find('.attachments-files-images .attachments-file-image img[src*="/attachment/"]').each((i, el) => {
        const $img = $(el);

        // Don't re-annotate if this attachment was already annotated
        if ($img.attr('data-ally-content-id') !== undefined) {
            return;
        }

        // The attachment ID can be inferred from the image URL. It looks as follows:
        // /attachment/1835512497/image/attachment_image_thumb
        const attachmentId = $img.attr('src').split('/')[2];
        const externalId = `${resourceType}:${resourceId}:${attachmentId}`;

        // Add the UI API attributes
        $img.attr('data-ally-content-id', externalId);
        $img.attr('data-ally-file-eid', externalId);

        // Add the IF launcher
        const $indicator = $(indicatorTpl.apply({externalId}));
        const $filenameHolder = $img.closest('.attachments-files-images');
        $filenameHolder.append($indicator);
        hasChange = true;
    });

    // Check if a seizure protector is necesary on the lightbox that gets opened when opening a thumbnail
    $root.find('#lightbox img[src^="/attachment/"]').each((i, el) => {
        const $img = $(el);

        // Don't re-annotate if this attachment was already annotated
        if ($img.attr('data-ally-content-id') !== undefined) {
            return;
        }

        // The attachment ID can be inferred from the image URL. It looks as follows:
        // /attachment/1835512497/image/lightbox_preview
        const attachmentId = $img.attr('src').split('/')[2];
        const externalId = `${resourceType}:${resourceId}:${attachmentId}`;

        // Add the UI API attributes
        $img.attr('data-ally-content-id', externalId);
        $img.attr('data-ally-file-eid', externalId);

        // Don't add an IF element, only the seizure guard is required
        hasChange = true;
    });

    return hasChange;
}
