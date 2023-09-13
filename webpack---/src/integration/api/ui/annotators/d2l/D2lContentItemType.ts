
export enum D2lContentItemType {

    /**
     * An item that is being shown in the individual content view page in D2L. This page will contain an embedded
     * version of the item, as well as a button to download it. The button to download it represents the base "content
     * item" and an alternative formats item is added as well. This button will have an `id` that looks like:
     * `d2l_content_<course id>_<file eid>`.
     */
    IndividualContentViewItem,

    /** An image that's displayed on a content view page */
    ContentViewImage,

    /**
     * A plain D2l table of content topic link might look as follows:
     *
     * ```
     * <div class="d2l-inline">
     *   <a class="d2l-link" id="d2l_content_6609_97662" href="/d2l/le/content/6609/viewContent/97662/View"
     *     title="'1. All wrong_untagged' - PDF document">
     *       1. All wrong_untagged
     *   </a>
     *   <div class="d2l-container-icon">
     *     <div class="d2l-textblock d2l-body-small">PDF document</div>
     *   </div>
     * </div>
     * ```
     *
     * The content item itself refers to the `<a>` element whose `id` contains the course id and file eid of the item.
     */
    TableOfContentsTopicLink,

    /**
     * A top level module in the table of contents of a course
     */
    TableOfContentsModule,

    /**
     * A child module in the table of contents of a course. This is typically encapsulated in a top-level module but can
     * have its own description.
     *
     * Further child modules are typically not dispayed
     */
    TableOfContentsChildModule,

    /**
     * An item in a new content experience view. This is D2L's next iteration of a course its table of contents.
     *
     * ```
     * <div class="content-panel" id="d2l_content_6613_98355" data-attr-activity-type="file">
     *   <div id="content-header">
     *     <div class="info-container">Name of file goes here</div>
     *     <div class="header-button-tray">
     *       AF icon should go here
     *       DIAL should go here
     *       <button class="add-btn primary button" title="Add" aria-label="Add">Add</button>
     *       ...
     *     </div>
     *   </div>
     *   <div class="content-block">
     *       <!-- PDF/Images are displayed here -->
     *   </div
     * </div>
     * ```
     *
     * The content item itself refers to the `content-panel` div.
     */
    NewContentExperienceView
}
