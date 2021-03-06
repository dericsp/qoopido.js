/*!
* Qoopido.js library
*
* version: 3.7.4
* date:    2015-08-14
* author:  Dirk Lueth <info@qoopido.com>
* website: https://github.com/dlueth/qoopido.js
*
* Copyright (c) 2015 Dirk Lueth
*/
(function(definition, global) {
    var dependencies = [];
    if (!Array.prototype.indexOf) {
        dependencies.push("../array/indexof");
    }
    global.qoopido.register("polyfill/window/removeeventlistener", definition, dependencies);
})(function(modules, shared, global, undefined) {
    "use strict";
    if (!global.removeEventListener) {
        global.removeEventListener = Window.prototype.removeEventListener = HTMLDocument.prototype.removeEventListener = Element.prototype.removeEventListener = function removeEventListener(type, listener) {
            var element = this;
            if (element._events && element._events[type] && element._events[type].list) {
                var index = element._events[type].list.indexOf(listener);
                if (index > -1) {
                    element._events[type].list.splice(index, 1);
                    if (!element._events[type].list.length) {
                        element.detachEvent && element.detachEvent("on" + type, element._events[type]);
                    }
                }
            }
        };
    }
    return global.removeEventListener;
}, this);