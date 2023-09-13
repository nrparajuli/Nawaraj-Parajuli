import * as $ from 'jquery';

import * as IframeMessagingUtil from 'src/integration/iframeMessagingUtil';
import {
    InstructorFeedbackMessages
} from 'src/integration/InstructorFeedbackMessages';

// A message that should be sent once instructor feedback has finished launching
var queuedMessage = null;

// Callbacks that can get invoked during or after the instructor feedback.
// See `launchInstructorFeedback` for further documentation
var instructorFeedbackCallbacks = {
    'closed': function() {},
    'deleted': function() {},
    'eventTracker': function() {},
    'updated': function() {},
    'replacedFile': function() {}
};

/**
 * A pointer to the iframe element. This is cached rather than resolved as in some LMSes it's necessary to add the
 * iframe in a shadow DOM. When that happens, jQuery won't be able to resolve the iframe element again.
 */
let $instructorFeedbackIframe = $('<div />');
/** A scroll offset of windows used for absolute positioning in nested iframes in firefox 96+ */
let instructorFeedbackIframeOffset = 0;
export const Firefox96Plus = isFirefox(96, 0);

/**
 * Launch the instructor feedback UI
 *
 * @param  {String}     baseUrl                                 The full base URL of the ally server (e.g., https://prod.ally.ac)
 * @param  {String}     lmsUrl                                  The full base URL of the LMS server (e.g., https://lms-address.com)
 * @param  {String}     platformName                            The name of the platform (e.g. learn, canvas, d2l, Wcm, web, ...)
 * @param  {String}     [platformUi]                            The UI of the platform from which the launch is taking place, if any
 * @param  {Number}     clientId                                The id of the client
 * @param  {String}     courseId                                The id of the course to which the file belongs
 * @param  {Object}     fileReference                           The file reference for which we're launch instructor feedback
 * @param  {String}     iframeHtml                              The HTML template for the instructor feedback iframe
 * @param  {Object}     [opts]                                  Optional parameters
 * @param  {Function}   [opts.allowFocus]                       A predicate function that determines if we can accept focus to an element while instructor feedback is active
 * @param  {HTMLElement}[opts.allowFocus.target]                The element that received focus
 * @param  {String}     [opts.issue]                            The issue that should be displayed
 * @param  {String}     [opts.filePreviewUrl]                   The URL that can be used to show a preview of the file
 * @param  {String}     [opts.locale]                           The locale to launch instructor feedback in
 * @param  {Object}     [opts.locator]                          If this content item is found in rich content, this locator provides a strategy to find the element inside the rich content body
 * @param  {String}     [opts.locator.selector]                 The CSS selector for the element in the rich content body
 * @param  {Number}     [opts.locator.index]                    The index of the element among all items selected with the `locator.selector` selector
 * @param  {String}     [opts.richContentId]                    If this file is being referenced inside a rich content item, this should be set to the page id
 * @param  {String}     [opts.target]                           Whether to launch the IF in an iframe in the current window or in a new window
 * @param  {Function}   [opts.windowLauncher]                   The function that can launch a new window. Defaults to `window.open`
 * @param  {Function}   [opts.windowLauncher.url]               The URL that will be opened in a new window
 * @param  {String}     [opts.windowTitle]                      The title of the new window in case the instructor feedback is launched in a new window
 * @param  {Object}     [callbacks]                             A set of optional callback functions that get invoked during or after the instructor feedback
 * @param  {Object}     [callbacks.closed]                      Invoked when the instructor feedback is closed
 * @param  {Function}   [callbacks.deleted]                     Invoked when a file gets removed through the instructor feedback
 * @param  {String}     [callbacks.deleted.fileId]              The id of the file that was deleted
 * @param  {Function}   [callbacks.updated]                     Invoked when a file gets updated
 * @param  {Object}     [callbacks.updated.newFileInfo]         The new file information
 * @param  {Function}   [callbacks.replacedFile]                Invoked when a file gets replaced
 * @param  {String}     [callbacks.replacedFile.oldFileId]      The id of the file that was replaced
 * @param  {Object}     [callbacks.replacedFile.newFileInfo]    The new file information
 */
