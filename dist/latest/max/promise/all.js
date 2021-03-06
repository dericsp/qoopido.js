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
    if (!global.Promise) {
        dependencies.push("../polyfill/window/promise");
    }
    global.qoopido.register("promise/all", definition, dependencies);
})(function(modules, shared, global, undefined) {
    "use strict";
    return function all(promises) {
        if (Object.prototype.toString.call(promises) !== "[object Array]") {
            throw new TypeError("You must pass an array to all.");
        }
        return new global.Promise(function(resolve, reject) {
            var results = [], remaining = promises.length, i = 0, promise;
            if (remaining === 0) {
                resolve([]);
            }
            function resolver(index) {
                return function(value) {
                    resolveAll(index, value);
                };
            }
            function resolveAll(index, value) {
                results[index] = value;
                if (--remaining === 0) {
                    resolve(results);
                }
            }
            for (;(promise = promises[i]) !== undefined; i++) {
                if (promise && typeof promise.then === "function") {
                    promise.then(resolver(i), reject);
                } else {
                    resolveAll(i, promise);
                }
            }
        });
    };
}, this);