import * as $ from 'jquery';

/**
 * Represents a reference to a file on the DOM. The reference has 2 potential contexts:
 *
 *  * Embedded: The content is embedded in the page, such as a `<img />` element
 *  * Contextless: The content is something like a link or a stand-alone representation
 *
 * @param  {String}     fileId  The id of the file item
 * @param  {Object}     [embed] The embed descriptor for the reference. If this file reference is not embedded, this
 *                              should be falsey
 * @param  {String}     [embed.altText] The alternative text for the embedded media. Only really applicable for images
 */
export function FileReference(fileId, embed, uploadType) {
    this.fileId = fileId.toString();
    this.embed = embed;
    this.uploadType = uploadType || 'File';
}

/**
 * Create a string identity for the contents of this file reference. Useful to be able to "cache" file score
 * information by discriminating a file reference based on the attributes of the reference that contribute to its
 * score.
 *
 * Some sample id representations are:
 *
 *  * `123456`                                  - Represents a non-embedded file link
 *  * `123456:null`                             - Represents an embedded file that has no alt text
 *  * `123456:embed:"This is some alt text"`    - Represents an embedded file that has alt text
 */
FileReference.prototype.id = function() {
    // A standard "stand alone" reference will just be the file id
    var parts = [this.fileId];
    if (this.embed) {
        parts.push('embed');

        var altText = this.embed.altText;
        if ($.type(altText) === 'string') {
            parts.push(JSON.stringify(altText));
        } else {
            parts.push('null');
        }
    }

    return parts.join(':');
};

/**
 * Extract just the raw data from the file reference. This data is representative of how the server wants data
 * POSTed when requesting file accessibility information.
 */
FileReference.prototype.data = function() {
    return {
        'id': this.fileId,
        'embed': this.embed,
        'uploadType': this.uploadType
    };
};

/** Determine if the file reference represents embedded media */
FileReference.prototype.isEmbedded = function() {
    return (this.embed !== null && this.embed !== undefined);
};

/**
 * Create an embedded file reference from the specified file id and alt text
 *
 * @param  {String}         fileId      The id of the file
 * @param  {String}         [altText]   The alt text, if specified
 * @return {FileReference}              The embedded file reference
 */
FileReference.fromAltText = function(fileId, altText) {
    return new FileReference(fileId, {
        'altText': altText
    });
};

/**
 * Create a file reference with uploadType: File from the specified element and file id.
 *
 * @param  {jQuery}         $el                     The jQuery element from which to build the reference
 * @param  {String}         fileId                  The id of the file this element represents
 * @param  {Object}         [attributeOverrides]    A set of attribute overrides to use in lieu of any access to
 *                                                  attributes on the element itself. Useful for when modifications
 *                                                  have been made to the `$el` to improve accessibility, however we
 *                                                  want to score the element based on its "source" value
 * @return {FileReference}                          The file reference from the element
 */
FileReference.fromElement = function($el, fileId, attributeOverrides) {
    attributeOverrides = attributeOverrides || {};

    var tagName = $el.prop('tagName').toLowerCase();
    if (tagName === 'img') {
        // We are dealing with an embedded image. Find the source alt, looking first into the attribute overrides
        var alt = $el.attr('alt');
        if (attributeOverrides.hasOwnProperty('alt')) {
            alt = attributeOverrides.alt;
        }

        // An image tag is by definition embedded, so directly create an embedded file reference using the alt text
        // we extracted from the tag
        return FileReference.fromAltText(fileId, alt);
        //} else if (tagName === 'a' || tagName === 'button') {
    } else {
        // We are dealing with a link, button, heading, ... to a file, just create a stand-alone file reference for it
        return new FileReference(fileId);
    }
};

/**
 * Create a file reference from raw data. This is bijective to `FileReference.data()`
 *
 * @param  {Object}         data            The raw data
 * @param  {String}         data.id         The file id
 * @param  {Object}         [data.embed]    The embed information, if applicable
 * @return {FileReference}                  The file reference represented by the data
 */
FileReference.fromData = function(data) {
    return new FileReference(data.id, data.embed, data.uploadType);
};