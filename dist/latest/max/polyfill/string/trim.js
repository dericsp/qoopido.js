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
    global.qoopido.register("polyfill/string/trim", definition);
})(function(modules, shared, global, undefined) {
    "use strict";
    if (!String.prototype.trim) {
        var regex = new RegExp("^[\\s\\uFEFF\\xA0]+|[\\s\\uFEFF\\xA0]+$", "g");
        String.prototype.trim = function() {
            return this.replace(regex, "");
        };
    }
    return String.prototype.trim;
}, this);