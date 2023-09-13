import * as $ from 'jquery';

import * as DomUtil from 'src/shared/DomUtil';
import * as NullUtil from 'src/shared/NullUtil';
import { resolvePageInfo, SchoologyPageType } from '../SchoologyConfig';

import { IAnnotationOptions } from './IAnnotationOptions';
import { AlternativeFormatsIcon } from './templates/AlternativeFormatsIcon';
import { Indicator } from './templates/Indicator';

const afIconTpl = new AlternativeFormatsIcon();
const indicatorTpl = new Indicator();

/** Annotate each file/page on the materials listing page */
export function annotateListOfMaterials(
    $root: JQuery<HTMLElement>,
    annotationOptions: IAnnotationOptions
): boolean {
    if (isInFilterView($root)) {
        return annotateFilteredListOfMaterials($root, annotationOptions);
    } else {
        return annotateBasicListOfMaterials($root, annotationOptions);
    }
}

/** Checks whether the list of materials is being filtered */
function isInFilterView($root: JQuery<HTMLElement>) {
    return $root.find('.s-js-filtered-view-list').length > 0;
}

/** Annotate each file/page on the materials listing page */
function annotateBasicListOfMaterials(
    $root: JQuery<HTMLElement>,
    annotationOptions: IAnnotationOptions
): boolean {
    let hasChange = false;
    const $table = $root.find('table#folder-contents-table');
    $table.find('tr td .item-info').each((i, el) => {
        const $itemInfo = $(el);

        const $link = $itemInfo.find('a.sExtlink-processed').first();
        let $resource = $link;
        const $previewImg = $itemInfo
            .parent()
            .find('.attachments-file-image .attachments-file-thumbnail img.imagecache');
        if ($previewImg.length === 1) {
            $resource = $previewImg;
        }

        if ($resource.length === 0 || $resource.attr('data-ally-content-id') !== undefined) {
            return;
        }
        const href = DomUtil.parseHref($link.attr('href'));
        const externalId = annotateResource($resource, href);
        if (!NullUtil.hasValue(externalId)) {
            return;
        }

        if (NullUtil.hasValue($resource.attr('data-ally-file-eid'))) {
            annotateAsFile(externalId, $itemInfo, annotationOptions);
        } else {
            annotateAsRichContent(externalId, $itemInfo, annotationOptions);
        }
        hasChange = true;
    });

    if (hasChange) {
        $table.addClass('ally-augmented');
    }

    return hasChange;
}

/** Annotate each file/page on the filtered materials listing page */
function annotateFilteredListOfMaterials(
    $root: JQuery<HTMLElement>,
    annotationOptions: IAnnotationOptions
): boolean {
    let hasChange = false;
    const $table = $root.find('div.s-js-materials-body.filtered-view ');
    $table.find('.s-common-block_title > a:first-child').each((i, el) => {
        const $link = $(el);
        if ($link.attr('data-ally-content-id') !== undefined) {
            // This link has been annotated previously, continue on to the next link
            return;
        }

        // All files and attachments have an id of the form "document-<external id>"
        const externalFileId = NullUtil.orElse($link.attr('id'), '').split('-')[1];
        if (NullUtil.hasValue(externalFileId)) {
            annotateFilteredFileLink($link, externalFileId, annotationOptions);
            hasChange = true;
        }

        // Other links (e.g. assignments, discussions, ...) can be resolved from the href
        const href = DomUtil.parseHref($link.attr('href'));
        const pageInfo = resolvePageInfo(href);
        if (NullUtil.hasValue(pageInfo) && NullUtil.hasValue(pageInfo.richContentType)) {
            const externalId = `${pageInfo.richContentType}:${pageInfo.resourceId}`;
            annotateFilteredRichContentLink($link, externalId, annotationOptions);
            hasChange = true;
        }
    });

    if (hasChange) {
        $table.addClass('ally-augmented');
    }

    return hasChange;
}

