
import * as $ from 'jquery';

import {TableHeaderOrientation} from 'projects/common/guidance/src/components/fix-table-headers/fix-table-headers.component';
import {isDecorative} from 'src/shared/preprocessor';
import {findNodeByXpath, replaceTagName} from '../DomUtil';
import * as NullUtil from '../NullUtil';

/** Ultra file/image attachment metadata */
interface IUltraAttachment {
    'alternativeText': string;
    'displayName': string;
    'fileName': string;
    'isDecorative': boolean;
}

export interface IBaseFeedback {
    feedback: any;
    explanationData: any;
}

export function transformHtmlFragmentExplanationData(
    document: Document,
    rawExplanationData: IBaseFeedback['explanationData'],
    html: string,
    preprocessType: string
): IBaseFeedback['explanationData'] {
    // It's probably best to fix explanationData here because the way we have to convert from html fragment xpath to
    // internal wysiwyg xpath is going to be dependent on which editor is being used
    const fixedExplanationData = {'type': rawExplanationData.type} as any;

    // For some rules, we need to scrape additional context out about the rule to help guide decisions on how they
    // could be automatically fixed. In some cases we switch from the simple "xpaths" model that just has an array
    // of xpath strings to a "violations" model that contains the xpath string with more metadata context about the
    // issue. This means that other areas that handle this data (such as instructor feedback), don't have to parse
    // and analyze the HTML to come up with similar conclusions about how to fix
    Object.keys(rawExplanationData)
        .map((ruleName) => [ruleName, rawExplanationData[ruleName]])
        .filter(([, rawRuleExplanationData]) => typeof rawRuleExplanationData === 'object')
        .forEach(([ruleName, rawRuleExplanationData]) => {
            const fixedRuleExplanationData: Record<string, any> & { xpaths?: string[] } =
                fixedExplanationData[ruleName] = {...rawRuleExplanationData};

            // Apply rule-specific transforms
            const { xpaths }: { xpaths?: string[] } = fixedRuleExplanationData;
            if (NullUtil.hasValue(xpaths) && ruleName === 'HtmlHeadingOrder') {
                // We're going to replace xpaths with violations that have more metadata about the issue
                delete fixedRuleExplanationData.xpaths;

                const $content = $('<div></div>').html(html);
                const headingsWithIndex = $content.find('h1,h2,h3,h4,h5,h6').toArray().map((el, i) => ({
                    el,
                    i,
                    'level': parseInt(el.tagName.slice(1), 10),
                }));

                fixedRuleExplanationData.headings = headingsWithIndex.map((hwi) => ({'level': hwi.level}));
                fixedRuleExplanationData.violations = xpaths.map((xpath) => {
                    const headingEl = findNodeByXpath(document, $content[0], xpath);
                    const heading = headingsWithIndex.find((hwi) => hwi.el === headingEl);
                    const headingIndex = NullUtil.orElse<{i: number}>(heading, {'i': -1}).i;
                    return {headingIndex, xpath};
                });
            } else if (
                NullUtil.hasValue(xpaths) &&
                    ['HtmlImageAlt', 'HtmlImageRedundantAlt'].indexOf(ruleName) !== -1
            ) {
                // We're going to replace xpaths with violations that have more metadata about the issue
                delete fixedRuleExplanationData.xpaths;

                const $content = $('<div></div>').html(html);
                fixedRuleExplanationData.violations = xpaths.map((xpath: string) => {
                    const img = findNodeByXpath(document, $content[0], xpath);
                    const $img = NullUtil.hasValue(img) ? $(img) : null;
                    const decorative = isDecorative(img, preprocessType);
                    const description = decorative
                        ? null
                        : NullUtil.hasValue($img)
                            ? NullUtil.orElse($img.attr('alt'), null)
                            : null;
                    const metadata = {decorative, description};
                    return {metadata, xpath};
                });
            } else if (NullUtil.hasValue(xpaths) && ruleName === 'HtmlObjectAlt') {
                // TODO: This transform is actually TinyMCE-specific. So would need to be split out into the editor
                // controller

                // TinyMCE transforms a raw <object> tag into an <img>, so in order to properly show preview
                // highlights we have to convert the xpath from the raw html to the wysiwyg representation
                fixedRuleExplanationData.xpaths = xpaths.map((xpath) => {
                    const split = xpath.split('/');
                    const prefix = split.slice(0, -1).join('/');
                    const last = split.pop();
                    if (NullUtil.hasValue(last) && last.startsWith('object')) {
                        return `${prefix}/img[contains(@class, 'mce-object-object')]`;
                    } else if (NullUtil.hasValue(last) && last.startsWith('*[@id=')) {
                        return `${prefix}/${last.replace('@id=', '@data-mce-p-id=')}`;
                    } else {
                        return `${prefix}/${last}`;
                    }
                });
            } else {
                fixedRuleExplanationData.xpaths = xpaths;
            }
        });

    return fixedExplanationData;
}

