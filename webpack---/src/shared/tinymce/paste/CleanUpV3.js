import * as $ from 'jquery';

import * as EditorLocator from 'src/shared/tinymce/EditorLocator';

/**
 * Remove HTML elements that match the given CSS selector when a rich paste takes place in a TinyMCE v3 editor
 * that's been configured with a Tiny MCE paste plugin.
 *
 * This has been verified against TinyMCE v3.5.10 and v3.5.11 and the following paste plugins:
 *   -  Paste (ships with TinyMCE)             --  https://www.tiny.cloud/docs-3x/reference/plugins/Plugin3x@paste/
 *   -  PowerPaste 1.0.1.22 (Premium plugin)   --  https://www.tiny.cloud/docs/plugins/powerpaste/
 *
 * @param {String|Regex}    editorId           The id of the TinyMCE editor to bind to. See `EditorLocator` for more
 *                                             info
 * @param {String}          removalSelector    The CSS selector that matches those elements that should be filtered
 *                                             out of the pasted rich text.
 * @param {String|null}     unwrapSelector     The CSS selector that matches those elements that should be unwrapped
 */
export function fix(editorId, removalSelector, unwrapSelector) {
    EditorLocator.locate(editorId).then(function(editor) {
        // The paste plugins will invoke a `paste_preprocess` function that's declared in the editor's settings.
        // When this is not set by the LMS, it's safe to add this setting. Although unlikely that the LMS would ever
        // set their own callback or upgrade the TinyMCE version, future-proof this by not overriding the setting if
        // it was already specified.
        if (editor.settings && !editor.settings.paste_preprocess) {
            editor.settings.paste_preprocess = function(editor, data) {
                if (data && data.content) {
                    var $content = $('<div />').append(data.content);

                    // Remove any injected Ally HTML logic
                    $content.find(removalSelector).remove();

                    // If specified, unwrap any content. This is useful for Moodle as the Ally filter will wrap
                    // links to files in a span element.
                    if (unwrapSelector) {
                        $content.find(unwrapSelector).unwrap();
                    }

                    data.content = $content.html();
                }
            };
        }
    });
}