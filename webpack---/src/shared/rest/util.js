import {
    StringUtil
} from '../stringutil';

/**
 * Determine if the specified alt text is considered "meaningful", considering lots of "default values" that tend to
 * be added from LMSes that get ignored. This checks for a number of things:
 *
 *  1. That the alt text is not empty (decorative checks should happen separately...)
 *  2. The alt text is not "blank" (e.g., all white space)
 *  3. The alt text is not just a URL or a file name
 *  4. The alt text is not equal to the specified file name (i.e., the exact name of the file itself) or its base
 *     name
 *
 * @param  {String}     altText     The alt text to check
 * @param  {String}     [fileName]  The name of the file to which the alt text is attributed to
 * @return {Boolean}                Whether or not the alt text is considered meaningful
 */
export function isAltTextMeaningful(altText, fileName) {
    // If the alt text is unspecified or blank, it is not meaningful
    var isSpecified = isTextSpecified(altText);

    // If the alt text is a URL or a file name, it is not meaningful
    var isAFileName = isTextAFileName(altText);

    // If the URL equals the actual file name or the file base name exactly, it is not meaningful
    var isTheFileName = isTextTheFileName(altText, fileName);

    return isSpecified && !isAFileName && !isTheFileName;
}

/**
 * Determine if text is non-null and nonempty.
 *
 * @param  {String}     text     The text to check
 * @return {Boolean}             Whether or not the text is specified.
 */
export function isTextSpecified(text) {
    if (text && text.trim()) {
        return true;
    } else {
        return false;
    }
}

/**
 * Determine if text is a valid file name.
 *
 * @param  {String}     text     The text to check
 * @return {Boolean}             Whether or not the text is a valid URL or file name
 */
export function isTextAFileName(text) {
    if (!text) {
        return false;
    } else {
        var normalized = text.trim().toLowerCase();
        return StringUtil.isUrlToFile(normalized) || StringUtil.isFileName(normalized);
    }
}

/**
 * Determine if text is a variant of the supplied file name.
 *
 * @param  {String}     text     The text to check
 * @param  {String}     fileName The file name to check against.
 * @return {Boolean}             Whether or not the text is a variant of the file name
 */
export function isTextTheFileName(text, fileName) {
    if (!text || !fileName) {
        return false;
    } else {
        var textNormalized = StringUtil.normalizeFileName(text);
        var fileNameNormalized = StringUtil.normalizeFileName(fileName);
        var fileBaseNameNormalized = StringUtil.normalizeFileName(
            StringUtil.baseName(StringUtil.sanitize(fileName))
        ).trim();

        return fileNameNormalized === textNormalized || fileBaseNameNormalized === textNormalized;
    }
}

/**
 * Returns score rounded to 1 decimal point.
 *
 * @returns {number} Score rounded to 1 decimal point
 */
export function getRoundedScore(score) {
    score = score || 0;
    return Math.round(score * 1000) / 10;
}

/**
 * Returns score rounded to 1 decimal point or null.
 * null is returned in order to not render zero values.
 * null is returned instead of zero.
 * @returns {(number|null)} Score rounded to 1 decimal point or null
 */
export function getHighChartFriendlyScore(score) {
    const roundedScore = getRoundedScore(score);
    return roundedScore !== 0 ? roundedScore : null;
}