export function launch(
    baseUrl,
    lmsUrl,
    platformName,
    platformUi,
    clientId,
    courseId,
    fileReference,
    iframeHtml,
    opts,
    callbacks
) {
    opts = opts || {};
    opts.locale = opts.locale || $('html').attr('lang');
    opts.target = opts.target || 'iframe';

    // Noop any callback function that was not provided
    const noopCallback = () => {};
    const noopCallbackPromise = () => Promise.resolve();
    callbacks = callbacks || {};
    instructorFeedbackCallbacks.closed = callbacks.closed || noopCallback;
    instructorFeedbackCallbacks.deleted = callbacks.deleted || noopCallback;
    instructorFeedbackCallbacks.updated = callbacks.updated || noopCallback;
    instructorFeedbackCallbacks.replacedFile = callbacks.replacedFile || noopCallback;
    instructorFeedbackCallbacks.fixHtmlIssue = callbacks.fixHtmlIssue || noopCallbackPromise;
    instructorFeedbackCallbacks.eventTracker = callbacks.eventTracker || noopCallback;

    // Ensure our listeners are bound to the window
    listen({
        'allowFocus': opts.allowFocus,
        'platformName': platformName,
        'target': opts.target
    });
    delete opts.allowFocus;

    if (opts.target === 'window') {
        launchWindow(
            baseUrl,
            platformName,
            platformUi,
            clientId,
            courseId,
            fileReference,
            iframeHtml,
            opts
        );
    } else {
        launchIframe(
            baseUrl,
            lmsUrl,
            platformName,
            platformUi,
            clientId,
            courseId,
            fileReference,
            iframeHtml,
            opts
        );
    }
}

/**
 * Send live feedback updates to the instructor feedback, allow us to update our live score and set of issues while
 * the user makes changes.
 *
 * @param {object} liveFeedback The current set of feedback
 */
export function updateLiveFeedback(liveFeedback) {
    const targetWindow = findWindowInIfIframe();
    if (targetWindow) {
        IframeMessagingUtil.send(targetWindow, InstructorFeedbackMessages.LIVE_FEEDBACK, {
            liveFeedback
        });
    }
}

/**
 * Updates the instructor feedback content, used mainly after CAR WYSIWYG quickfixes.
 *
 * @param {string} htmlContent The current html content that should be rendered\
 * @param {boolean} forceUpdate whether try to forceUpdate feedback
 */
export function updateCarFeedback(htmlContent, forceUpdate = false) {
    const targetWindow = findWindowInIfIframe();
    if (targetWindow) {
        IframeMessagingUtil.send(targetWindow, InstructorFeedbackMessages.CAR_FEEDBACK, {
            'content': htmlContent,
            'forceUpdate': forceUpdate
        });
    }
}

/** Send a message to close the instructor feedback. */
export function closeInstructorFeedback() {
    const targetWindow = findWindowInIfIframe();
    if (targetWindow) {
        IframeMessagingUtil.send(targetWindow, InstructorFeedbackMessages.CLOSE);
    }
}

/** Send a message to handle an error when quickfix operation failed. */
function onQuickFixError(error) {
    const targetWindow = findWindowInIfIframe();
    if (targetWindow) {
        IframeMessagingUtil.send(targetWindow, InstructorFeedbackMessages.QUICKFIX_ERROR, {
            error
        });
    }
}

function findWindowInIfIframe() {
    const iframeEl = $instructorFeedbackIframe.find('iframe')[0];
    return iframeEl && iframeEl.contentWindow;
}

/**
 * Launch the instructor feedback in an iframe in the current window
 * @see [[launch]]
 */
function launchIframe(
    baseUrl,
    lmsUrl,
    platformName,
    platformUi,
    clientId,
    courseId,
    fileReference,
    iframeHtml,
    opts
) {
    // Queue the message that will be sent to the Ally remote iFrame
    queueMessage(
        InstructorFeedbackMessages.SHOW, {
            'fromPageUrl': window.location.href,
            clientId,
            courseId,
            'fileReferenceData': fileReference.data(),
            'filePreviewUrl': opts.filePreviewUrl,
            'liveFeedback': opts.liveFeedback,
            'locator': opts.locator,
            'editorBlocks': opts.editorBlocks,
            'platformName': platformName,
            'platformUi': platformUi,
            'richContentId': opts.richContentId,
            'issue': opts.issue,
            'locale': opts.locale,
            'lmsUrl': lmsUrl
        }
    );

    // Load/show the iframe
    loadInstructorFeedbackRemote(iframeHtml, {
        'appendTo': opts.appendTo
    });
}

/**
 * Launch the instructor feedback in a new window
 * @see [[launch]]
 */
