import * as $ from 'jquery';

import * as IframeMessagingUtil from 'src/integration/iframeMessagingUtil';
import {
    repositionIframe,
    resetIframeStyles
} from './instructorFeedbackUtil';

// A message that should be sent once alternative formats has finished launching
var queuedMessage = null;

// Callbacks that can get invoked after the accessible versions.
// See `launchAccessibleVersions` for further documentation
var accessibleVersionsCallbacks = {
    'closed': function() {},
    'formatGenerated': defaultFormatGenerated,
    'openUrl': undefined,
    'alternativeFormatAccessed': undefined
};

/**
 * Launch the accessible versions
 *
 * @param  {String}     baseUrl             The full base URL of the ally server (e.g., https://prod.ally.ac)
 * @param  {String}     platformName        The name of the platform (e.g. learn, canvas, Wcm, web, ...)
 * @param  {String}     [platformUi]        The UI Ally is integrated in as some platforms have multiple UIs (e.g. `learn` has `original` and `ultra`).
 * @param  {Number}     clientId            The id of the client
 * @param  {String}     courseId            The id of the course to which the file belongs
 * @param  {String}     contentId           The arbitrary content id that the page correlates to
 * @param  {Object}     fileInfo            The file information for which to show the accessible versions
 * @param  {String}     iframeHtml          The HTML string for the iframe element to launch with
 * @param  {Object}     [opts]              Optional arguments
 * @param  {Object[]}   [opts.associatedFiles] A set of files that are associated to the rich content item for which
 *                                             alternative formats are requested
 * @param  {Boolean}    [opts.closeWhenFormatReady] Whether to close the AF modal when a format is ready and emitted
 * @param  {String}     [opts.content]      The rich content body, if any. A SHA-1 hash will be taken to prove user access to the content
 * @param  {String}     [opts.locale]       The locale for the launch. Defaults to the `<html />`
 * @param  {String}     [opts.parentSelector] The jQuery selector for the parent under which to place the iframe
 * @param  {Boolean}    [opts.renderAudioOnMobileInline] Whether to render the audio player on mobile browsers
 * @param  {Object}     [callbacks]         A set of callbacks to be invoked when certain actions are performed in and around the accessible versions modal
 * @param  {Function}   [callbacks.closed]  Invoked when the accessible versions modal is closed
 * @param  {Function}   [callbacks.formatGenerated]  Invoked when the alternative format has been generated
 * @param  {Function}   [callbacks.openUrl] Specify this callback if custom logic should be ran to open a URL. Defaults to `window.open` otherwise
 * @param  {Function}   [callbacks.alternativeFormatAccessed] Invoked when a user accesses one of the alternative formats
 */
export function launch(baseUrl, platformName, platformUi, clientId, courseId, contentId, fileInfo, iframeHtml, opts, callbacks) {
    opts = getLaunchOpts(opts);
    callbacks = callbacks || {};
    accessibleVersionsCallbacks.closed = callbacks.closed || function() {};
    accessibleVersionsCallbacks.formatGenerated = callbacks.formatGenerated || defaultFormatGenerated;
    accessibleVersionsCallbacks.openUrl = callbacks.openUrl || undefined;
    accessibleVersionsCallbacks.alternativeFormatAccessed = callbacks.alternativeFormatAccessed || undefined;

    var hasOpenUrlHandler = (!!callbacks.openUrl);

    hashContent(opts.content).then((contentHash) => {
        listen();

        // Queue the message that will be sent to the Ally remote iFrame
        queueMessage('accessible-versions-show', {
            'associatedFiles': opts.associatedFiles,
            'availableAlternativeFormats': fileInfo.availableAlternativeFormats,
            'baseUrl': baseUrl,
            'clientId': clientId,
            'contentHash': contentHash,
            'courseId': courseId,
            'contentId': contentId,
            'fileId': fileInfo.id,
            'fileType': fileInfo.type,
            'fromPageUrl': window.location.href,
            'hasOpenUrlHandler': hasOpenUrlHandler,
            'opts': opts,
            'platformName': platformName,
            'platformUi': platformUi,
            'richContentId': fileInfo.id,
            'uploadType': fileInfo.uploadType

        });
        loadAccessibleVersionsRemote(iframeHtml, opts.parentSelector, platformName);
    });
}

