
import * as $ from 'jquery';

import * as NullUtil from 'src/shared/NullUtil';
import {FileReference, IFileReference} from '../client/FileReference';
import {FileReport} from '../client/FileReport';
import {AlternativeTextUtil} from './AlternativeTextUtil';
import {AttrUtil} from './AttrUtil';
import {SeizureGuard} from './SeizureGuard';
import {Ui} from './Ui';

/**
 * Defines how to find a content instance within a rich content item.
 */
export interface ILocator {
    /**
     * Assuming a selector will match 1 or more items, this indicates which index in the array of selected items the
     * content instance can be found at.
     */
    index: number;
    /** A media-specific (e.g., CSS for HTML) selector for matching on the content instance. */
    selector: string;
}

/**
 * A number of [[ContentInstance]]s keyed by their content instance id.
 */
export interface IContentInstances {
    [id: string]: ContentInstance;
}

/**
 * The different types of content instances that are recognized.
 */
export enum ContentInstanceType {
    /** An Aly as a Service hash */
    aaasContent = 'aaasContent',
    /** A "file" content type (e.g., a file upload or attachment). */
    file = 'file',
    /** A "rich content" content type (e.g., content authored in a WYSIWYG editor that links and embeds files). */
    richContent = 'richContent',
    /** An unknown content type */
    unknown = 'unknown',
    /** A "webpage" content type (e.g., a public page in a website integration). */
    webpage = 'webpage'
}

/**
 * Represents an instance of some content on the page. These typically come in the form of elements such as:
 *
 * * Links to download or preview files (`a` tag) such as PDFs or Word documents
 * * An embedded image (`img` tag) that may or may not contain an `alt` attribute
 *
 * # HTML Attributes
 *
 * The following HTML attributes are **required** to be able to build a content instance:
 *
 * * `data-ally-content-id`: A globally unique content id. 2 content instance elements should never exist on the page
 * with the same content id. This id must match the regexp defined by [[ContenInstance.allowedIdRegExp]]
 * * `data-ally-file-eid`: The local identifer of the file that the content instance embeds or links to
 *
 * In addition, the following HTML attributes can be provided to enhance the user's experience with Ally:
 *
 * * `data-ally-file-preview-url`:  A URL that can be used to embed a preview of the file
 *
 * The difference between the `data-ally-content-id` and `data-ally-file-eid` can be seen when considering embedding
 * the same image twice somewhere on the same page:
 *
 * ```html
 * <img data-ally-content-id="1" data-ally-file-eid="_142_1"
 *      data-ally-file-preview-url="https://ultra-dev.int.bbpd.io/file/_142_1/preview"
 *      src="https://ultra-dev.int.bbpd.io/file/_142_1/download" alt="An example of a bohr diagram" />
 * ...
 * <a data-ally-content-id="2" data-ally-file-eid="_142_1"
 *    data-ally-file-preview-url="https://ultra-dev.int.bbpd.io/file/_142_1/preview"
 *    href="https://ultra-dev.int.bbpd.io/file/_142_1/download">Click to download this example</a>
 * ```
 *
 * In this scenario, the accessibility metadata and context for these two instances of the same file are very different,
 * so it is important to be able to reference them individually.
 */
export class ContentInstance {

    public static allowedIdRegExp = /^[a-zA-Z0-9=_\-:\/\+\.;]+$/;