function launchWindow(
    baseUrl,
    platformName,
    platformUi,
    clientId,
    courseId,
    fileReference,
    iframeHtml,
    opts
) {
    // TODO: liveFeedback explicitly not added here. I don't think it's possible for window launch with no embedded
    // WYSIWYG editor?
    var qs = {
        'fromPageUrl': window.location.href,
        clientId,
        courseId,
        'uploadType': fileReference.uploadType || 'File',
        'externalId': fileReference.fileId,
        'altText': (fileReference.embed && fileReference.embed.altText),
        'filePreviewUrl': opts.filePreviewUrl,
        'issue': opts.issue,
        'locale': opts.locale,
        'locator_selector': opts.locator && opts.locator.selector && encodeURIComponent(opts.locator.selector),
        'locator_index': (opts.locator && opts.locator.index),
        'platformName': platformName,
        'platformUi': platformUi,
        'richContentId': opts.richContentId,
        'windowTitle': opts.windowTitle
    };

    var nonEmptyQs = [];
    Object.keys(qs).forEach(function(key) {
        if (qs[key]) {
            nonEmptyQs.push(key + '=' + encodeURIComponent(qs[key]));
        }
    });

    var url = baseUrl + '/launchinstructorfeedback/?' + nonEmptyQs.join('&');
    var windowLauncher = opts.windowLauncher || window.open;
    windowLauncher.call(null, [url]);
}

/**
 * Reset instructor feedback.
 */
export function reset() {
    $instructorFeedbackIframe.remove();
    $instructorFeedbackIframe = $('<div />');
    $(document.body).removeClass('ally-instructor-feedback-active');
}

/**
 * An idempotent listen operation that adds or replaces existing listeners for all instructor feedback messages.
 */
function listen(opts) {
    // When instructor feedback signals that it has initialized, send any queued messages that were waiting for it
    // to start up
    IframeMessagingUtil.listen('init', function(data, id, ev) {
        sendQueuedMessage(ev.source, id);
    });

    // When instructor feedback sends the hide signal, we hide the iframe
    IframeMessagingUtil.listen('hide', hideInstructorFeedbackRemote);

    // When instructor feedback sends the active signal, we show the iframe
    IframeMessagingUtil.listen('active', () => activateInstructorFeedbackRemote(opts));

    /**
     * When instructor feedback sends the close signal, the IF was closed in a separate window, we promote the data
     * to the callbacks.
     *
     * Note that this is different from the `hide` subject as that gets sent when the IF gets closed in an iframe
     *
     * ```
     *    {
     *       'subject': 'close',
     *       'data': {
     *           'fileId': '<file id>'
     *       }
     *    }
     * ```
     */
    IframeMessagingUtil.listen('close', function(data) {
        instructorFeedbackCallbacks.closed(data.fileId);
        instructorFeedbackCallbacks.closed = null;
    });

    /**
     * When instructor feedback sends the "replaceFile" signal, we promote the data to the callbacks.
     *
     * ```
     *    {
     *       'subject': 'replaceFile',
     *       'data': {
     *           'oldFileId': '<old file id>' // If unspecified, indicates a simple update, not a replacement with a new file id
     *           'newFile': {<file object>}
     *       }
     *    }
     * ```
     */
    IframeMessagingUtil.listen('replaceFile', function(data) {
        if (data.oldFileId && data.newFile) {
            instructorFeedbackCallbacks.replacedFile(data.oldFileId, data.newFile);
        } else {
            // It is an update. Simply update the DOM with the file information
            instructorFeedbackCallbacks.updated(data.newFile);
        }
    });

    /**
     * When instructor feedback sends the "deleteFile" signal, we promote the data to the callbacks.
     *
     * ```
     *  {
     *      'subject': 'deleteFile',
     *      'data': {
     *          'fileId': '<file id>'
     *      }
     *  }
     * ```
     */
    IframeMessagingUtil.listen('deleteFile', function(data) {
        instructorFeedbackCallbacks.deleted(data.fileId);
    });

    // When instructor feedback sends the "print" signal, we print the page
    IframeMessagingUtil.listen('print', function() {
        window.print();
    });

    // When the user fixes an HTML issue, the specific issue and its data is passed over from instructor feedback to
    // make the change
    IframeMessagingUtil.listen('fixHtmlIssue', function(data) {
        const {
            ruleName,
            locators,
            fixOptions
        } = data;
        instructorFeedbackCallbacks.fixHtmlIssue(ruleName, locators, fixOptions)
            .catch(error => {
                const errorMessage = error.message || 'Applying a quickfix failed';
                onQuickFixError(errorMessage);
            });
    });

    IframeMessagingUtil.listen('liveFeedbackContent', function(content) {
        onLiveFeedbackContent(content);
    });

    IframeMessagingUtil.listen('eventTracker', function({
        event,
        data
    }) {
        instructorFeedbackCallbacks.eventTracker(event, data);
    });
}