/**
 * Hash the given content with SHA-1.
 *
 * @param {String} [content] The content to hash, if any
 * @returns The hash of the given content. `null` if no content was provided or anything went wrong trying to hash.
 */
function hashContent(content) {
    if (!content) {
        return Promise.resolve(null);
    }

    return Promise.resolve()
        .then(() => new TextEncoder().encode(content))
        .then((buffer) => crypto.subtle.digest('SHA-1', buffer))
        .then((hashBuffer) => Array.from(new Uint8Array(hashBuffer)))
        .then((arr) => arr.map((b) => b.toString(16).padStart(2, '0')).join(''))
        .catch((err) => {
            console.error('Ally: Unable to generate a SHA-1 hash of the WYSIWYG content. ' +
                'This might prevent access to items behind conditional release.');
            console.error(err);
            return null;
        });
}

/**
 * Launch alternative formats for a webpage.
 *
 * @param  {String}     baseUrl             The full base URL of the ally server (e.g., https://prod.ally.ac)
 * @param  {String}     platformName        The name of the platform (e.g. learn, canvas, Wcm, web, ...)
 * @param  {String}     [platformUi]        The UI Ally is integrated in as some platforms have multiple UIs (e.g. `learn` has `original` and `ultra`).
 * @param  {Number}     clientId            The id of the client
 * @param  {String}     contentId           The arbitrary content id that the page correlates to
 * @param  {IJsWebpage} webpage             The webpage being launched from
 * @param  {String}     iframeHtml          The HTML string for the iframe element to launch with
 * @param  {Object}     [opts]              Optional arguments
 * @param  {Boolean}    [opts.closeWhenFormatReady] Whether to close the AF modal when a format is ready and emitted
 * @param  {String}     [opts.locale]       The locale for the launch. Defaults to the `<html />`
 * @param  {Boolean}    [opts.renderAudioOnMobileInline] Whether to render the audio player on mobile browsers
 * @param  {Object}     [callbacks]         A set of callbacks to be invoked when certain actions are performed in and around the accessible versions modal
 * @param  {Function}   [callbacks.closed]  Invoked when the accessible versions modal is closed
 * @param  {Function}   [callbacks.formatGenerated]  Invoked when the alternative format has been generated
 * @param  {Function}   [callbacks.openUrl] Specify this callback if custom logic should be ran to open a URL. Defaults to `window.open` otherwise
 * @param  {Function}   [callbacks.alternativeFormatAccessed] Invoked when a user accesses one of the alternative formats
 */
export function launchWebpage(baseUrl, platformName, platformUi, clientId, contentId, webpageInfo, iframeHtml, opts, callbacks) {
    opts = getLaunchOpts(opts);
    callbacks = callbacks || {};
    accessibleVersionsCallbacks.closed = callbacks.closed || function() {};
    accessibleVersionsCallbacks.formatGenerated = callbacks.formatGenerated || defaultFormatGenerated;
    accessibleVersionsCallbacks.openUrl = callbacks.openUrl || undefined;
    accessibleVersionsCallbacks.alternativeFormatAccessed = callbacks.alternativeFormatAccessed || undefined;

    var hasOpenUrlHandler = (!!callbacks.openUrl);

    listen();

    // Queue the message that will be sent to the Ally remote iFrame
    queueMessage('accessible-versions-show', {
        'baseUrl': baseUrl,
        'clientId': clientId,
        'contentId': contentId,
        'fromPageUrl': window.location.href,
        'hasOpenUrlHandler': hasOpenUrlHandler,
        'opts': opts,
        'platformName': platformName,
        'platformUi': platformUi,
        'webpage': webpageInfo
    });
    loadAccessibleVersionsRemote(iframeHtml, undefined, platformName);
}