function annotateFilteredFileLink(
    $link: JQuery<HTMLElement>,
    externalId: string,
    annotationOptions: IAnnotationOptions
): void {
    $link.attr('data-ally-content-id', externalId);
    $link.attr('data-ally-file-eid', externalId);

    const $afIconInstance = $(afIconTpl.apply({
        'baseUrl': annotationOptions.baseUrl,
        'contentRef': externalId,
        'i18n': annotationOptions.i18n
    }));
    const $indicator = $(indicatorTpl.apply({externalId, 'alwaysShowForImage': true}));
    $link.parent().append($indicator);

    // Float the AF icon to the right of the title cell. Note that it can't be added to the second cell with the cog
    // as that's not present in the student UI.
    $link.parent().append($afIconInstance);
}

function annotateFilteredRichContentLink(
    $link: JQuery<HTMLElement>,
    externalId: string,
    annotationOptions: IAnnotationOptions
): void {
    $link.attr('data-ally-content-id', externalId);
    $link.attr('data-ally-richcontent-eid', externalId);

    const $afIconInstance = $(afIconTpl.apply({
        'baseUrl': annotationOptions.baseUrl,
        'contentRef': externalId,
        'i18n': annotationOptions.i18n
    }));

    // Float the AF icon to the right of the title cell. Note that it can't be added to the second cell with the cog
    // as that's not present in the student UI.
    $link.parent().append($afIconInstance);
}

/**
 * Set the data-ally-content-id and file/richcontent external id on the link in the list of materials.
 *
 * If the resource is an image with a preview, the image will be annotated instead
 *
 * @param $resource The jquery object holding the link in the list of materials
 * @param href The target of the link in the list of materials
 * @returns The Ally external id of the linked resource
 */
function annotateResource($resource: JQLite, href: HTMLHyperlinkElementUtils): string | null {
    const pageInfo = resolvePageInfo(href);
    if (!pageInfo) {
        return null;
    }

    let externalId = null;
    switch (pageInfo.pageType) {
        case SchoologyPageType.ListOfMaterials:
            // Bit weird for a list to be in the list of materials, just ignore it
            return null;
        case SchoologyPageType.FileProfile:
            externalId = pageInfo.resourceId;
            $resource.attr('data-ally-file-eid', externalId);
            break;
        case SchoologyPageType.Page:
        case SchoologyPageType.Discussion:
        case SchoologyPageType.Assignment:
            externalId = `${pageInfo.richContentType}:${pageInfo.resourceId}`;
            $resource.attr('data-ally-richcontent-eid', externalId);
            break;
    }

    // Re-use the externalId
    $resource.attr('data-ally-content-id', externalId);
    return externalId;
}

/**
 * Annotate the rows as it holds a link to a file
 *
 * @param externalId The ally external ID of the resource
 * @param $itemInfo The item-info object wrapping the link in the list
 * @param annotationOptions The annotation options for the list of materials
 */
function annotateAsFile(externalId: string, $itemInfo: JQLite, annotationOptions: IAnnotationOptions) {
    const $afIconInstance = $(afIconTpl.apply({
        'baseUrl': annotationOptions.baseUrl,
        'contentRef': externalId,
        'i18n': annotationOptions.i18n
    }));
    const $indicator = $(indicatorTpl.apply({externalId, 'alwaysShowForImage': true}));
    const $file = $itemInfo.find('.attachments-file');
    $file.find('.attachments-file-name').append($indicator);

    // Float the AF icon to the right of the title cell. Note that it can't be added to the second cell with the cog
    // as that's not present in the student UI.
    $file.append($afIconInstance);
}

/**
 * Annotate the rows as it holds a link to a piece of rich content (page, discussion, ...)
 *
 * @param externalId The ally external ID of the resource
 * @param $itemInfo The item-info object wrapping the link in the list
 * @param annotationOptions The annotation options for the list of materials
 */
function annotateAsRichContent(externalId: string, $itemInfo: JQLite, annotationOptions: IAnnotationOptions) {
    const $afIconInstance = $(afIconTpl.apply({
        'baseUrl': annotationOptions.baseUrl,
        'contentRef': externalId,
        'i18n': annotationOptions.i18n
    }));

    // Float the AF icon to the right of the title cell. Note that it can't be added to the second cell with the cog
    // as that's not present in the student UI.
    $itemInfo.find('.item-title').append($afIconInstance);
}