/**
 * Send the content of the highlighted area in the editor pane to the IF panel to display for screen-readers only.
 * @param content The element that is highlighted
 */
export function onLiveFeedbackContent(content) {
    const targetWindow = findWindowInIfIframe();
    if (targetWindow) {
        IframeMessagingUtil.send(targetWindow, InstructorFeedbackMessages.LIVE_FEEDBACK_CONTENT, {
            content
        });
    }
}

/**
 * Send focus from the LMS UI out to the instructor feedback iframe. It seems that in Firefox, if there is going
 * to be a quick focus transition from one element to another (i.e., from the loading icon to the contents of the
 * iframe), it needs to have an explicit blur or else something seemingly random happens with focus.
 */
function focusInstructorFeedbackRemote() {
    // First remove focus from the loader or anything else we may have landed on in the parent
    $(document.body).find(':focus').trigger('blur');

    // Hide the loading items from the screen reader
    $('#ally-instructor-feedback-iframe > :not(iframe)').attr('aria-hidden', 'true');

    // Send focus out to the instructor feedback iframe
    const targetWindow = findWindowInIfIframe();
    if (targetWindow) {
        IframeMessagingUtil.send(targetWindow, InstructorFeedbackMessages.FOCUS);
    }
}

/**
 * Perform the actions necessary after an iframe has signaled that it has become "active". This typically means it
 * has finished loading its initial content and can both display something useful to the user and receive focus for
 * user interaction.
 *
 * @param {object} [options] Optional arguments
 * @param {Function} [options.allowFocus]
 *   A predicate determining to which element we will accept focus changes to in the parent frame. Needed when we don't
 *   have a full modal environment in instructor feedback, such as situations where we still have a WYSIWYG editor that
 *   must allow the user to still interact.
 * @param {HTMLElement} [options.allowFocus.target] The element that was focussed
 */
function activateInstructorFeedbackRemote({
    allowFocus = () => false,
    platformName,
    target
} = {}) {
    repositionIframe($instructorFeedbackIframe, instructorFeedbackIframeOffset, platformName, target);

    $instructorFeedbackIframe.addClass('ally-iframe-active');
    $(document.body).on('focusin.ally', function(ev) {
        // Only send the focus back to instructor feedback if we focused onto an element that is allowed to receive it
        if (!allowFocus(ev.target)) {
            focusInstructorFeedbackRemote();
        }
    });

    focusInstructorFeedbackRemote();

    // Mark everything except the iframe as aria-hidden=true to ensure that screen-reader virtual cursors won't go
    // beyond the range of the alternative formats dialog
    $('body > *:not(#ally-instructor-feedback-iframe)').each(function(i, el) {
        var $el = $(el);
        var prevAriaHiddenValue = $el.attr('aria-hidden') || '';
        $el.attr('data-ally-prev-aria-hidden', prevAriaHiddenValue);
        $el.attr('aria-hidden', 'true');
    });
}

/**
 * Create an iFrame that will be be used as a sidebar and will serve the instructor feedback functionality
 *
 * @param  {String} iframeHtml The HTML string for the iFrame rendered from the templates
 */
function loadInstructorFeedbackRemote(iframeHtml, {
    appendTo = document.body
} = {}) {
    const $existingIframeMask = $(appendTo).find('#ally-instructor-feedback-iframe');
    if ($existingIframeMask.length === 0) {
        const $iframeMask = $(iframeHtml);

        // Explicitly setting flex here before hiding is important for IE11 as otherwise it doesn't interpret it
        // as having been flex before it was hidden. So when it becomes shown, it becomes `block` and doesn't
        // display properly
        $iframeMask.css({
            'display': 'flex'
        }).hide();
        $iframeMask.find('button').click(function() {
            hideInstructorFeedbackRemote();
        });

        // Capture tab movement
        $iframeMask
            .find('#ally-instructor-feedback-iframe-start,#ally-instructor-feedback-iframe-end')
            .focus(function() {
                $iframeMask.find('button').focus();
            });

        $(appendTo).append($iframeMask);
        $instructorFeedbackIframe = $(appendTo).find('#ally-instructor-feedback-iframe');
        $iframeMask.fadeIn(300, function() {
            instructorFeedbackIframeOffset = document.documentElement.scrollTop;
            $(document.body).addClass('ally-instructor-feedback-active');
        });

        // Focus onto the loading animation to begin
        $iframeMask.find('> img').focus();
    } else {
        // Re-invoke the existing modal
        const $iframeMask = $existingIframeMask;
        const $iframe = $iframeMask.find('iframe');
        $instructorFeedbackIframe = $existingIframeMask;

        $iframeMask.removeClass('ally-iframe-active');
        $iframeMask.fadeIn(300, function() {
            instructorFeedbackIframeOffset = document.documentElement.scrollTop;
            $(document.body).addClass('ally-instructor-feedback-active');
        });

        // Expose and focus onto the loading animation to begin
        $iframeMask
            .find('> :not(iframe):not(#ally-instructor-feedback-iframe-start):not(#ally-instructor-feedback-iframe-end)')
            .attr('aria-hidden', 'false');
        $iframeMask.find('> img').focus();

        sendQueuedMessage($iframe[0].contentWindow);
    }

    window.dispatchEvent(new Event('resize'));
}