/**
 * Launch alternative formats for a file on a webpage.
 *
 * The alternative formats modal will jump straight into listing the formats for the given file
 *
 * @param  {String}     baseUrl             The full base URL of the ally server (e.g., https://prod.ally.ac)
 * @param  {String}     platformName        The name of the platform (e.g. learn, canvas, Wcm, web, ...)
 * @param  {String}     [platformUi]        The UI Ally is integrated in as some platforms have multiple UIs (e.g. `learn` has `original` and `ultra`).
 * @param  {Number}     clientId            The id of the client
 * @param  {String}     contentId           The arbitrary content id that the page correlates to
 * @param  {IJsWebpage} webpage             The webpage being launched from
 * @param  {String}     iframeHtml          The HTML string for the iframe element to launch with
 * @param  {Object}     [opts]              Optional arguments
 * @param  {Boolean}    [opts.closeWhenFormatReady] Whether to close the AF modal when a format is ready and emitted
 * @param  {String}     [opts.locale]       The locale for the launch. Defaults to the `<html />`
 * @param  {Boolean}    [opts.renderAudioOnMobileInline] Whether to render the audio player on mobile browsers
 * @param  {Object}     [callbacks]         A set of callbacks to be invoked when certain actions are performed in and around the accessible versions modal
 * @param  {Function}   [callbacks.closed]  Invoked when the accessible versions modal is closed
 * @param  {Function}   [callbacks.formatGenerated]  Invoked when the alternative format has been generated
 * @param  {Function}   [callbacks.openUrl] Specify this callback if custom logic should be ran to open a URL. Defaults to `window.open` otherwise
 * @param  {Function}   [callbacks.alternativeFormatAccessed] Invoked when a user accesses one of the alternative formats
 * @param  {Object}     directFileInfo      The information of the file for which to list the available formats
 */
export function launchDirectFileOnWebpage(
    baseUrl,
    platformName,
    platformUi,
    clientId,
    contentId,
    webpageInfo,
    iframeHtml,
    opts,
    callbacks,
    directFileInfo
) {
    opts = getLaunchOpts(opts);
    callbacks = callbacks || {};
    accessibleVersionsCallbacks.closed = callbacks.closed || function() {};
    accessibleVersionsCallbacks.formatGenerated = callbacks.formatGenerated || defaultFormatGenerated;
    accessibleVersionsCallbacks.openUrl = callbacks.openUrl || undefined;
    accessibleVersionsCallbacks.alternativeFormatAccessed = callbacks.alternativeFormatAccessed || undefined;

    var hasOpenUrlHandler = (!!callbacks.openUrl);

    listen();

    // Queue the message that will be sent to the Ally remote iFrame
    queueMessage('accessible-versions-show', {
        'baseUrl': baseUrl,
        'clientId': clientId,
        'contentId': contentId,
        'directFileInfo': directFileInfo,
        'fromPageUrl': window.location.href,
        'hasOpenUrlHandler': hasOpenUrlHandler,
        'opts': opts,
        'platformName': platformName,
        'platformUi': platformUi,
        'webpage': webpageInfo
    });
    loadAccessibleVersionsRemote(iframeHtml, undefined, platformName);
}

/**
 * Launch alternative formats for an Ally as a Service file.
 *
 * The alternative formats modal will jump straight into listing the formats for the given file
 *
 * @param  {String}     baseUrl             The full base URL of the ally server (e.g., https://prod.ally.ac)
 * @param  {String}     platformName        The name of the platform (e.g. learn, canvas, Wcm, web, ...)
 * @param  {String}     [platformUi]        The UI Ally is integrated in as some platforms have multiple UIs (e.g. `learn` has `original` and `ultra`).
 * @param  {Number}     clientId            The id of the client
 * @param  {String}     contentId           The arbitrary content id that the page correlates to
 * @param  {String}     iframeHtml          The HTML string for the iframe element to launch with
 * @param  {Object}     [opts]              Optional arguments
 * @param  {Boolean}    [opts.closeWhenFormatReady] Whether to close the AF modal when a format is ready and emitted
 * @param  {String}     [opts.locale]       The locale for the launch. Defaults to the `<html />`
 * @param  {Boolean}    [opts.renderAudioOnMobileInline] Whether to render the audio player on mobile browsers
 * @param  {Object}     [callbacks]         A set of callbacks to be invoked when certain actions are performed in and around the accessible versions modal
 * @param  {Function}   [callbacks.closed]  Invoked when the accessible versions modal is closed
 * @param  {Function}   [callbacks.formatGenerated]  Invoked when the alternative format has been generated
 * @param  {Function}   [callbacks.openUrl] Specify this callback if custom logic should be ran to open a URL. Defaults to `window.open` otherwise
 * @param  {Function}   [callbacks.alternativeFormatAccessed] Invoked when a user accesses one of the alternative formats
 * @param  {Object}     contentInfo         The Ally as a service content info
 */
