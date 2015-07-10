/*!
* Qoopido.js library
*
* version: 3.6.9
* date:    2015-07-10
* author:  Dirk Lueth <info@qoopido.com>
* website: https://github.com/dlueth/qoopido.js
*
* Copyright (c) 2015 Dirk Lueth
*/
(function(definition) {
    window.qoopido.register("support/css/borderradius", definition, [ "../../support" ]);
})(function(modules, shared, namespace, navigator, window, document, undefined) {
    "use strict";
    return modules["support"].addTest("/css/borderradius", function(deferred) {
        modules["support"].supportsCssProperty("border-radius") ? deferred.resolve(modules["support"].getCssProperty("border-radius")) : deferred.reject();
    });
});