    /**
     * Get a CSS selector to match an element indicating if it represents a content instance of the specified type.
     *
     * @param type  The type to select
     * @return      A selector that, given an element, will match it if it is of the given type
     */
    public static typeSelector(type: ContentInstanceType): string {
        const contentIdAttrName = AttrUtil.getDataAllyAttrName('content-id');
        switch (type) {
            case ContentInstanceType.file:
                return `[${contentIdAttrName}][${AttrUtil.getDataAllyAttrName('file-eid')}]`;
            case ContentInstanceType.richContent:
                return `[${contentIdAttrName}][${AttrUtil.getDataAllyAttrName('richcontent-eid')}]`;
            case ContentInstanceType.webpage:
                return `[${contentIdAttrName}][${AttrUtil.getDataAllyAttrName('webpage')}]`;
            case ContentInstanceType.webpage:
                return `[${contentIdAttrName}][${AttrUtil.getDataAllyAttrName('webpage')}]`;
            case ContentInstanceType.aaasContent:
                return `[${contentIdAttrName}][${AttrUtil.getDataAllyAttrName('aaas-content-hash')}]`;
            case ContentInstanceType.unknown:
                return `[${contentIdAttrName}][${AttrUtil.getDataAllyAttrName('unknown')}]`;
        }
    }

    /**
     * Extract all content instances from the root `$el` element.
     *
     * @param $el   The root from which to search for content instances
     * @return      All content instances from the root
     */
    public static fromRoot($el: JQuery<HTMLElement>): IContentInstances {
        const instances = {} as IContentInstances;
        const fileSelector = ContentInstance.typeSelector(ContentInstanceType.file);
        const richContentSelector = ContentInstance.typeSelector(ContentInstanceType.richContent);
        const webpageSelector = ContentInstance.typeSelector(ContentInstanceType.webpage);
        const aaasHashSelector = ContentInstance.typeSelector(ContentInstanceType.aaasContent);

        // Extract file content instances
        $el.find(fileSelector)
            .toArray()
            .map((el) => new ContentInstance($(el)))
            .forEach((ci) => instances[ci.getId()] = ci);

        // Extract rich content instances
        $el.find(richContentSelector)
            .toArray()
            .map((el) => new ContentInstance($(el)))
            .forEach((ci) => instances[ci.getId()] = ci);

        // Extract Ally as a Service content instances
        $el.find(aaasHashSelector)
            .toArray()
            .map((el) => new ContentInstance($(el)))
            .forEach((ci) => instances[ci.getId()] = ci);

        const webpageEls = $el.find(webpageSelector).toArray();
        if ($el.is(webpageSelector)) {
            webpageEls.push($el[0]);
        }
        webpageEls
            .map((el) => new ContentInstance($(el)))
            .forEach((ci) => instances[ci.getId()] = ci);

        return instances;
    }

    /**
     * Get the parent rich content item for the given content instance, if any.
     *
     * @param contentInstance   The content instance whose containing rich content instance to find
     * @return                  The rich content instance. If there is no parent rich content instance, this will return
     *                          `null`.
     */
    public static findContainingRichContent(contentInstance: ContentInstance): ContentInstance | null {
        const $parent = contentInstance.$el
            .parents(ContentInstance.typeSelector(ContentInstanceType.richContent))
            .first();
        if ($parent.length === 1) {
            return new ContentInstance($parent);
        } else {
            return null;
        }
    }

    /**
     * Find all content instances associated to the given matcher. The matcher is provided in the
     * `data-ally-content-ref` attribute as which content instance it references. If an `*` is provided, it signals that
     * all content instances are matched. This is only applicable for certain directives, and will be indicated in their
     * documentation.
     *
     * @param contentInstances  The content instances on which to match
     * @param match             The matcher string. Could be a `*` or an explicit id
     * @return                  All content instances that were matched
     */
    public static findContentInstances(contentInstances: IContentInstances, match: string): ContentInstance[] {
        if (match === '*') {
            return Object.keys(contentInstances).map((id) => contentInstances[id]);
        } else if (match in contentInstances) {
            return [contentInstances[match]];
        } else {
            return [];
        }
    }

    // The attribute prefix for rich content attributes that Ally has applied a work-around for. For example, if a user
    // has given alt text for an image in the course and there is another instance of that image elsewhere without an
    // alt attribute, Ally can apply a "work around" by updating the `alt` attribute directly, and storing the original
    // value in this associated "work around" attribute
    private static allyWorkAroundAttrPrefix = AttrUtil.getDataAllyAttrName('work-around');