export function launchAaasContent(
    baseUrl,
    platformName,
    platformUi,
    clientId,
    contentId,
    iframeHtml,
    opts,
    callbacks,
    contentInfo
) {
    opts = getLaunchOpts(opts);
    callbacks = callbacks || {};
    accessibleVersionsCallbacks.closed = callbacks.closed || function() {};
    accessibleVersionsCallbacks.formatGenerated = callbacks.formatGenerated || defaultFormatGenerated;
    accessibleVersionsCallbacks.openUrl = callbacks.openUrl || undefined;
    accessibleVersionsCallbacks.alternativeFormatAccessed = callbacks.alternativeFormatAccessed || undefined;

    var hasOpenUrlHandler = (!!callbacks.openUrl);

    listen();

    // Queue the message that will be sent to the Ally remote iFrame
    queueMessage('accessible-versions-show', {
        'baseUrl': baseUrl,
        'clientId': clientId,
        'contentId': contentId,
        'contentInfo': contentInfo,
        'fromPageUrl': window.location.href,
        'hasOpenUrlHandler': hasOpenUrlHandler,
        'opts': opts,
        'platformName': platformName,
        'platformUi': platformUi
    });
    loadAccessibleVersionsRemote(iframeHtml, undefined, platformName);
}

/**
 * Reset alternative formats.
 */
export function reset() {
    $('#ally-accessible-versions-iframe').remove();
    $(document.body).removeClass('ally-accessible-versions-active');
}

/** Get the optional launch options */
function getLaunchOpts(opts) {
    opts = opts || {};
    opts.locale = opts.locale || $('html').attr('lang');
    opts.closeWhenFormatReady = opts.closeWhenFormatReady === false ? false : true;
    opts.renderAudioOnMobileInline = opts.renderAudioOnMobileInline === false ? false : true;
    return opts;
}

/**
 * An idempotent listen operation that adds or replaces existing listeners for all alternative formats messages.
 */
function listen() {
    // When alternative formats signals that it has initialized, send any queued messages that were waiting for it
    // to start up
    IframeMessagingUtil.listen('init', function(data, id, ev) {
        sendQueuedMessage(ev.source, id);
    });

    // When alternative formats sends the hide signal, we hide the iframe
    IframeMessagingUtil.listen('hide', hideAccessibleVersionsRemote);

    // When alternative formats sends the active signal, we show the iframe
    IframeMessagingUtil.listen('active', activateAccessibleVersionsRemote);

    /**
     * When alternative formats signals that a download has completed, open the given URL
     *
     * ```
     *  {
     *      'subject': 'downloadReady',
     *      'data': {
     *          'extension': '<extension>',
     *          'format': '<format>',
     *          'formatMimeType': '<mime type>',
     *          'language': '<language>',
     *          'url': '<url>'
     *      }
     *  }
     * ```
     */
    IframeMessagingUtil.listen('downloadReady', function(data) {
        accessibleVersionsCallbacks.formatGenerated(data);
    });

    /**
     * When alternative formats signals that an alternative format was accessed,
     * notify the host application
     *
     * ```
     *  {
     *      'subject': 'alternativeFormatAccessed',
     *      'data': {
     *          'contentId': '<contentId>'
     *      }
     *  }
     * ```
     */
    IframeMessagingUtil.listen('alternativeFormatAccessed', function(data) {
        const alternativeFormatAccessed = accessibleVersionsCallbacks.alternativeFormatAccessed;
        if (alternativeFormatAccessed) {
            alternativeFormatAccessed(data);
        }
    });

    // Some URL (e.g. library reference or help) needs to be opened through some custom handler
    IframeMessagingUtil.listen('openUrl', function(data) {
        openUrl(data.url);
    });
}

/**
 * Create an iFrame that will be overlayed on top of the existing page. This will appear to load the accessible
 * versions functionality inside of the page, but in reality it will just be an iFrame on top of the page. This
 * will provide a lot more control over the behavior and styling of the accessible versions functionality and
 * removes the potential for clashes with the parent page
 */