export function applyWysiwygFix(ruleName: string, locators: string[], fixOptions: any, content: HTMLElement): boolean {
    if (ruleName === 'HtmlColorContrast') {
        locators
            .map((xpath) => findNodeByXpath(document, content, xpath))
            .filter((el): el is HTMLElement => NullUtil.hasValue(el))
            .forEach((node) => {
                const $node = $(node);

                // Set the root element color
                $node.css('color', fixOptions.color);

                // Set the color of all explicitly-colored descendants
                $node.find('*').each((_, el) => {
                    const $el = $(el);
                    if ($el.css('color') !== '') {
                        $el.css('color', fixOptions.color);
                    }
                });
            });
    } else if (ruleName === 'HtmlTdHasHeader') {
        locators
            .map((xpath) => findNodeByXpath(document, content, xpath))
            .filter((el): el is HTMLElement => NullUtil.hasValue(el))
            .forEach((table) => {
                const $table = $(table);
                NullUtil.orElse(fixOptions.orientation, [])
                    .map((o: TableHeaderOrientation) =>
                        o === 'column' ? 'tr > td:first-child' : 'tr:first-child > td')
                    .forEach((selector: string) => {
                        $table.find(selector)
                            .toArray()
                            // Filter out nested table tr's
                            .filter((el) => $(el).closest('table').is($table))
                            .forEach((el) => replaceTagName($, el, 'th'));
                    });
            });
    } else if (ruleName === 'HtmlEmptyHeading') {
        locators
            .map((xpath) => findNodeByXpath(document, content, xpath))
            .filter((el): el is HTMLElement => NullUtil.hasValue(el))
            .forEach((el) => {
                if (fixOptions.remove) {
                    $(el).remove();
                } else if (NullUtil.hasValue(fixOptions.replace)) {
                    $(el).replaceWith(document.createElement(fixOptions.replace));
                }
            });
    } else if (ruleName === 'HtmlHeadingOrder') {
        locators
            .map((xpath) => findNodeByXpath(document, content, xpath))
            .filter((el): el is HTMLElement => NullUtil.hasValue(el))
            .forEach((heading) => replaceTagName($, heading, fixOptions.tag));
    } else if (['HtmlImageAlt', 'HtmlImageRedundantAlt'].indexOf(ruleName) !== -1) {
        locators
            .map((xpath) => findNodeByXpath(document, content, xpath))
            .filter((el): el is HTMLElement => NullUtil.hasValue(el))
            .forEach((el) => {
                if ('save' in fixOptions) {
                    $(el).attr('alt', fixOptions.save);
                    ultraAttachment(el, {'alternativeText': fixOptions.save});
                } else if (fixOptions.decorative) {
                    $(el).attr('alt', '');

                    // In addition to setting alt="", also set role="presentation". This has multiple benefits:
                    // - It indicates an explicit choice of marking the image as decorative
                    // - In Learn Original, we should mimic the backend and manipulate the fragment of the src
                    //   attribute. This is fairly brittle though. By adding role="presentation", we can bypass that
                    // - Moodle's Atto editor will pick up on it and renders the "Marked as decorative" checkbox
                    $(el).attr('role', 'presentation');
                } else if (fixOptions.remove) {
                    $(el).removeAttr('alt');
                    $(el).removeAttr('role');
                    ultraAttachment(el, {'alternativeText': '', 'isDecorative': false});
                }
            });
    } else if (ruleName === 'HtmlLinkName') {
        locators
            .map((xpath) => findNodeByXpath(document, content, xpath))
            .filter((el): el is HTMLElement => NullUtil.hasValue(el))
            .forEach((el) => {
                if (fixOptions.remove) {
                    replaceTagName($, el, 'span');
                } else {
                    const toAppend = $('<span></span>').text(fixOptions.text);
                    $(el).append(toAppend);
                }
            });
    } else {
        return false;
    }

    return true;
}

export const styleAttributes = [
    'font-size', 'font-weight', 'font-family', 'font-style', 'text-decoration', 'text-transform'
];

/**
 * Parse CSS styles relevant for block styles from element
 *
 * @param element Element whose styles will be used
 */
export function parseBlockStyles(element: JQLite) {
    const style: { [_: string]: string } = {};

    styleAttributes.forEach((attr: any) => {
        const value = element.css(attr);
        if (NullUtil.hasValue(value)) {
            style[attr] = value;
        }
    });

    return style;
}

/** Given an HTML tag, parse out the heading level. If the tag is not a heading, it will return NaN */
export function parseBlockLevel(tag: string): number {
    return Number.parseInt($.trim(tag).substring(1), 10);
}

/**
 * The default selection for visual highlighting of an element can result in a html element that is not valid to be
 * shown on its own (such as a single <th></th> element). When this happens, move up the tree until we get to a valid
 * selection.
 * @param element the element that is being highlighted in the IF.
 */
export function getDisplayableElement(element: HTMLElement | undefined): string | undefined {
    let elementToReturn = element;
    const excludedTags = ['th', 'tr', 'tbody'];
    while (NullUtil.hasValue(elementToReturn) &&
            excludedTags.includes(elementToReturn?.tagName.toLowerCase()) &&
            NullUtil.hasValue(elementToReturn.parentElement) ) {
        elementToReturn = elementToReturn.parentElement;
    }
    return elementToReturn?.outerHTML;
}

/**
 * Given an element, lookup ultra attachment data and update it with the given metadata
 *
 * @param el Image element for which to update the ultra attachment data
 * @param metadata Metadata to update
 */
export function ultraAttachment(el: HTMLElement, metadata: Partial<IUltraAttachment>) {
    const attachment = $(el).parents('[data-bbtype="attachment"][data-bbfile]');
    NullUtil.whenHasValue(attachment.attr('data-bbfile'), (bbFile) =>
        attachment.attr('data-bbfile', JSON.stringify({
            ...JSON.parse(bbFile),
            ...metadata
        }))
    );
}
