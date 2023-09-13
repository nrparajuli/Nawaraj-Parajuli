import * as $ from 'jquery';

/**
 * Find the TinyMCE editor whose id matches the provided editor id matcher. The matcher can be a variety of types
 * that have an implicit matching strategy:
 *
 *  * String - exact match
 *  * RegExp - matches the regular expression
 *
 * This works with both TinyMCE v3 and v4
 *
 * @param  {String|RegExp}  editorId     The editor id matcher
 * @return {Promise<Editor>}             A promise that completes with the TinyMCE editor that matched the given
 *                                       editorId matcher
 */
export function locate(editorId) {
    // Wait for a new instance of the editor to become available. We could do better than this, there is an event
    // that we can bind to on the global `tinymce` variable that tells us when an editor is added. However, that
    // global variable isn't necessarily available right away either when the page loads. Since we have to poll for
    // that, this is just one general solution to both problems
    return waitFor(function() {
        return findEditor(editorId);
    });
}

/**
 * Get a promise that resolves when the given predicate function `f` returns truthy. The result of the Promise will
 * be the final truthy result of `f`.
 *
 * @param  {Function}           f               The predicate function to wait for to be truthy
 * @param  {Number}             [delayMillis]   How long to delay in milliseconds between polling cycles. Defaults to 1 second
 * @param  {jQuery.Deferred}    [deferred]      The deferred to resolve when complete
 * @return {Promise<T>}                         The result of the final truthy `f` invocation
 */
function waitFor(f, delayMillis, deferred) {
    delayMillis = delayMillis || 1000;
    deferred = deferred || $.Deferred();

    var result = f();
    if (result) {
        // It's truthy, resolve the promise
        deferred.resolve(result);
    } else {
        // It's falsey, delay and then retry
        setTimeout(waitFor, delayMillis, f, delayMillis, deferred);
    }

    return deferred;
}

/**
 * Find the TinyMCE editor whose id matches the provided editor id matcher. The matcher can be a variety of types
 * that have an implicit matching strategy:
 *
 *  * String - exact match
 *  * RegExp - matches the regular expression
 *
 * @param  {String|RegExp}  editorIdMatcher     The editor id matcher
 * @return {Editor}                             The TinyMCE editor that matched, if any
 */
function findEditor(editorIdMatcher) {
    var editor = null;
    if (window.tinymce) {
        var p = resolveEditorPredicate(editorIdMatcher);
        $.each(window.tinymce.editors, function(i, ed) {
            if (!editor && p(ed.id)) {
                editor = ed;
            }
        });
    }
    return editor;
}

/**
 * Create a predicate that matches a string editor id, based on the type of the specified editor id matcher.
 *
 * @param  {String|RegExp}  editorIdMatcher     The matcher for which to create the predicate function
 * @return {Function}                           A predicate function that indicates if an editor id matches the matcher
 */
function resolveEditorPredicate(editorIdMatcher) {
    if ($.type(editorIdMatcher) === 'string') {
        return function(editorId) {
            return (editorIdMatcher === editorId);
        };
    } else if ($.type(editorIdMatcher) === 'regexp') {
        return function(editorId) {
            return editorIdMatcher.test(editorId);
        };
    } else {
        throw new Error('Unsupported editor id matcher type');
    }
}