function loadAccessibleVersionsRemote(iframeHtml, parentSelector, platformName) {
    if (parentEl || parentSelector) {
        // If we're setting the iframe under a specific parent, remove any previous instance of the iframe so we
        // ensure we don't re-use an existing one under a different parent
        reset();
    }

    var alternativeFormatsIframeOffset = document.documentElement.scrollTop;
    if ($('#ally-accessible-versions-iframe').length === 0) {
        // The first time alternative formats is being loaded. Add the iframe to the HTML and focus it
        var parentEl = parentSelector && $(parentSelector)[0];
        $(parentEl || document.body).append(iframeHtml);

        repositionIframe(
            $('#ally-accessible-versions-iframe'), alternativeFormatsIframeOffset, platformName, 'iframe'
        ).show().focus();
        setDialogHeadingFocus();
    } else {
        // Alternative formats was already previously loaded. Activate the existing modal
        // Firefox doesn't seem to be able to move focus to another element if the active element isn't blurred
        // first.
        document.activeElement.blur();

        let $iframe = repositionIframe(
            $('#ally-accessible-versions-iframe'), alternativeFormatsIframeOffset, platformName, 'iframe'
        ).show().focus();
        setDialogHeadingFocus();
        IframeMessagingUtil.send($iframe[0].contentWindow, queuedMessage.subject, queuedMessage.data);
    }

    $(document.body).addClass('ally-accessible-versions-active');
}

/**
 * The Ally remote iframe has signaled that is has become active (it's inner contents are all loaded and
 * displaying). At this point, we should send focus into the iframe and ensure it cannot escape while active.
 */
function activateAccessibleVersionsRemote() {
    $('#ally-accessible-versions-iframe').focus();
    setDialogHeadingFocus();
    IframeMessagingUtil.send($('#ally-accessible-versions-iframe')[0].contentWindow, 'accessible-versions-focus');

    // When focus somehow returns to the parent frame (e.g., user switches to the address bar, then tabs along) we
    // should send it back to the modal
    $(document.body).on('focusin.ally', function(ev) {
        if (ev.target && ev.target.id !== 'ally-accessible-versions-iframe') {
            // When stealing due to coming back into the browser, there can be other stealing going on at the same
            // time. For example, in Canvas in the preview overlay, they will try and steal focus. This can result
            // in the final steal candidate being erratic. Holding off a tick will allow us to steal last
            setTimeout(function() {
                activateAccessibleVersionsRemote();
            });
        }
    });

    // Mark everything except the iframe as aria-hidden=true to ensure that screen-reader virtual cursors won't go
    // beyond the range of the alternative formats dialog
    $('body > *:not(#ally-accessible-versions-iframe)').each(function(i, el) {
        var $el = $(el);
        var prevAriaHiddenValue = $el.attr('aria-hidden') || '';
        $el.attr('data-ally-prev-aria-hidden', prevAriaHiddenValue);
        $el.attr('aria-hidden', 'true');
    });
}

/**
 * sets focus on the heading element of the AF dialog
 */
function setDialogHeadingFocus() {
    setTimeout(() => {
        if ($('#ally-accessible-versions-iframe').contentWindow !== undefined) {
            const dialogHeading = $('#ally-accessible-versions-iframe h2')[0];
            dialogHeading.focus();
        }
    }, 300);
}

/**
 * Hide the Ally remote iFrame
 */
function hideAccessibleVersionsRemote() {
    resetIframeStyles($('#ally-accessible-versions-iframe')).hide();

    $(document.body).removeClass('ally-accessible-versions-active');
    $(document.body).off('focusin.ally');

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

    // Invoke the closed callback handler, if there is one
    if (accessibleVersionsCallbacks.closed) {
        accessibleVersionsCallbacks.closed();
        accessibleVersionsCallbacks.closed = null;
    }
}

function defaultFormatGenerated(data) {
    // Hide the modal
    hideAccessibleVersionsRemote();

    // Send a message to the modal to reset itself
    IframeMessagingUtil.send($('#ally-accessible-versions-iframe')[0].contentWindow, 'accessible-versions-reset');

    // Redirect to the format URL so that the browser downloads it. Note that window.open cannot be used here as this
    // function is not called from a user triggered event (click, keypress, ..) and would be prevented by pop-up
    // blockers
    window.location = data.url;
}

function openUrl(url) {
    if (accessibleVersionsCallbacks.openUrl) {
        accessibleVersionsCallbacks.openUrl(url);
    }
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