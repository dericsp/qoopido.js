/*!
* Qoopido.js library
*
* version: 3.7.0
* date:    2015-07-23
* author:  Dirk Lueth <info@qoopido.com>
* website: https://github.com/dlueth/qoopido.js
*
* Copyright (c) 2015 Dirk Lueth
*/
(function(definition) {
    window.qoopido.register("pool/object", definition, [ "../pool" ]);
})(function(modules, shared, namespace, navigator, window, document, undefined) {
    "use strict";
    var prototype, supportsProto = Object.prototype.__proto__ === null, objectPrototype = supportsProto ? "__proto__" : "prototype", model = supportsProto ? null : function() {
        var iframe = document.createElement("iframe"), parent = document.body || document.documentElement;
        iframe.style.display = "none";
        parent.appendChild(iframe);
        iframe.src = "javascript:";
        var empty = iframe.contentWindow.Object.prototype;
        parent.removeChild(iframe);
        iframe = null;
        delete empty.constructor;
        delete empty.hasOwnProperty;
        delete empty.propertyIsEnumerable;
        delete empty.isPrototypeOf;
        delete empty.toLocaleString;
        delete empty.toString;
        delete empty.valueOf;
        empty.__proto__ = null;
        return empty;
    }();
    prototype = modules["pool"].extend({
        getModel: function() {
            return model;
        },
        _dispose: function(element) {
            var property;
            element[objectPrototype] = model;
            for (property in element) {
                delete element[property];
            }
            return element;
        },
        _obtain: function() {
            return {};
        }
    });
    shared.pool = shared.pool || {};
    shared.pool.object = prototype.create();
    return prototype;
});