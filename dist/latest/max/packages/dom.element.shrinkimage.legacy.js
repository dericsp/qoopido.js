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
(function(definition, qoopido) {
    if (qoopido.register) {
        qoopido.register("polyfill/object/defineproperty", definition);
    } else {
        (qoopido.modules = qoopido.modules || {})["polyfill/object/defineproperty"] = definition();
    }
})(function(modules, shared, global, undefined) {
    "use strict";
    if (!Object.defineProperty || !function() {
        try {
            Object.defineProperty({}, "x", {});
            return true;
        } catch (exception) {
            return false;
        }
    }()) {
        var defineProperty = Object.defineProperty, defineGetter = Object.prototype.__defineGetter__, defineSetter = Object.prototype.__defineSetter__;
        Object.defineProperty = function(obj, prop, desc) {
            if (defineProperty) {
                try {
                    return defineProperty(obj, prop, desc);
                } catch (exception) {}
            }
            if (obj !== Object(obj)) {
                throw new TypeError("Object.defineProperty called on non-object");
            }
            if (defineGetter && "get" in desc) {
                defineGetter.call(obj, prop, desc.get);
            }
            if (defineSetter && "set" in desc) {
                defineSetter.call(obj, prop, desc.set);
            }
            if ("value" in desc) {
                obj[prop] = desc.value;
            }
            return obj;
        };
    }
    return Object.defineProperty;
}, this.qoopido = this.qoopido || {});
(function(definition, qoopido) {
    if (qoopido.register) {
        var dependencies = [];
        if (!Object.defineProperty || !function() {
            try {
                Object.defineProperty({}, "x", {});
                return true;
            } catch (exception) {
                return false;
            }
        }()) {
            dependencies.push("./defineproperty");
        }
        qoopido.register("polyfill/object/defineproperties", definition, dependencies);
    } else {
        (qoopido.modules = qoopido.modules || {})["polyfill/object/defineproperties"] = definition();
    }
})(function(modules, shared, global, undefined) {
    "use strict";
    if (!Object.defineProperties) {
        Object.defineProperties = function(obj, properties) {
            if (obj !== Object(obj)) {
                throw new TypeError("Object.defineProperties called on non-object");
            }
            var name;
            for (name in properties) {
                if (Object.prototype.hasOwnProperty.call(properties, name)) {
                    Object.defineProperty(obj, name, properties[name]);
                }
            }
            return obj;
        };
    }
    return Object.defineProperties;
}, this.qoopido = this.qoopido || {});
(function(definition, qoopido) {
    if (qoopido.register) {
        var dependencies = [];
        if (!Object.defineProperties) {
            dependencies.push("./defineproperties");
        }
        qoopido.register("polyfill/object/create", definition, dependencies);
    } else {
        (qoopido.modules = qoopido.modules || {})["polyfill/object/create"] = definition();
    }
})(function(modules, shared, global, undefined) {
    "use strict";
    if (!Object.create) {
        Object.create = function(prototype, properties) {
            if (typeof prototype !== "object") {
                throw new TypeError();
            }
            function Constructor() {}
            Constructor.prototype = prototype;
            var obj = new Constructor();
            if (prototype) {
                obj.constructor = Constructor;
            }
            if (arguments.length > 1) {
                if (properties !== Object(properties)) {
                    throw new TypeError();
                }
                Object.defineProperties(obj, properties);
            }
            return obj;
        };
    }
    return Object.create;
}, this.qoopido = this.qoopido || {});
(function(definition, qoopido) {
    if (qoopido.register) {
        qoopido.register("polyfill/object/getownpropertynames", definition);
    } else {
        (qoopido.modules = qoopido.modules || {})["polyfill/object/getownpropertynames"] = definition();
    }
})(function(modules, shared, global, undefined) {
    "use strict";
    if (!Object.getOwnPropertyNames) {
        Object.getOwnPropertyNames = function(obj) {
            if (obj !== Object(obj)) {
                throw new TypeError("Object.getOwnPropertyNames called on non-object");
            }
            var props = [], p;
            for (p in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, p)) {
                    props.push(p);
                }
            }
            return props;
        };
    }
    return Object.getOwnPropertyNames;
}, this.qoopido = this.qoopido || {});
(function(definition, qoopido) {
    if (qoopido.register) {
        qoopido.register("polyfill/object/getownpropertydescriptor", definition);
    } else {
        (qoopido.modules = qoopido.modules || {})["polyfill/object/getownpropertydescriptor"] = definition();
    }
})(function(modules, shared, global, undefined) {
    "use strict";
    if (!Object.getOwnPropertyDescriptor || !function() {
        try {
            Object.getOwnPropertyDescriptor({
                x: 0
            }, "x");
            return true;
        } catch (exception) {
            return false;
        }
    }()) {
        var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
        Object.getOwnPropertyDescriptor = function(obj, property) {
            if (obj !== Object(obj)) {
                throw new TypeError();
            }
            try {
                return getOwnPropertyDescriptor.call(Object, obj, property);
            } catch (exception) {}
            if (Object.prototype.hasOwnProperty.call(obj, property)) {
                return {
                    value: obj[property],
                    enumerable: true,
                    writable: true,
                    configurable: true
                };
            }
        };
    }
    return Object.getOwnPropertyDescriptor;
}, this.qoopido = this.qoopido || {});
(function(definition, global, undefined) {
    "use strict";
    function register(id, definition, dependencies, callback) {
        var namespace = id.split("/"), initialize;
        if (modules[id]) {
            return modules[id];
        }
        initialize = function() {
            if (dependencies) {
                var path = namespace.slice(0, -1).join("/"), i = 0, dependency, internal;
                for (;(dependency = dependencies[i]) !== undefined; i++) {
                    internal = isInternal.test(dependency);
                    if (internal) {
                        dependency = canonicalize(path + "/" + dependency);
                    }
                    if (!modules[dependency] && arguments[i]) {
                        modules[dependency] = arguments[i];
                    }
                    if (internal && !modules[dependency] && typeof console !== "undefined") {
                        console.error("".concat("[Qoopido.js] ", id, ": Could not load dependency ", dependency));
                    }
                }
            }
            modules[id] = definition(modules, shared, global, undefined);
            if (callback) {
                callback(modules[id]);
            }
            return modules[id];
        };
        if (typeof module !== "undefined" && module.exports) {
            module.exports = define(initialize);
        } else if (typeof define === "function" && define.amd) {
            dependencies ? define(dependencies, initialize) : define(initialize);
        } else {
            initialize();
        }
    }
    function registerSingleton(id, definition, dependencies) {
        register(id, definition, dependencies, function(module) {
            modules[id] = module.create();
        });
    }
    var qoopido = global.qoopido || (global.qoopido = {}), shared = qoopido.shared || (qoopido.shared = {}), modules = qoopido.modules || (qoopido.modules = {}), dependencies = [], isInternal = new RegExp("^\\.+\\/"), regexCanonicalize = new RegExp("(?:\\/|)[^\\/]*\\/\\.\\."), removeNeutral = new RegExp("(^\\/)|\\.\\/", "g");
    qoopido.register = register;
    qoopido.registerSingleton = registerSingleton;
    function canonicalize(path) {
        var collapsed;
        while ((collapsed = path.replace(regexCanonicalize, "")) !== path) {
            path = collapsed;
        }
        return path.replace(removeNeutral, "");
    }
    if (!Object.create) {
        dependencies.push("./polyfill/object/create");
    }
    if (!Object.getOwnPropertyNames) {
        dependencies.push("./polyfill/object/getownpropertynames");
    }
    if (!Object.getOwnPropertyDescriptor || !function() {
        try {
            Object.getOwnPropertyDescriptor({
                x: 0
            }, "x");
            return true;
        } catch (exception) {
            return false;
        }
    }()) {
        dependencies.push("./polyfill/object/getownpropertydescriptor");
    }
    register("base", definition, dependencies);
})(function(modules, shared, global, undefined) {
    "use strict";
    function getOwnPropertyDescriptors(object) {
        var descriptors = {}, properties = Object.getOwnPropertyNames(object), i = 0, property;
        for (;(property = properties[i]) !== undefined; i++) {
            descriptors[property] = Object.getOwnPropertyDescriptor(object, property);
        }
        return descriptors;
    }
    function prohibitCall() {
        throw new Error("[Qoopido.js] Operation prohibited");
    }
    return {
        create: function() {
            var instance = Object.create(this, getOwnPropertyDescriptors(this)), result;
            if (instance._constructor) {
                result = instance._constructor.apply(instance, arguments);
            }
            instance.create = instance.extend = prohibitCall;
            return result || instance;
        },
        extend: function(properties, final) {
            var instance;
            properties = properties || {};
            final = final === true;
            properties._parent = this;
            instance = Object.create(this, getOwnPropertyDescriptors(properties));
            if (final === true) {
                instance.extend = prohibitCall;
            }
            return instance;
        }
    };
}, this);
(function(definition, global) {
    global.qoopido.register("polyfill/string/ucfirst", definition);
})(function(modules, shared, global, undefined) {
    "use strict";
    if (!String.prototype.ucfirst) {
        String.prototype.ucfirst = function() {
            var self = this;
            return self.charAt(0).toUpperCase() + self.slice(1);
        };
    }
    return String.prototype.ucfirst;
}, this);
(function(definition, global) {
    global.qoopido.register("polyfill/string/lcfirst", definition);
})(function(modules, shared, global, undefined) {
    "use strict";
    if (!String.prototype.lcfirst) {
        String.prototype.lcfirst = function() {
            var self = this;
            return self.charAt(0).toLowerCase() + self.slice(1);
        };
    }
    return String.prototype.lcfirst;
}, this);
(function(definition, global) {
    global.qoopido.register("polyfill/window/getcomputedstyle", definition);
})(function(modules, shared, global, undefined) {
    "use strict";
    if (!global.getComputedStyle) {
        var getComputedStyleRegex = new RegExp("(\\-([a-z]){1})", "g"), getComputedStyleCallback = function() {
            return arguments[2].toUpperCase();
        };
        return function(element, pseudo) {
            var self = this;
            self.getPropertyValue = function(property) {
                if (property === "float") {
                    property = "styleFloat";
                }
                if (getComputedStyleRegex.test(property)) {
                    property = property.replace(getComputedStyleRegex, getComputedStyleCallback);
                }
                return element.currentStyle[property] || null;
            };
            return self;
        };
    } else {
        return global.getComputedStyle;
    }
}, this);
(function(definition, global) {
    global.qoopido.register("polyfill/window/promise", definition);
})(function(modules, shared, global, undefined) {
    "use strict";
    var isObject = function(value) {
        return typeof value === "object";
    }, isFunction = function(value) {
        return typeof value === "function";
    }, asap = isFunction(global.setImmediate) && global.setImmediate || function(fn) {
        setTimeout(fn, 1);
    };
    function bind(fn, context) {
        return function() {
            fn.apply(context, arguments);
        };
    }
    function handle(deferred) {
        var self = this;
        if (self._state === null) {
            self._deferreds.push(deferred);
            return;
        }
        asap(function() {
            var callback = self._state ? deferred.onFulfilled : deferred.onRejected, value;
            if (callback === null) {
                (self._state ? deferred.resolve : deferred.reject)(self._value);
                return;
            }
            try {
                value = callback(self._value);
            } catch (exception) {
                deferred.reject(exception);
                return;
            }
            deferred.resolve(value);
        });
    }
    function resolve(value) {
        var self = this, then;
        try {
            if (value === self) {
                throw new TypeError("A promise cannot be resolved with itself.");
            }
            if (value && (isObject(value) || isFunction(value))) {
                then = value.then;
                if (typeof then === "function") {
                    doResolve(bind(then, value), bind(resolve, self), bind(reject, self));
                    return;
                }
            }
            self._state = true;
            self._value = value;
            finale.call(self);
        } catch (exception) {
            reject.call(self, exception);
        }
    }
    function reject(value) {
        var self = this;
        self._state = false;
        self._value = value;
        finale.call(self);
    }
    function finale() {
        var self = this, i = 0, deferred;
        for (;(deferred = self._deferreds[i]) !== undefined; i++) {
            handle.call(self, deferred);
        }
        this._deferreds = null;
    }
    function Handler(onFulfilled, onRejected, resolve, reject) {
        var self = this;
        self.onFulfilled = typeof onFulfilled === "function" ? onFulfilled : null;
        self.onRejected = typeof onRejected === "function" ? onRejected : null;
        self.resolve = resolve;
        self.reject = reject;
    }
    function doResolve(fn, onFulfilled, onRejected) {
        var done = false;
        try {
            fn(function(value) {
                if (done) {
                    return;
                }
                done = true;
                onFulfilled(value);
            }, function(reason) {
                if (done) {
                    return;
                }
                done = true;
                onRejected(reason);
            });
        } catch (exception) {
            if (done) {
                return;
            }
            done = true;
            onRejected(exception);
        }
    }
    function Promise(fn) {
        var self = this;
        if (!isObject(self)) {
            throw new TypeError("Promises must be constructed via new");
        }
        if (!isFunction(fn)) {
            throw new TypeError("not a function");
        }
        self._state = null;
        self._value = null;
        self._deferreds = [];
        doResolve(fn, bind(resolve, self), bind(reject, self));
    }
    Promise.prototype["catch"] = function(onRejected) {
        return this.then(null, onRejected);
    };
    Promise.prototype["then"] = function(onFulfilled, onRejected) {
        var self = this;
        return new Promise(function(resolve, reject) {
            handle.call(self, new Handler(onFulfilled, onRejected, resolve, reject));
        });
    };
    Promise.resolve = function(value) {
        if (value && isObject(value) && value.constructor === Promise) {
            return value;
        }
        return new Promise(function(resolve) {
            resolve(value);
        });
    };
    Promise.reject = function(value) {
        return new Promise(function(resolve, reject) {
            reject(value);
        });
    };
    if (!global.Promise) {
        global.Promise = Promise;
    }
    return global.Promise;
}, this);
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
(function(definition, global) {
    var dependencies = [];
    if (!global.Promise) {
        dependencies.push("../polyfill/window/promise");
    }
    global.qoopido.register("promise/defer", definition, dependencies);
})(function(modules, shared, global, undefined) {
    "use strict";
    return function defer() {
        var self = this;
        self.promise = new global.Promise(function(resolve, reject) {
            self.resolve = resolve;
            self.reject = reject;
        });
    };
}, this);
(function(definition, global) {
    global.qoopido.register("function/merge", definition);
})(function(modules, shared, global, undefined) {
    "use strict";
    return function merge() {
        var target = arguments[0], i, properties, property, tgt, src;
        for (i = 1; (properties = arguments[i]) !== undefined; i++) {
            for (property in properties) {
                tgt = target[property];
                src = properties[property];
                if (src !== undefined) {
                    if (src !== null && typeof src === "object") {
                        if (src.length !== undefined) {
                            tgt = tgt && typeof tgt === "object" && tgt.length !== undefined ? tgt : [];
                        } else {
                            tgt = tgt && typeof tgt === "object" && tgt.length === undefined ? tgt : {};
                        }
                        target[property] = merge(tgt, src);
                    } else {
                        target[property] = src;
                    }
                }
            }
        }
        return target;
    };
}, this);
(function(definition, global) {
    global.qoopido.register("function/unique/string", definition);
})(function(modules, shared, global, undefined) {
    "use strict";
    var lookup = {}, characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    function generateString(length) {
        var result = "", i = 0;
        length = parseInt(length, 10) || 12;
        for (;i < length; i++) {
            result += characters[parseInt(Math.random() * (characters.length - 1), 10)];
        }
        return result;
    }
    return function(length) {
        var result;
        do {
            result = generateString(length);
        } while (typeof lookup[result] !== "undefined");
        lookup[result] = true;
        return result;
    };
}, this);
(function(definition, global) {
    global.qoopido.register("function/unique/uuid", definition);
})(function(modules, shared, global, undefined) {
    "use strict";
    var lookup = {}, regex = new RegExp("[xy]", "g");
    function generateUuid() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(regex, function(c) {
            var r = Math.random() * 16 | 0, v = c === "x" ? r : r & 3 | 8;
            return v.toString(16);
        });
    }
    return function() {
        var result;
        do {
            result = generateUuid();
        } while (typeof lookup[result] !== "undefined");
        lookup[result] = true;
        return result;
    };
}, this);
(function(definition, global) {
    global.qoopido.register("proxy", definition, [ "./base", "./function/unique/uuid" ]);
})(function(modules, shared, global, undefined) {
    "use strict";
    return modules["base"].extend({
        _constructor: function(context, fn) {
            var args = Array.prototype.splice.call(arguments, 2), proxy = function() {
                return fn.apply(context, Array.prototype.slice.call(arguments).concat(args));
            };
            proxy._quid = modules["function/unique/uuid"]();
            return proxy;
        }
    });
}, this);
(function(definition, global) {
    var dependencies = [ "./base", "./promise/all", "./promise/defer" ];
    if (!String.prototype.ucfirst) {
        dependencies.push("./polyfill/string/ucfirst");
    }
    if (!String.prototype.lcfirst) {
        dependencies.push("./polyfill/string/lcfirst");
    }
    global.qoopido.registerSingleton("support", definition, dependencies);
})(function(modules, shared, global, undefined) {
    "use strict";
    var document = global.document, CombinedPromise = modules["promise/all"], DeferredPromise = modules["promise/defer"], matchPrefix = new RegExp("^(Moz|WebKit|Khtml|ms|O|Icab)(?=[A-Z])"), removeJsPrefix = new RegExp("^(?:webkit|khtml|icab|moz|ms|o)([A-Z])"), removeCssPrefix = new RegExp("^-(?:webkit|khtml|icab|moz|ms|o)-"), convertToCamelCase = new RegExp("-([a-z])", "gi"), convertToHyphens = new RegExp("([A-Z])", "g"), callbackUcfirst = function() {
        return arguments[1].ucfirst();
    }, lookup = {
        prefix: null,
        method: {},
        property: {},
        css: {},
        promises: {
            prefix: null,
            method: {},
            property: {},
            css: {},
            test: {}
        }
    };
    function normalize(value) {
        return value.replace(removeJsPrefix, "$1").lcfirst().replace(removeCssPrefix, "").replace(convertToCamelCase, callbackUcfirst);
    }
    return modules["base"].extend({
        test: {},
        pool: shared.pool && shared.pool.dom,
        testMultiple: function() {
            var test, tests = [], i = 0;
            for (;(test = arguments[i]) !== undefined; i++) {
                switch (typeof test) {
                  case "string":
                    tests.push(this.test[test]());
                    break;

                  case "boolean":
                    var deferred = new DeferredPromise();
                    !!test ? deferred.resolve() : deferred.reject();
                    tests.push(deferred.promise);
                    break;

                  default:
                    tests.push(test);
                    break;
                }
            }
            return new CombinedPromise(tests);
        },
        getPrefix: function() {
            var self = this, stored = lookup.prefix || null, property;
            if (stored === null) {
                var sample = self.pool ? self.pool.obtain("div") : document.createElement("div"), styles = sample.style;
                stored = false;
                for (property in styles) {
                    if (matchPrefix.test(property)) {
                        stored = property.match(matchPrefix)[0];
                    }
                }
                if (stored === false && "WebkitOpacity" in styles) {
                    stored = "WebKit";
                }
                if (stored === false && "KhtmlOpacity" in styles) {
                    stored = "Khtml";
                }
                stored = lookup.prefix = stored === false ? false : [ stored.toLowerCase(), stored.toLowerCase().ucfirst(), stored ];
                sample.dispose && sample.dispose();
            }
            return stored;
        },
        getMethod: function(pMethod, pElement) {
            pMethod = normalize(pMethod);
            pElement = pElement || global;
            var type = pElement.tagName, pointer = lookup.method[type] = lookup.method[type] || {}, stored = pointer[pMethod] = lookup.method[type][pMethod] || null;
            if (stored === null) {
                stored = false;
                var candidates, candidate, i = 0, uMethod = pMethod.ucfirst(), prefixes = this.getPrefix();
                if (prefixes !== false) {
                    candidates = (pMethod + " " + uMethod + " " + prefixes.join(uMethod + " ") + uMethod).split(" ");
                } else {
                    candidates = [ pMethod ];
                }
                for (;(candidate = candidates[i]) !== undefined; i++) {
                    if (pElement[candidate] !== undefined && (typeof pElement[candidate] === "function" || typeof pElement[candidate] === "object")) {
                        stored = candidate;
                        break;
                    }
                }
                lookup.method[type][pMethod] = stored;
            }
            return stored;
        },
        getProperty: function(pProperty, pElement) {
            pProperty = normalize(pProperty);
            pElement = pElement || global;
            var type = pElement.tagName, pointer = lookup.property[type] = lookup.property[type] || {}, stored = pointer[pProperty] = lookup.property[type][pProperty] || null;
            if (stored === null) {
                stored = false;
                var candidates, candidate, i = 0, uProperty = pProperty.ucfirst(), prefixes = this.getPrefix();
                if (prefixes !== false) {
                    candidates = (pProperty + " " + uProperty + " " + prefixes.join(uProperty + " ") + uProperty).split(" ");
                } else {
                    candidates = [ pProperty ];
                }
                for (i; (candidate = candidates[i]) !== undefined; i++) {
                    if (pElement[candidate] !== undefined) {
                        stored = candidate;
                        break;
                    }
                }
                lookup.property[type][pProperty] = stored;
            }
            return stored;
        },
        getCssProperty: function(pProperty) {
            pProperty = normalize(pProperty);
            var self = this, stored = lookup.css[pProperty] || null;
            if (stored === null) {
                stored = false;
                var candidate, i = 0, sample = self.pool ? self.pool.obtain("div") : document.createElement("div"), uProperty = pProperty.ucfirst(), prefixes = this.getPrefix() || [], candidates = (pProperty + " " + uProperty + " " + prefixes.join(uProperty + " ") + uProperty).split(" "), prefix = "";
                for (i; (candidate = candidates[i]) !== undefined; i++) {
                    if (sample.style[candidate] !== undefined) {
                        stored = candidate;
                        if (i > 0) {
                            prefix = "-";
                        }
                        break;
                    }
                }
                stored = lookup.css[pProperty] = stored !== false ? [ prefix + stored.replace(convertToHyphens, "-$1").toLowerCase(), stored ] : false;
                sample.dispose && sample.dispose();
            }
            return stored;
        },
        supportsPrefix: function() {
            return !!this.getPrefix();
        },
        supportsMethod: function(pMethod, pElement) {
            return !!this.getMethod(pMethod, pElement);
        },
        supportsProperty: function(pProperty, pElement) {
            return !!this.getProperty(pProperty, pElement);
        },
        supportsCssProperty: function(pProperty) {
            return !!this.getCssProperty(pProperty);
        },
        testPrefix: function() {
            var stored = lookup.promises.prefix;
            if (stored === null) {
                var deferred = new DeferredPromise(), prefix = this.getPrefix();
                !!prefix ? deferred.resolve(prefix) : deferred.reject();
                stored = lookup.promises.prefix = deferred.promise;
            }
            return stored;
        },
        testMethod: function(pMethod, pElement) {
            pElement = pElement || global;
            var type = pElement.tagName, pointer = lookup.promises.method[type] = lookup.promises.method[type] || {}, stored = pointer[pMethod] = lookup.promises.method[type][pMethod] || null;
            if (stored === null) {
                var deferred = new DeferredPromise(), method = this.getMethod(pMethod, pElement);
                !!method ? deferred.resolve(method) : deferred.reject();
                stored = lookup.promises.method[type][pMethod] = deferred.promise;
            }
            return stored;
        },
        testProperty: function(pProperty, pElement) {
            pElement = pElement || global;
            var type = pElement.tagName, pointer = lookup.promises.property[type] = lookup.promises.property[type] || {}, stored = pointer[pProperty] = lookup.promises.property[type][pProperty] || null;
            if (stored === null) {
                var deferred = new DeferredPromise(), property = this.getProperty(pProperty, pElement);
                !!property ? deferred.resolve(property) : deferred.reject();
                stored = lookup.promises.property[type][pProperty] = deferred.promise;
            }
            return stored;
        },
        testCssProperty: function(pProperty) {
            var stored = lookup.promises.css[pProperty] || null;
            if (stored === null) {
                var deferred = new DeferredPromise(), property = this.getCssProperty(pProperty);
                !!property ? deferred.resolve(property) : deferred.reject();
                stored = lookup.promises.css[pProperty] = deferred.promise;
            }
            return stored;
        },
        addTest: function(pId, pTest) {
            return this.test[pId] = function() {
                var stored = lookup.promises.test[pId] || null;
                if (stored === null) {
                    var deferred = new DeferredPromise(), parameter = Array.prototype.slice.call(arguments);
                    parameter.splice(0, 0, deferred);
                    pTest.apply(null, parameter);
                    stored = lookup.promises.test[pId] = deferred.promise;
                }
                return stored;
            };
        }
    });
}, this);
(function(definition, global) {
    global.qoopido.register("support/capability/datauri", definition, [ "../../support", "../../dom/element" ]);
})(function(modules, shared, global, undefined) {
    "use strict";
    var support = modules["support"];
    return support.addTest("/capability/datauri", function(deferred) {
        var sample = modules["dom/element"].create(support.pool ? support.pool.obtain("img") : document.createElement("img"));
        sample.one("error load", function(event) {
            if (event.type === "load" && sample.element.width === 1 && sample.element.height === 1) {
                deferred.resolve();
            } else {
                deferred.reject();
            }
            sample.element.dispose && sample.element.dispose();
        }, false).setAttribute("src", "data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==");
    });
}, this);
(function(definition, global) {
    global.qoopido.register("support/element/canvas", definition, [ "../../support" ]);
})(function(modules, shared, global, undefined) {
    "use strict";
    var support = modules["support"];
    return support.addTest("/element/canvas", function(deferred) {
        var sample = support.pool ? support.pool.obtain("canvas") : document.createElement("canvas");
        sample.getContext && sample.getContext("2d") ? deferred.resolve() : deferred.reject();
        sample.dispose && sample.dispose();
    });
}, this);
(function(definition, global) {
    global.qoopido.register("support/element/canvas/todataurl", definition, [ "../../../support", "../canvas" ]);
})(function(modules, shared, global, undefined) {
    "use strict";
    var support = modules["support"];
    return support.addTest("/element/canvas/todataurl", function(deferred) {
        modules["support/element/canvas"]().then(function() {
            var sample = support.pool ? support.pool.obtain("canvas") : document.createElement("canvas");
            sample.toDataURL !== undefined ? deferred.resolve() : deferred.reject();
            sample.dispose && sample.dispose();
        }, function() {
            deferred.reject();
        });
    });
}, this);
(function(definition, global) {
    global.qoopido.register("support/element/canvas/todataurl/png", definition, [ "../../../../support", "../todataurl" ]);
})(function(modules, shared, global, undefined) {
    "use strict";
    var support = modules["support"];
    return support.addTest("/element/canvas/todataurl/png", function(deferred) {
        modules["support/element/canvas/todataurl"]().then(function() {
            var sample = support.pool ? support.pool.obtain("canvas") : document.createElement("canvas");
            sample.toDataURL("image/png").indexOf("data:image/png") === 0 ? deferred.resolve() : deferred.reject();
            sample.dispose && sample.dispose();
        }, function() {
            deferred.reject();
        });
    });
}, this);
(function(definition, global) {
    global.qoopido.registerSingleton("hook/event", definition, [ "../base" ]);
})(function(modules, shared, global, undefined) {
    "use strict";
    var document = global.document;
    function transferProperties(event, originalEvent, properties) {
        var i = 0, property;
        for (;(property = properties[i]) !== undefined; i++) {
            event[property] = originalEvent[property];
        }
        event._properties = event._properties.concat(properties);
    }
    var hooks = {
        general: {
            properties: "type altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which path".split(" "),
            process: function(event, originalEvent) {
                var pointer;
                event.originalEvent = originalEvent;
                event.isDefaultPrevented = originalEvent.defaultPrevented ? true : false;
                event.isPropagationStopped = originalEvent.cancelBubble ? true : false;
                event.metaKey = originalEvent.metaKey && originalEvent.metaKey !== false ? true : false;
                if (!event.target) {
                    event.target = originalEvent.srcElement || document;
                }
                if (event.target.nodeType === 3) {
                    event.target = event.target.parentNode;
                }
                if (!event.path) {
                    event.path = [];
                    pointer = event.target;
                    do {
                        event.path.push(pointer);
                    } while (pointer = pointer.parentNode);
                    event.path.push(global);
                }
            }
        },
        mouse: {
            regex: new RegExp("^(?:mouse|pointer|contextmenu|touch|click|dblclick|drag|drop)"),
            properties: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement dataTransfer".split(" "),
            process: function(event, originalEvent) {
                var pointer, fromElement, which;
                fromElement = originalEvent.fromElement;
                which = originalEvent.button;
                if (event.pageX === null && originalEvent.clientX !== null) {
                    pointer = event.target.ownerDocument || document;
                    pointer = pointer.documentElement || pointer.body;
                    event.pageX = originalEvent.clientX + (pointer.scrollLeft || 0) - (pointer.clientLeft || 0);
                    event.pageY = originalEvent.clientY + (pointer.scrollTop || 0) - (pointer.clientTop || 0);
                }
                if (!event.relatedTarget && fromElement) {
                    event.relatedTarget = fromElement === event.target ? originalEvent.toElement : fromElement;
                }
                if (!event.which && which !== undefined) {
                    event.which = which & 1 ? 1 : which & 2 ? 3 : which & 4 ? 2 : 0;
                }
            }
        },
        key: {
            regex: new RegExp("^(?:key)"),
            properties: "char charCode key keyCode".split(" "),
            process: function(event, originalEvent) {
                if (event.which === null) {
                    event.which = originalEvent.charCode !== null ? originalEvent.charCode : originalEvent.keyCode;
                }
            }
        }
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
        process: function(event, originalEvent) {
            var id, hook, isMatch;
            for (id in hooks) {
                hook = hooks[id];
                isMatch = !hook.regex || hook.regex.test(originalEvent.type);
                if (isMatch) {
                    if (hook.properties) {
                        transferProperties(event, originalEvent, hook.properties);
                    }
                    if (hook.process) {
                        hook.process(event, originalEvent);
                    }
                    if (hook.delegate) {
                        event.delegate = hook.delegate;
                    }
                }
            }
        }
    });
}, this);
(function(definition, global) {
    var dependencies = [ "../base", "../support" ];
    if (!global.getComputedStyle) {
        dependencies.push("../polyfill/window/getcomputedstyle");
    }
    global.qoopido.registerSingleton("hook/css", definition, dependencies);
})(function(modules, shared, global, undefined) {
    "use strict";
    var mSupport = modules["support"], getComputedStyle = global.getComputedStyle || modules["polyfill/window/getcomputedstyle"], hooks = {
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
}, this);
(function(definition, global) {
    global.qoopido.register("dom/event", definition, [ "../base", "../hook/event" ]);
})(function(modules, shared, global, undefined) {
    "use strict";
    var hooks = modules["hook/event"];
    return modules["base"].extend({
        originalEvent: null,
        isDelegate: false,
        isDefaultPrevented: false,
        isPropagationStopped: false,
        isImmediatePropagationStopped: false,
        _properties: null,
        _constructor: function(event) {
            var self = this;
            self._properties = [];
            self._obtain(event);
            return self;
        },
        _obtain: function(event) {
            hooks.process(this, event);
        },
        _dispose: function() {
            var self = this, i = 0, property;
            for (;(property = self._properties[i]) !== undefined; i++) {
                delete self[property];
            }
            delete self.delegate;
            self.originalEvent = null;
            self.isDelegate = false;
            self.isDefaultPrevented = false;
            self.isPropagationStopped = false;
            self.isImmediatePropagationStopped = false;
            self._properties.length = 0;
        },
        preventDefault: function() {
            var self = this, event = self.originalEvent;
            if (event.cancelable !== false) {
                self.isDefaultPrevented = true;
                if (event.preventDefault) {
                    event.preventDefault();
                } else {
                    event.returnValue = false;
                }
            }
        },
        stopPropagation: function() {
            var self = this, event = self.originalEvent;
            self.isPropagationStopped = true;
            if (event.stopPropagation) {
                event.stopPropagation();
            }
            event.cancelBubble = true;
        },
        stopImmediatePropagation: function() {
            var self = this, event = self.originalEvent;
            self.isImmediatePropagationStopped = true;
            if (event.stopImmediatePropagation) {
                event.stopImmediatePropagation();
            }
            self.stopPropagation();
        }
    });
}, this);
(function(definition, global) {
    var dependencies = [ "../base", "../function/unique/uuid", "../hook/css", "./event" ];
    if (!global.CustomEvent) {
        dependencies.push("../polyfill/window/customevent");
    }
    if (!global.addEventListener) {
        dependencies.push("../polyfill/window/addeventlistener");
    }
    if (!global.removeEventListener) {
        dependencies.push("../polyfill/window/removeeventlistener");
    }
    if (!global.dispatchEvent) {
        dependencies.push("../polyfill/window/dispatchevent");
    }
    if (!Element.prototype.matches) {
        dependencies.push("../polyfill/element/matches");
    }
    if (!document.querySelector) {
        dependencies.push("../polyfill/document/queryselector");
    }
    if (!document.querySelectorAll) {
        dependencies.push("../polyfill/document/queryselectorall");
    }
    if (!String.prototype.trim) {
        dependencies.push("../polyfill/string/trim");
    }
    global.qoopido.register("dom/element", definition, dependencies);
})(function(modules, shared, global, undefined) {
    "use strict";
    var document = global.document, stringObject = "object", stringString = "string", generateUuid = modules["function/unique/uuid"], head = document.getElementsByTagName("head")[0], contentAttribute = "textContent" in document.createElement("a") ? "textContent" : "innerText", previousSibling = typeof head.previousElementSibling !== "undefined" ? function previousSibling() {
        return this.previousElementSibling;
    } : function previousSibling() {
        var element = this;
        while (element = element.previousSibling) {
            if (element.nodeType === 1) {
                return element;
            }
        }
    }, nextSibling = typeof head.nextElementSibling !== "undefined" ? function nextSibling() {
        return this.nextElementSibling;
    } : function nextSibling() {
        var element = this;
        while (element = element.nextSibling) {
            if (element.nodeType === 1) {
                return element;
            }
        }
    }, isTag = new RegExp("^<(\\w+)\\s*/>$"), matchEvent = new RegExp("^[^-]+"), splitList = new RegExp(" +", "g"), pool = modules["pool/module"] && modules["pool/module"].create(modules["dom/event"], null, true) || null, hooks = modules["hook/css"], storage = {}, events = {
        custom: {
            type: "CustomEvent",
            method: "initCustomEvent"
        },
        html: {
            regex: new RegExp("^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$"),
            type: "HTMLEvents",
            method: "initEvent"
        },
        mouse: {
            regex: new RegExp("^(?:mouse|pointer|contextmenu|touch|click|dblclick|drag|drop)"),
            type: "MouseEvents",
            method: "initMouseEvent"
        }
    };
    function resolveEvent(type) {
        var id, prototype, candidate;
        for (id in events) {
            prototype = events[id];
            if (!prototype.regex || prototype.regex.test(type)) {
                candidate = prototype;
            }
        }
        return candidate;
    }
    function emitEvent(type, detail, uuid) {
        var self = this, prototype = resolveEvent(type), event = document.createEvent(prototype.type);
        event[prototype.method](type, type === "load" ? false : true, true, detail);
        if (uuid) {
            event._quid = uuid;
            event.isDelegate = true;
        }
        self.element.dispatchEvent(event);
    }
    function resolveElement(element) {
        var tag;
        if (typeof element === "string") {
            try {
                if (isTag.test(element) === true) {
                    tag = element.replace(isTag, "$1").toLowerCase();
                    element = document.createElement(tag);
                } else {
                    element = document.querySelector(element);
                }
            } catch (exception) {
                element = null;
            }
        }
        if (!element) {
            throw new Error("[Qoopido.js] Element could not be resolved");
        }
        return element;
    }
    function resolveArguments(parameters) {
        return Array.prototype.concat.apply([], Array.prototype.splice.call(parameters, 0)).join(" ").split(splitList);
    }
    function matchesDelegate(event, delegate) {
        var i = 0, pointer;
        for (;(pointer = event.path[i]) !== undefined; i++) {
            if (pointer.matches(delegate)) {
                event.currentTarget = pointer;
                return true;
            }
            if (pointer === event.currentTarget) {
                break;
            }
        }
        return false;
    }
    return modules["base"].extend({
        type: null,
        element: null,
        _listener: null,
        _constructor: function(element, attributes, styles) {
            var self = this, uuid;
            element = resolveElement(element);
            uuid = element._quid;
            if (!uuid) {
                uuid = element._quid = generateUuid();
                self.type = element.tagName;
                self.element = element;
                self._listener = {};
                storage[uuid] = self;
            } else {
                self = storage[uuid];
            }
            if (typeof attributes === "object" && attributes !== null) {
                self.setAttributes(attributes);
            }
            if (typeof styles === "object" && styles !== null) {
                self.setStyles(styles);
            }
            if (self !== this) {
                this.dispose && this.dispose();
            }
            return self;
        },
        _obtain: function(element, attributes, styles) {
            this._constructor(element, attributes, styles);
        },
        _dispose: function() {
            var self = this, id, event;
            for (id in self._listener) {
                event = id.match(matchEvent);
                self.element.removeEventListener(event, self._listener[id]);
                delete self._listener[id];
            }
            self.type = null;
            self.element = null;
        },
        getContent: function(html) {
            var element = this.element;
            return html && html !== false ? element.innerHTML : element[contentAttribute];
        },
        setContent: function(content, html) {
            var self = this, element = self.element;
            if (html && html !== false) {
                element.innerHTML = content;
            } else {
                element[contentAttribute] = content;
            }
            return self;
        },
        getAttribute: function(attribute) {
            var self = this;
            if (attribute && typeof attribute === stringString) {
                return self.element.getAttribute(attribute);
            }
        },
        getAttributes: function() {
            var self = this, result = {}, attributes = resolveArguments(arguments), i = 0, attribute;
            for (;(attribute = attributes[i]) !== undefined; i++) {
                result[attribute] = self.element.getAttribute(attribute);
            }
            return result;
        },
        setAttribute: function(attribute, value) {
            var self = this;
            if (attribute && typeof attribute === stringString) {
                self.element.setAttribute(attribute, value);
            }
            return self;
        },
        setAttributes: function(attributes) {
            var self = this, attribute;
            if (attributes && typeof attributes === stringObject && !attributes.length) {
                for (attribute in attributes) {
                    self.element.setAttribute(attribute, attributes[attribute]);
                }
            }
            return self;
        },
        removeAttribute: function(attribute) {
            var self = this;
            if (attribute && typeof attribute === stringString) {
                self.element.removeAttribute(attribute);
            }
            return self;
        },
        removeAttributes: function() {
            var self = this, attributes = resolveArguments(arguments), i = 0, attribute;
            for (;(attribute = attributes[i]) !== undefined; i++) {
                self.element.removeAttribute(attribute);
            }
            return self;
        },
        getStyle: function(property) {
            var self = this;
            if (property && typeof property === stringString) {
                return hooks.process("get", self.element, property);
            }
        },
        getStyles: function() {
            var self = this, result = {}, properties = resolveArguments(arguments), i = 0, property;
            for (;(property = properties[i]) !== undefined; i++) {
                result[property] = hooks.process("get", self.element, property);
            }
            return result;
        },
        setStyle: function(property, value) {
            var self = this;
            if (property && typeof property === stringString) {
                hooks.process("set", self.element, property, value);
            }
            return self;
        },
        setStyles: function(properties) {
            var self = this, property;
            if (properties && typeof properties === stringObject && !properties.length) {
                for (property in properties) {
                    hooks.process("set", self.element, property, properties[property]);
                }
            }
            return self;
        },
        removeStyle: function(property) {
            var self = this;
            if (property && typeof property === stringString) {
                self.setStyle(property, "");
            }
            return self;
        },
        removeStyles: function() {
            var self = this, properties = resolveArguments(arguments), i = 0, property;
            for (;(property = properties[i]) !== undefined; i++) {
                self.setStyle(property, "");
            }
            return self;
        },
        siblings: function(selector) {
            var element = this.element, pointer = element.parentNode.firstChild, siblings = [];
            for (;pointer; pointer = nextSibling.call(pointer)) {
                if (pointer !== element && (!selector || pointer.matches(selector))) {
                    siblings.push(pointer);
                }
            }
            return siblings;
        },
        siblingsBefore: function(selector) {
            var pointer = this.element.previousSibling, siblings = [];
            for (;pointer; pointer = previousSibling.call(pointer)) {
                if (!selector || pointer.matches(selector)) {
                    siblings.push(pointer);
                }
            }
            return siblings;
        },
        siblingsAfter: function(selector) {
            var pointer = this.element.nextSibling, siblings = [];
            for (;pointer; pointer = nextSibling.call(pointer)) {
                if (!selector || pointer.matches(selector)) {
                    siblings.push(pointer);
                }
            }
            return siblings;
        },
        previous: function(selector) {
            var pointer = previousSibling.call(this.element);
            if (!selector) {
                return pointer;
            } else {
                for (;pointer; pointer = previousSibling.call(pointer)) {
                    if (pointer.matches(selector)) {
                        return pointer;
                    }
                }
            }
        },
        next: function(selector) {
            var pointer = nextSibling.call(this.element);
            if (!selector) {
                return pointer;
            } else {
                for (;pointer; pointer = nextSibling.call(pointer)) {
                    if (pointer.matches(selector)) {
                        return pointer;
                    }
                }
            }
        },
        find: function(selector) {
            var self = this.element, uuid, matches;
            selector = selector.trim();
            if (selector.charAt(0) === ">") {
                uuid = self._quid;
                self.setAttribute("data-quid", uuid);
                selector = '[data-quid="' + uuid + '"] ' + selector;
                matches = self.parentNode.querySelectorAll(selector);
                self.removeAttribute("data-quid");
            } else {
                matches = self.querySelectorAll(selector);
            }
            return matches;
        },
        parent: function(selector) {
            var pointer;
            if (!selector) {
                return this.element.parentNode;
            } else {
                pointer = this.element;
                for (;pointer; pointer = pointer.parentNode) {
                    if (pointer.matches(selector)) {
                        return pointer;
                    }
                }
            }
        },
        parents: function(selector) {
            var pointer = this.element.parentNode, parents = [];
            for (;pointer; pointer = pointer.parentNode) {
                if (pointer.nodeType === 9) {
                    return parents;
                } else if (pointer.nodeType === 1) {
                    if (!selector || pointer.matches(selector)) {
                        parents.push(pointer);
                    }
                }
            }
        },
        isVisible: function() {
            var self = this, element = self.element;
            return !(element.offsetWidth <= 0 && element.offsetHeight <= 0 || self.getStyle("visibility") === "hidden" || self.getStyle("opacity") <= 0);
        },
        hasClass: function(name) {
            return name ? new RegExp("(?:^|\\s)" + name + "(?:\\s|$)").test(this.element.className) : false;
        },
        addClass: function(name) {
            var self = this;
            if (name && !self.hasClass(name)) {
                self.element.className += self.element.className ? " " + name : name;
            }
            return self;
        },
        removeClass: function(name) {
            var self = this;
            if (name && self.hasClass(name)) {
                self.element.className = self.element.className.replace(new RegExp("(?:^|\\s)" + name + "(?!\\S)"), "");
            }
            return self;
        },
        toggleClass: function(name) {
            var self = this;
            if (name) {
                self.hasClass(name) ? self.removeClass(name) : self.addClass(name);
            }
            return self;
        },
        prepend: function(element) {
            var self = this, target = self.element;
            if (element) {
                try {
                    element = element.element || resolveElement(element);
                    target.firstChild ? target.insertBefore(element, target.firstChild) : self.append(element);
                } catch (exception) {
                    target.insertAdjacentHTML("afterBegin", element);
                }
            }
            return self;
        },
        append: function(element) {
            var self = this, target = self.element;
            if (element) {
                try {
                    target.appendChild(element.element || resolveElement(element));
                } catch (exception) {
                    target.insertAdjacentHTML("beforeEnd", element);
                }
            }
            return self;
        },
        prependTo: function(target) {
            var self = this, element = self.element;
            if (target) {
                (target = target.element || resolveElement(target)).firstChild ? target.insertBefore(element, target.firstChild) : self.appendTo(target);
            }
            return self;
        },
        appendTo: function(target) {
            var self = this;
            if (target) {
                (target.element || resolveElement(target)).appendChild(self.element);
            }
            return self;
        },
        insertBefore: function(target) {
            var self = this, element = self.element;
            if (target) {
                (target = target.element || resolveElement(target)).parentNode.insertBefore(element, target);
            }
            return self;
        },
        insertAfter: function(target) {
            var self = this, element = self.element;
            if (target) {
                (target = target.element || resolveElement(target)).nextSibling ? target.parentNode.insertBefore(element, target.nextSibling) : self.appendTo(target.parentNode);
            }
            return self;
        },
        replace: function(target) {
            var self = this, element = self.element;
            if (target) {
                (target = target.element || resolveElement(target)).parentNode.replaceChild(element, target);
            }
            return self;
        },
        replaceWith: function(element) {
            var self = this, target = self.element;
            if (element) {
                element = element.element || resolveElement(element);
                target.parentNode.replaceChild(element, target);
            }
            return self;
        },
        remove: function() {
            var self = this, element = self.element;
            element.parentNode.removeChild(element);
            return self;
        },
        on: function(events) {
            var self = this, element = self.element, delegate = arguments.length > 2 ? arguments[1] : null, fn = arguments.length > 2 ? arguments[2] : arguments[1], uuid = fn._quid || (fn._quid = generateUuid()), i = 0, event;
            events = events.split(" ");
            for (;(event = events[i]) !== undefined; i++) {
                var id = event + "-" + uuid, listener = function(event) {
                    var delegateTo;
                    event = pool && pool.obtain(event) || modules["dom/event"].create(event);
                    if (!event.isPropagationStopped) {
                        delegateTo = event.delegate;
                        event._quid = generateUuid();
                        if (!delegate || matchesDelegate(event, delegate)) {
                            fn.call(event.currentTarget, event, event.originalEvent.detail);
                        }
                        if (delegateTo) {
                            delete event.delegate;
                            emitEvent.call(self, delegateTo);
                        }
                    }
                    event.dispose && event.dispose();
                };
                listener.type = event;
                self._listener[id] = listener;
                element.addEventListener(event, listener);
            }
            return self;
        },
        one: function(events) {
            var self = this, delegate = arguments.length > 3 || typeof arguments[1] === "string" ? arguments[1] : null, fn = arguments.length > 3 || typeof arguments[2] === "function" ? arguments[2] : arguments[1], each = (arguments.length > 3 ? arguments[3] : arguments[2]) !== false, listener = function(event) {
                self.off(each === true ? event.type : events, listener);
                fn.call(this, event, event.originalEvent.detail);
            };
            fn._quid = listener._quid = generateUuid();
            if (delegate) {
                self.on(events, delegate, listener);
            } else {
                self.on(events, listener);
            }
            return self;
        },
        off: function(events, fn) {
            var self = this, element = self.element, i = 0, event, id, listener;
            events = events.split(" ");
            for (;(event = events[i]) !== undefined; i++) {
                id = fn._quid && event + "-" + fn._quid || null;
                listener = id && self._listener[id] || null;
                if (listener) {
                    element.removeEventListener(event, listener);
                    delete self._listener[id];
                } else {
                    element.removeEventListener(event, fn);
                }
            }
            return self;
        },
        emit: function(event, data) {
            var self = this;
            emitEvent.call(self, event, data);
            return self;
        }
    });
}, this);
(function(definition, global) {
    global.qoopido.registerSingleton("url", definition, [ "./base" ]);
})(function(modules, shared, global, undefined) {
    "use strict";
    var regexParameter = new RegExp("[?&]?([^=]+)=([^&]*)", "g"), urlCurrent, regexLocal;
    try {
        urlCurrent = location;
    } catch (exception) {
        urlCurrent = getResolver();
    }
    regexLocal = new RegExp("".concat("^", urlCurrent.protocol, "//", urlCurrent.hostname), "i");
    function getResolver(url) {
        var resolver = document.createElement("a");
        resolver.href = url || "";
        return resolver;
    }
    return modules["base"].extend({
        resolve: function(url) {
            return getResolver(url).href;
        },
        redirect: function redirect(url, target) {
            target = target || global;
            target.location.href = this.resolve(url);
        },
        getParameter: function(url) {
            var params = {}, querystring = getResolver(url).search.split("+").join(" "), tokens;
            while (tokens = regexParameter.exec(querystring)) {
                params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
            }
            return params;
        },
        isLocal: function(url) {
            return regexLocal.test(this.resolve(url));
        }
    });
}, this);
(function(definition, global) {
    global.qoopido.register("transport", definition, [ "./base", "./function/merge" ]);
})(function(modules, shared, global, undefined) {
    "use strict";
    var prototype;
    prototype = modules["base"].extend({
        setup: function(options) {
            var self = this;
            self._settings = modules["function/merge"]({}, self._settings, options);
            return self;
        },
        serialize: function(obj, prefix) {
            var parameter = [], id, key, value;
            for (id in obj) {
                key = prefix ? "".concat(prefix, "[", id, "]") : id;
                value = obj[id];
                parameter.push(typeof value === "object" ? this.serialize(value, key) : "".concat(encodeURIComponent(key), "=", encodeURIComponent(value)));
            }
            return parameter.join("&");
        }
    });
    return prototype;
}, this);
(function(definition, global) {
    global.qoopido.registerSingleton("transport/xhr", definition, [ "../transport", "../function/merge", "../function/unique/string", "../url", "../promise/defer" ]);
})(function(modules, shared, global, undefined) {
    "use strict";
    var prototype, DeferredPromise = modules["promise/defer"], getXhr = typeof global.XMLHttpRequest !== "undefined" ? function(url) {
        if (modules["url"].isLocal(url)) {
            return new global.XMLHttpRequest();
        } else {
            return global.XDomainRequest ? new global.XDomainRequest() : new global.XMLHttpRequest();
        }
    } : function() {
        try {
            return new ActiveXObject("MSXML2.XMLHTTP.3.0");
        } catch (exception) {
            return null;
        }
    };
    function sendRequest(method, url, content) {
        var self = this, xhr = self.xhr, settings = self.settings, id;
        url = settings.cache === false ? "".concat(url, url.indexOf("?") > -1 ? "&" : "?", "_=" + new Date().getTime()) : url;
        url = content && method === "GET" ? "".concat(url, url.indexOf("?") > -1 ? "&" : "?", content) : url;
        for (id in settings.xhrOptions) {
            xhr[id] = settings.xhrOptions[id];
        }
        xhr.open(method, url, settings.async, settings.username, settings.password);
        if (xhr.setRequestHeader) {
            xhr.setRequestHeader("Accept", settings.accept);
            if (content && method !== "GET") {
                xhr.setRequestHeader("Content-Type", settings.contentType);
            }
            for (id in settings.header) {
                xhr.setRequestHeader(id, settings.header[id]);
            }
        }
        xhr.timeout = settings.timeout;
        xhr.onprogress = function(event) {
            onProgress.call(self, event);
        };
        xhr.onreadystatechange = xhr.onload = function() {
            onReadyStateChange.call(self);
        };
        xhr.onerror = function() {
            onError.call(self);
        };
        xhr.send(content || null);
        self.timeout = setTimeout(function() {
            onTimeout.call(self);
        }, settings.timeout);
    }
    function onProgress(event) {
        var self = this;
        if (self.timeout) {
            clearTimeout(self.timeout);
        }
        self.timeout = setTimeout(function() {
            onTimeout.call(self);
        }, self.settings.timeout);
    }
    function onReadyStateChange() {
        var self = this, xhr = self.xhr, dfd = self.dfd;
        if (xhr.readyState === undefined || xhr.readyState === 4) {
            clear.call(self);
            if (xhr.status === undefined || xhr.status === 200) {
                dfd.resolve({
                    data: xhr.responseText,
                    xhr: xhr
                });
            } else {
                dfd.reject({
                    status: xhr.status,
                    xhr: xhr
                });
            }
        }
    }
    function onError() {
        var self = this;
        clear.call(self);
        self.dfd.reject();
    }
    function onTimeout() {
        var self = this;
        self.xhr.abort();
        clear.call(self);
        self.dfd.reject();
    }
    function clear() {
        var self = this, xhr = self.xhr;
        if (self.timeout) {
            clearTimeout(self.timeout);
        }
        xhr.onprogress = xhr.onreadystatechange = xhr.onerror = null;
    }
    prototype = modules["transport"].extend({
        _settings: {
            accept: "*/*",
            timeout: 5e3,
            async: true,
            cache: false,
            header: {},
            username: null,
            password: null,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8 ",
            xhrOptions: {}
        },
        load: function(method, url, data, options) {
            var context = {};
            url = modules["url"].resolve(url);
            context.url = url;
            context.id = "".concat("xhr-", modules["function/unique/string"]());
            context.dfd = new DeferredPromise();
            context.xhr = getXhr(url);
            context.settings = modules["function/merge"]({}, this._settings, options);
            context.timeout = null;
            sendRequest.call(context, method.toUpperCase(), url, data);
            return context.dfd.promise;
        },
        get: function(url, data, options) {
            return this.load("GET", url, data, options);
        },
        post: function(url, data, options) {
            return this.load("POST", url, data, options);
        },
        put: function(url, data, options) {
            return this.load("PUT", url, data, options);
        },
        "delete": function(url, data, options) {
            return this.load("DELETE", url, data, options);
        },
        head: function(url, data, options) {
            return this.load("HEAD", url, data, options);
        }
    });
    return prototype;
}, this);
(function(definition, global) {
    var dependencies = [ "../element", "../../proxy", "../../function/merge", "../../url", "../../support", "../../support/capability/datauri", "../../support/element/canvas/todataurl/png", "../../transport/xhr" ];
    global.qoopido.register("dom/element/shrinkimage", definition, dependencies);
})(function(modules, shared, global, undefined) {
    "use strict";
    var document = global.document, JSON = global.JSON, defaults = {
        attribute: "data-shrinkimage",
        quality: 80,
        debug: false
    }, pool = shared.pool && shared.pool.dom || null, lookup = {}, regexBackground = new RegExp('^url\\x28"{0,1}data:image/shrink,(.+?)"{0,1}\\x29$', "i"), regexPath = new RegExp('^(?:url\\x28"{0,1}|)(?:data:image/shrink,|)(.+?)(?:"{0,1}\\x29|)$', "i"), regexSuffix = new RegExp("\\.png$", "i"), supported = modules["support"].testMultiple("/capability/datauri", "/element/canvas/todataurl/png"), prototype, loader, EVENT_QUEUED = "queued", EVENT_CACHED = "cached", EVENT_LOADED = "loaded", EVENT_FAILED = "failed", EVENT_STATE = "".concat(EVENT_LOADED, " ", EVENT_FAILED), DOM_LOAD = "load", DOM_ERROR = "error", DOM_STATE = "".concat(DOM_LOAD, " ", DOM_ERROR);
    function processMain(url, isBackground) {
        url = modules["url"].resolve(regexPath.exec(url)[1]);
        isBackground = isBackground === true;
        var self = this, settings = modules["function/merge"]({}, self._settings, modules["url"].getParameter(url)), target = settings.target || (url = url.split("?")[0]).replace(regexSuffix, "".concat(".q", settings.quality, ".shrunk"));
        if (!isBackground) {
            self.removeAttribute(self._settings.attribute).hide();
        }
        supported.then(function() {
            if (settings.debug === true) {
                throw new Error("[Qoopido.js] Debug enabled");
            }
            switch (typeof lookup[target]) {
              case "object":
                lookup[target].one(EVENT_LOADED, function(event) {
                    assign.call(self, event.data, isBackground);
                });
                self.emit(EVENT_QUEUED);
                break;

              case "string":
                assign.call(self, lookup[target], isBackground);
                break;

              default:
                lookup[target] = loader.create(target, !isBackground ? self.element : null).one(EVENT_STATE, function(event, data) {
                    if (event.type === EVENT_LOADED) {
                        lookup[target] = data;
                        self.emit(EVENT_CACHED);
                        assign.call(self, data, isBackground);
                    } else {
                        lookup[target] = url;
                        assign.call(self, url, isBackground);
                    }
                }, false);
                break;
            }
        })["catch"](function() {
            lookup[target] = url;
            assign.call(self, url, isBackground);
        });
    }
    function assign(source, isBackground) {
        var self = this;
        if (isBackground) {
            self.setStyle("backgroundImage", "url(" + source + ")");
            self.emit(EVENT_LOADED);
        } else {
            self.one(DOM_LOAD, function() {
                self.show();
                self.emit(EVENT_LOADED);
            }).setAttribute("src", source);
        }
    }
    function processTransport(transport) {
        var self = this;
        transport.get(self._url).then(function(response) {
            try {
                var data = JSON.parse(response.data);
                data.width = parseInt(data.width, 10);
                data.height = parseInt(data.height, 10);
                processData.call(self, data);
            } catch (exception) {
                self.emit(EVENT_FAILED);
            }
        }, function() {
            self.emit(EVENT_FAILED);
        });
    }
    function processData(data) {
        var canvas, context, self = this, onLoadMain = function(event) {
            canvas = pool && pool.obtain("canvas") || document.createElement("canvas");
            canvas.style.display = "none";
            canvas.width = data.width;
            canvas.height = data.height;
            context = canvas.getContext("2d");
            context.clearRect(0, 0, data.width, data.height);
            context.drawImage(self.element, 0, 0, data.width, data.height);
            self.one(DOM_LOAD, onLoadAlpha).setAttribute("src", data.alpha);
            return suppressEvent(event);
        }, onLoadAlpha = function(event) {
            var result;
            context.globalCompositeOperation = "xor";
            context.drawImage(self.element, 0, 0, data.width, data.height);
            result = canvas.toDataURL("image/png");
            dispose();
            self.emit(EVENT_LOADED, result);
            return suppressEvent(event);
        }, dispose = function() {
            if (canvas) {
                canvas.dispose && canvas.dispose();
            }
            self.element.dispose && self.element.dispose();
        };
        self.one(DOM_STATE, function(event) {
            if (event.type === DOM_LOAD) {
                onLoadMain.call(this, event);
            } else {
                dispose();
                self.emit(EVENT_FAILED);
            }
        }, false).setAttribute("src", data.main);
    }
    function suppressEvent(event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    }
    prototype = modules["dom/element"].extend({
        _constructor: function(element, settings) {
            var self = prototype._parent._constructor.call(this, element), foreground, background;
            self._settings = settings = modules["function/merge"]({}, defaults, settings);
            foreground = self.getAttribute(settings.attribute);
            background = self.getStyle("backgroundImage");
            if (self.type === "IMG") {
                processMain.call(self, foreground);
            }
            if (background !== "none" && regexBackground.test(background)) {
                processMain.call(self, background, true);
            }
            return self;
        },
        hide: function() {
            this.setStyles({
                visibility: "hidden",
                opacity: 0
            });
        },
        show: function() {
            this.setStyles({
                visibility: "",
                opacity: ""
            });
        }
    });
    loader = modules["dom/element"].extend({
        _url: null,
        _constructor: function(url, element) {
            var self;
            if (!element) {
                element = pool && pool.obtain("img") || document.createElement("img");
            }
            self = loader._parent._constructor.call(this, element);
            self._url = url;
            processTransport.call(self, modules["transport/xhr"]);
            return self;
        }
    });
    return prototype;
}, this);