    /** The element associated to this content instance */
    public $el: JQuery<HTMLElement>;

    /** The [[ContentInstanceType]] of this content instance */
    public type: ContentInstanceType;

    constructor($el: JQuery<HTMLElement>) {
        this.$el = $el;

        // Resolve the content instance type of this element using the selectors scheme
        if ($el.is(ContentInstance.typeSelector(ContentInstanceType.file))) {
            this.type = ContentInstanceType.file;
        } else if ($el.is(ContentInstance.typeSelector(ContentInstanceType.richContent))) {
            this.type = ContentInstanceType.richContent;
        } else if ($el.is(ContentInstance.typeSelector(ContentInstanceType.webpage))) {
            this.type = ContentInstanceType.webpage;
        } else if ($el.is(ContentInstance.typeSelector(ContentInstanceType.aaasContent))) {
            this.type = ContentInstanceType.aaasContent;
        } else {
            this.type = ContentInstanceType.unknown;
        }

        // Throw an error if the id does not match the regex
        if (!ContentInstance.allowedIdRegExp.test(this.getId())) {
            throw new Error(`Content Instance ids must match ${ContentInstance.allowedIdRegExp.toString()}`);
        }
    }

    /** Get the globally unique `data-ally-content-id` value */
    public getId(): string {
        return this.$el.attr(AttrUtil.getDataAllyAttrName('content-id')) as string;
    }

    /** Get the local id of the file this content instance represents, if applicable */
    public getFileEid(): string | null {
        const value = this.$el.attr(AttrUtil.getDataAllyAttrName('file-eid'));
        return (typeof value === 'string') ? value : null;
    }

    /** Get the local id of the rich content this content instance represents, if applicable */
    public getRichContentEid(): string | null {
        const value = this.$el.attr(AttrUtil.getDataAllyAttrName('richcontent-eid'));
        return (typeof value === 'string') ? value : null;
    }

    /** Get the file preview url for this file, if available */
    public getFilePreviewUrl(): string | null {
        const value = this.$el.attr(AttrUtil.getDataAllyAttrName('file-preview-url'));
        return (typeof value === 'string') ? value : null;
    }

    /** Get the Ally as a Service content hash this content instance represents, if applicable */
    public getAaasContentHash(): string | null {
        const value = this.$el.attr(AttrUtil.getDataAllyAttrName('aaas-content-hash'));
        return (typeof value === 'string') ? value : null;
    }

    /** Get the signed download URL for an Ally as a Service content hash, if applicable */
    public getAaasDownloadUrl(): string | null {
        const value = this.$el.attr(AttrUtil.getDataAllyAttrName('download-url'));
        return (typeof value === 'string') ? value : null;
    }

    /**
     * Create a file reference for this content instance, including embed info relevant for Ally, if available. If this
     * returns `null`, it's most likely that the content instance was improperly marked up.
     */
    public getFileReference(): IFileReference | null {
        const fileEid = this.getFileEid();
        const richContentEid = this.getRichContentEid();
        const aaasContentHash = this.getAaasContentHash();
        if (NullUtil.hasValue(fileEid)) {
            const workAroundValues = this.getAllyWorkAroundSourceValues();
            return FileReference.fromElement(this.$el, fileEid, workAroundValues);
        } else if (NullUtil.hasValue(richContentEid)) {
            return FileReference.fromData({'id': richContentEid, 'uploadType': 'RichContent'});
        } else if (NullUtil.hasValue(aaasContentHash)) {
            return FileReference.fromData({'id': aaasContentHash, 'uploadType': 'File'});
        } else {
            return null;
        }
    }

