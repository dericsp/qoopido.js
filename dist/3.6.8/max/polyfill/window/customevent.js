/*!
* Qoopido.js library
*
* version: 3.6.8
* date:    2015-07-09
* author:  Dirk Lueth <info@qoopido.com>
* website: https://github.com/dlueth/qoopido.js
*
* Copyright (c) 2015 Dirk Lueth
*/
(function(definition) {
    window.qoopido.register("polyfill/window/customevent", definition);
})(function(modules, shared, namespace, navigator, window, document, undefined) {
    "use strict";
    if (!window.CustomEvent) {
        var createEvent = document.createEvent ? function(type, eventInitDict, detail) {
            var event = document.createEvent("Event"), bubbles = eventInitDict && eventInitDict.bubbles !== undefined ? eventInitDict.bubbles : false, cancelable = eventInitDict && eventInitDict.cancelable !== undefined ? eventInitDict.cancelable : true;
            event.initEvent(type, bubbles, cancelable);
            event.detail = detail;
            return event;
        } : function(type, eventInitDict, detail) {
            var event = document.createEventObject();
            event.type = type;
            event.bubbles = eventInitDict && eventInitDict.bubbles !== undefined ? eventInitDict.bubbles : false;
            event.cancelable = eventInitDict && eventInitDict.cancelable !== undefined ? eventInitDict.cancelable : true;
            event.detail = detail;
            return event;
        };
        window.CustomEvent = Window.prototype.CustomEvent = function CustomEvent(type, eventInitDict, detail) {
            if (!type) {
                throw new Error("Not enough arguments");
            }
            return createEvent(type, eventInitDict, detail);
        };
    }
    return window.CustomEvent;
});