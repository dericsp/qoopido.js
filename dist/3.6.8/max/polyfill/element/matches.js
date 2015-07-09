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
    var dependencies = [];
    if (!document.querySelectorAll) {
        dependencies.push("../document/queryselectorall");
    }
    window.qoopido.register("polyfill/elements/matches", definition, dependencies);
})(function(modules, shared, namespace, navigator, window, document, undefined) {
    "use strict";
    if (!Element.prototype.matches) {
        var prototype = Element.prototype;
        prototype.matches = prototype.matchesSelector = prototype.matchesSelector || prototype.webkitMatchesSelector || prototype.mozMatchesSelector || prototype.msMatchesSelector || prototype.oMatchesSelector || function(selector) {
            var elements = this.parentElement.querySelectorAll(selector), element, i = 0;
            while (element = elements[i++]) {
                if (element === this) {
                    return true;
                }
            }
            return false;
        };
    }
    return Element.prototype.matches;
});