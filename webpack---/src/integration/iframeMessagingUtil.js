var hasInitializedListener = false;
var listeners = {};

/**
 * Send a message to a window or iframe
 *
 * @param  {Source}     source              The frame or source to send a message to
 * @param  {String}     subject             The subject of the message
 * @param  {{
 *              forceUpdate: boolean,
 *              content: string
 *          }}          [data]              The extra data of the message
 * @param  {String}     [responseTo]        The id of the message that this is a response to (if any)
 */
export function send(source, subject, data, responseTo) {
    var message = formatMessage(subject, data, responseTo);
    source.postMessage(JSON.stringify(message), '*');
}

/**
 * Send a message and listen for its response (once).
 *
 * @param  {Source} source The frame or source to send a message to
 * @param  {String} sendSubject The subject of the message to send
 * @param  {String} [sendData] The extra data of the message
 * @param  {String} responseSubject The subject of the message to listen for as the response. The response needs to
 *                                  respond with the appropriate `responseTo` value in its response message.
 */
export function sendAndListen(source, sendSubject, sendData, responseSubject, callback) {
    var sentMessage = formatMessage(sendSubject, sendData);

    var messageHandled = false;
    onMessage(function(receivedMessage) {
        if (!messageHandled &&
            receivedMessage.subject === responseSubject &&
            receivedMessage.responseTo === sentMessage.id) {
            messageHandled = true;
            return callback(receivedMessage.data);
        }
    });

    source.postMessage(JSON.stringify(sentMessage), '*');
}

/**
 * Listen for events coming in through the embedded iframes. Every time a message is received it will be passed on
 * to the callback. The callback function should ignore messages that are not intended for it
 *
 * @param  {String}     subject                 The subject to listen on
 * @param  {Function}   callback                Invoked when a new message is received
 * @param  {String}     [callback.data]         The extra data of the message
 * @param  {String}     [callback.id]           The id of the message
 * @param  {Event}      [callback.ev]           The original event carrying the message
 */
export function listen(subject, callback) {
    if (!hasInitializedListener) {
        // Initialize our listeners object and our single event handler that feeds all bound listeners
        hasInitializedListener = true;
        onMessage(function(message, ev) {
            var f = listeners[message.subject];
            if (f) {
                f(message.data, message.id, ev);
            }
        });
    }

    listeners[subject] = callback;
}

/**
 * Low-level binding that listens for messages across the specified window object.
 *
 * @param  {Function}   callback            The function invoked when an Ally message is sent on the window
 * @param  {Message}    callback.message    The parsed message
 * @param  {Event}      callback.event      The event
 * @param  {Window}     [source]            The window to listen to. By default will listen on `window`. Note that
 *                                          if the source provided here is not the current window, but the
 *                                          `contentWindow` of an iframe, then that iframe must be on the same
 *                                          domain (same scheme, host and port) for this to be successful. Therefore
 *                                          it's unlikely this is useful when external integration code is
 *                                          communicating with an Ally iframe such as instructor feedback or
 *                                          alternative formats
 */
export function onMessage(callback, source) {
    source = source || window;
    source.addEventListener('message', function(ev) {
        var message = parseMessage(ev);
        if (message) {
            callback(message, ev);
        }
    });
}


/**
 * Create a message object that can be sent to another window or iframe
 *
 * @param  {String}     subject             The subject of the message
 * @param  {String}     [data]              The extra data of the message
 * @param  {String}     [responseTo]        The id of the message that this is a response to (if any)
 * @return {Object}                         The formatted message
 */
function formatMessage(subject, data, responseTo) {
    data = data || {};
    var id = subject + '-' + Math.floor(Math.random() * 1000000);
    return {
        'subject': subject,
        'id': id,
        'data': data,
        'responseTo': responseTo
    };
}

/**
 * Parse a window message event.
 *
 * @param  {Object}     ev          The message event
 * @param  {String}     ev.data     The JSON that has been sent with the message event
 * @return {?Object}                The parsed data. When `null`, indicates there was an error parsing the data
 */
function parseMessage(ev) {
    var message = null;

    // Try and parse the provided event message. If it fails we let it remain null.
    if (ev && ev.data) {
        try {
            message = JSON.parse(ev.data);
        } catch (err) {
            // Continue returning null
        }
    }

    return message;
}