/**
 * Restyles Iframe element from fixed to absolute positioning,
 * only Learn with Iframe nesting on specific Firefox versions is affected
 *
 * @param $iframe affected html element
 * @param offset top offset from document
 * @param platformName LMS type
 * @param target html target parent
 */
export function repositionIframe($iframe, offset, platformName, target) {
    if (
        Firefox96Plus &&
        platformName === 'learn' && target === 'iframe' &&
        document.body.id === 'learn-oe-body'
    ) {
        $iframe.css('position', 'absolute');
        $iframe.css('transform', `translateY(${Math.max(0, offset - 1)}px)`);
        $iframe.css('height', 'calc(100% + 2px)');
        $iframe.find('.ally-iframe').css('position', 'absolute');
    }

    return $iframe;
}

/**
 * Removes absolute position related styles from iframe
 */
export function resetIframeStyles($iframe) {
    $iframe.css('position', '');
    $iframe.css('transform', '');
    $iframe.css('height', '');
    $iframe.find('.ally-iframe').css('position', '');

    return $iframe;
}

/**
 * Hide the Ally remote iFrame
 */
function hideInstructorFeedbackRemote() {
    // Remove the focus bounce-back listener
    $(document.body).off('focusin.ally');

    // Remove the active toggle from the body
    $(document.body).removeClass('ally-instructor-feedback-active');

    // Switch class toggles to hide the feedback panel
    $instructorFeedbackIframe.fadeOut(300, function() {
        // Restores original styling of IF to avoid flickering upon reopening IF in abs. mode
        resetIframeStyles($instructorFeedbackIframe);
    });

    // Remove all of our aria-hidden attributes that we added
    $('[data-ally-prev-aria-hidden]').each(function(i, el) {
        var $el = $(el);
        var prevAriaHiddenValue = $el.attr('data-ally-prev-aria-hidden');
        $el.removeAttr('data-ally-prev-aria-hidden');
        if (prevAriaHiddenValue) {
            $el.attr('aria-hidden', prevAriaHiddenValue);
        } else {
            $el.removeAttr('aria-hidden');
        }
    });

    window.dispatchEvent(new Event('resize'));
    // Notify the initiator that the IF is closed
    instructorFeedbackCallbacks.closed();
    instructorFeedbackCallbacks.closed = null;
}

/**
 * Queue a message that can be sent later using `sendQueuedMessage`.
 *
 * @param  {String}     subject     The subject of the message
 * @param  {Object}     data        The arbitrary data of the message
 */
function queueMessage(subject, data) {
    queuedMessage = {
        'subject': subject,
        'data': data
    };
}

/**
 * Send a message that was previously queued.
 *
 * @param  {Source}     source      The source on which to send the queued message
 * @param  {String}     responseTo  The id of the message to which this is a response
 */
function sendQueuedMessage(source, responseTo) {
    if (queuedMessage) {
        IframeMessagingUtil.send(source, queuedMessage.subject, queuedMessage.data, responseTo);
    }
}

/**
 * Tests if UserAgent corresponds to specific Firefox version
 *
 * @param major Major version number
 * @param minor Minor version number
 */
export function isFirefox(major, minor) {
    let userAgent = new RegExp(/firefox\/([0-9]+)\.([0-9]+)/g);
    let version = userAgent.exec(navigator.userAgent.toLowerCase());
    if (version) {
        return Number.parseInt(version[1]) >= major &&
            Number.parseInt(version[2]) >= minor;
    }
    return false;
}