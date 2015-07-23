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
    var dependencies = [ "../base", "../support" ];
    if (!window.getComputedStyle) {
        dependencies.push("../polyfill/window/getcomputedstyle");
    }
    window.qoopido.registerSingleton("hook/css", definition, dependencies);
})(function(modules, shared, namespace, navigator, window, document, undefined) {
    "use strict";
    var mSupport = modules["support"], getComputedStyle = window.getComputedStyle || modules["polyfill/window/getcomputedstyle"], hooks = {
        general: {
            get: function(element, property) {
                return getComputedStyle(element, null).getPropertyValue(property[0]);
            },
            set: function(element, property, value) {
                element.style[property[1]] = value;
            }
        },
        opacity: !mSupport.supportsCssProperty("opacity") ? {
            regex: new RegExp("alpha\\(opacity=(.*)\\)", "i"),
            get: function(element, property, value) {
                value = getComputedStyle(element, null).getPropertyValue("filter").toString().match(this.regex);
                if (value) {
                    value = value[1] / 100;
                } else {
                    value = 1;
                }
                return value;
            },
            set: function(element, property, value) {
                var style = element.style;
                style.zoom = 1;
                style.filter = "alpha(opacity=" + (value * 100 + .5 >> 0) + ")";
            }
        } : null
    };
    return modules["base"].extend({
        add: function(property, hook) {
            if (property && hook && hooks[property]) {
                hooks[property] = hook;
            }
            return this;
        },
        get: function(property) {
            if (property && hooks[property]) {
                return hooks[property];
            }
            return null;
        },
        process: function(method, element, property, value) {
            var hook;
            property = mSupport.getCssProperty(property, element) || null;
            if (property) {
                return ((hook = this.get(property[1])) && hook[method] || this.get("general")[method])(element, property, value);
            }
        }
    });
});