    /**
     * If this instance is contained inside rich content, this will define how to locate it. If this content instance
     * is not embedded in rich content, then this will return `null`.
     */
    public getRichContentLocator(ui: Ui): ILocator | null {
        const richContentInstance = ContentInstance.findContainingRichContent(this);
        const fileReference = this.getFileReference();
        if (richContentInstance !== null && fileReference !== null && fileReference.isEmbedded()) {
            const tagName = this.$el.prop('tagName').toLowerCase();
            const selector = NullUtil.orElse(
                this.$el.attr(AttrUtil.getDataAllyAttrName('richcontent-selector')),
                NullUtil.orElse(
                    richContentInstance.$el.attr(AttrUtil.getDataAllyAttrName(`richcontent-selector-${tagName}`)),
                    this.getDefaultRichContentSelector()));
            const rawIndex = NullUtil.orElse<string | number | null>(
                this.$el.attr(AttrUtil.getDataAllyAttrName('richcontent-index')),
                this.getDefaultRichContentIndex(ui, richContentInstance, selector));
            const index = this.coerceIndex(rawIndex);
            if (index !== null) {
                return {index, selector};
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    /**
     * Apply any "work arounds" for accessibility metadata that Ally has available but might not be applied in a page.
     * For example, if a user has previously provided an alt text for an image to Ally, however we encounter that image
     * in a page without any alt text specified, we can apply that alt text in its place. This is considered applying a
     * "work around" to the content.
     *
     * @param fileReport    The file report, containing any potential metadata such as alt text, decorative flags, or
     *                      library reference information that has been provided by a content author
     * @return              If any work arounds were available, relevant attributes will have been changed on the
     *                      element and `data-ally-work-around-`-prefixed attribute variants will be added to keep track
     *                      of the original values of those attributes in the DOM
     */
    public applyAllyWorkArounds(ui: Ui, fileReport: FileReport | null): void {
        if (fileReport) {
            if (this.$el[0].tagName === 'IMG') {
                // If the image's source alt text is not meaningful, we want to replace it with what we have on the
                // server if it is meaningful
                const sourceAltValue = this.getSourceAttrValue('alt');
                if (!AlternativeTextUtil.isMeaningful(sourceAltValue, fileReport.name)) {
                    const allyAltValue = AlternativeTextUtil.getFromFileReport(fileReport);
                    if (AlternativeTextUtil.isMeaningful(allyAltValue, fileReport.name)) {
                        this.setAllyWorkAroundValue('alt', allyAltValue);
                    }
                }

                if (fileReport.seizureRisk === true &&
                    !this.$el.is(`[${AttrUtil.getDataAllyAttrName('seizureguard-created')}]`)) {
                    // If this file is a seizure risk and we haven't added a seizure guard for it yet, add one
                    this.$el.attr(AttrUtil.getDataAllyAttrName('seizureguard-created'), '');
                    SeizureGuard.create(ui, this);
                } else if (fileReport.seizureRisk !== true &&
                    this.$el.is(`[${AttrUtil.getDataAllyAttrName('seizureguard-created')}]`)) {
                    // If the file is not a seizure risk and we had previously put in a seizure guard, destroy that
                    // seizure guard
                    SeizureGuard.destroy(ui, this);
                }
            }
        }
    }

    /**
     * Apply a "work around" update to an element attribute in user content. This implies both an update to the standard
     * attribute described by `attrName`, as well as a custom "work around" attribute that records what the source/
     * original value was of this attribute. If a work around is applied multiple times, only the first "source value"
     * is kept.
     *
     * @param attrName  The name of the standard attribute (e.g., "alt")
     * @param attrValue The new value of the standard attribute. If unspecified, implies that the attribute should be
     *                  removed
     */
    public setAllyWorkAroundValue(attrName: string, attrValue: string | null): void {
        const allyWorkAroundAttrName = `${AttrUtil.getDataAllyAttrName('work-around')}-${attrName}`;
        const previousAttrValue = NullUtil.orElse<string>(JSON.stringify(this.$el.attr(attrName)), 'null');
        if (attrValue === null || attrValue === undefined) {
            this.$el.removeAttr(attrName);
        } else {
            this.$el.attr(attrName, attrValue);
        }

        // Only set the workaround metadata if it wasn't set already. This ensures that if we set workaround values
        // multiple times, we never end up losing track of what the very first source value was
        if (!this.$el.is(`[${allyWorkAroundAttrName}]`)) {
            this.$el.attr(allyWorkAroundAttrName, previousAttrValue);
        }
    }

    /**
     * Get the source value that a particular attribute had on this content instance, before Ally applied any
     * accessibility improvements. For example, if this is an image and the alt attribute was originally a file name
     * (i.e., not meaningful), so Ally put an alt text that was previously provided by the user, this function will
     * always provide the file name value for attribute `alt`.
     *
     * @param attrName  The name of the attribute whose source value to get
     * @return          The original value of this attribute, before any kind of work arounds were applied
     */
    public getSourceAttrValue(attrName: string): string | null {
        const allyWorkAroundAttrName = `${AttrUtil.getDataAllyAttrName('work-around')}-${attrName}`;
        if (this.$el.is(`[${allyWorkAroundAttrName}]`)) {
            const allyWorkAroundAttrValueRaw = this.$el.attr(allyWorkAroundAttrName) as string;
            return JSON.parse(allyWorkAroundAttrValueRaw) as string | null;
        } else if (this.$el.is(`[${attrName}]`)) {
            return this.$el.attr(attrName) as string;
        } else {
            return null;
        }
    }

    /**
     * Get the source values of all the Ally work arounds that have been applied to this element.
     *
     * @return All original attribute values that were overridden previously for this content instance
     */
    public getAllyWorkAroundSourceValues(): {[attrName: string]: string} {
        const allyWorkArounds: {[attrName: string]: string} = {};
        if (this.$el.length > 0) {
            const el = this.$el[0];
            $.each(el.attributes, (i, attr) => {
                if (attr.name.indexOf(ContentInstance.allyWorkAroundAttrPrefix) === 0) {
                    const attrName = attr.name.substring(ContentInstance.allyWorkAroundAttrPrefix.length + 1);
                    allyWorkArounds[attrName] = this.getSourceAttrValue(attrName) as string;
                }
            });
        }
        return allyWorkArounds;
    }

    /** Get the default rich content selector for this content instance. Probably just the tag name. */
    private getDefaultRichContentSelector(): string {
        return this.$el.prop('tagName').toLowerCase();
    }

    /** Get the default rich content index for this instance based on the parent content and selector. */
    private getDefaultRichContentIndex(ui: Ui, richContentInstance: ContentInstance, selector: string): number | null {
        let $selected = richContentInstance.$el.find(selector);
        if (this.$el.prop('tagName').toLowerCase() === selector.toLowerCase()) {
            // When a simple default selector is used, filter out any resources being served from the Ally URL as that
            // is likely an icon or something injected by Ally. This makes the automatic index resolution more robust
            $selected = $selected.not(`[src^="${ui.client.config.baseUrl}"]`);
        }

        const index = $selected.index(this.$el);
        if (index === -1) {
            return null;
        } else {
            return index;
        }
    }

    /**
     * Resolve the [[ILocator.index]] value from either the local attribute name (string) or the resolved default index
     * (number).
     *
     * @param n     The numeric value that was resolved either from a raw attribute or from the index in an array
     * @return      The [[ILocator.index]] value that should be used
     */
    private coerceIndex(n: string | number | null): number | null {
        let index: number | null = null;
        if (typeof n === 'number') {
            index = n;
        } else if (typeof n === 'string') {
            index = parseInt(n, 10);
        }

        // Never return [[NaN]]
        if (index === null) {
            return null;
        } else if (isNaN(index)) {
            return null;
        } else {
            return index;
        }
    }
}
