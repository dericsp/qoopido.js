/*!
* Qoopido.js library package
*
* version: 3.1.1
* date:    2013-10-17
* author:  Dirk Lueth <info@qoopido.com>
* website: https://github.com/dlueth/qoopido.js
*
* Copyright (c) 2013 Dirk Lueth
*
* Dual licensed under the MIT and GPL licenses.
*  - http://www.opensource.org/licenses/mit-license.php
*  - http://www.gnu.org/copyleft/gpl.html
*/
;(function(definition) {
	'use strict';

	if(typeof define === 'function' && define.amd) {
		define(definition);
	} else {
		definition();
	}
}(function() {
	'use strict';

	if(!Object.defineProperty || !(function () { try { Object.defineProperty({}, 'x', {}); return true; } catch (exception) { return false; } } ())) {
		var defineProperty = Object.defineProperty,
			defineGetter   = Object.prototype.__defineGetter__,
			defineSetter   = Object.prototype.__defineSetter__;

		Object.defineProperty = function(obj, prop, desc) {
			// In IE8 try built-in implementation for defining properties on DOM prototypes.
			if(defineProperty) { try { return defineProperty(obj, prop, desc); } catch (exception) {} }

			if(obj !== Object(obj)) {
				throw new TypeError('Object.defineProperty called on non-object');
			}

			if(defineGetter && ('get' in desc)) {
				defineGetter.call(obj, prop, desc.get);
			}

			if(defineSetter && ('set' in desc)) {
				defineSetter.call(obj, prop, desc.set);
			}

			if('value' in desc) {
				obj[prop] = desc.value;
			}

			return obj;
		};
	}
}));
;(function(definition) {
	'use strict';

	if(typeof define === 'function' && define.amd) {
		var dependencies = [];

		if(!Object.defineProperty || !(function () { try { Object.defineProperty({}, 'x', {}); return true; } catch (exception) { return false; } } ())) {
			dependencies.push('./defineproperty');
		}

		define(dependencies, definition);
	} else {
		definition();
	}
}(function() {
	'use strict';

	if(!Object.defineProperties) {
		Object.defineProperties = function(obj, properties) {
			if(obj !== Object(obj)) {
				throw new TypeError('Object.defineProperties called on non-object');
			}

			var name;

			for(name in properties) {
				if(Object.prototype.hasOwnProperty.call(properties, name)) {
					Object.defineProperty(obj, name, properties[name]);
				}
			}

			return obj;
		};
	}
}));
;(function(definition) {
	'use strict';

	if(typeof define === 'function' && define.amd) {
		var dependencies = [];

		if(!Object.defineProperties) {
			dependencies.push('./defineproperties');
		}

		define(dependencies, definition);
	} else {
		definition();
	}
}(function() {
	'use strict';

	if(!Object.create) {
		Object.create = function(prototype, properties) {
			if(typeof prototype !== 'object') {
				throw new TypeError();
			}

			function Constructor() {}
			Constructor.prototype = prototype;

			var obj = new Constructor();

			if(prototype) {
				obj.constructor = Constructor;
			}

			if(arguments.length > 1) {
				if(properties !== Object(properties)) {
					throw new TypeError();
				}

				Object.defineProperties(obj, properties);
			}

			return obj;
		};
	}
}));
;(function(definition) {
	'use strict';

	if(typeof define === 'function' && define.amd) {
		define(definition);
	} else {
		definition();
	}
}(function() {
	'use strict';

	if(!Object.getOwnPropertyDescriptor|| !(function () { try { Object.getOwnPropertyDescriptor({ x: 0 }, 'x'); return true; } catch (exception) { return false; } } ())) {
		var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

		Object.getOwnPropertyDescriptor = function(obj, property) {
			if(obj !== Object(obj)) {
				throw new TypeError();
			}

			try {
				return getOwnPropertyDescriptor.call(Object, obj, property);
			} catch (exception) {}

			if(Object.prototype.hasOwnProperty.call(obj, property)) {
				return {
					value:        obj[property],
					enumerable:   true,
					writable:     true,
					configurable: true
				};
			}
		};
	}
}));
;(function(pDefinition, window, document, undefined) {
	'use strict';

	function initialize(pNamespace, pDefinition, pArguments, pSingleton) {
		var namespace = pNamespace.split('/');

		if(modules[pNamespace]) {
			return modules[pNamespace];
		}

		pArguments = (pArguments) ? [].slice.call(pArguments, 0) : [];

		return modules[pNamespace] = (function() {
			return ((pSingleton === true) ? pDefinition.call(null, modules, pArguments, namespace, window, document, undefined).create() : pDefinition.call(null, modules, pArguments, namespace, window, document, undefined));
		})();
	}

	var id      = 'qoopido',
		root    = window[id] = window[id] || { initialize: initialize },
		shared  = root.shared  = root.shared || {},
		modules = root.modules = root.modules || {};

	function definition() {
		return initialize('base', pDefinition);
	}

	if(typeof define === 'function' && define.amd) {
		var dependencies = [];

		if(!Object.create) {
			dependencies.push('./polyfill/object/create');
		}

		if(!Object.getOwnPropertyNames) {
			dependencies.push('./polyfill/object/getownpropertynames');
		}

		if(!Object.getOwnPropertyDescriptor|| !(function () { try { Object.getOwnPropertyDescriptor({ x: 0 }, 'x'); return true; } catch (exception) { return false; } } ())) {
			dependencies.push('./polyfill/object/getownpropertydescriptor');
		}

		define(dependencies, definition);
	} else {
		definition();
	}
}(
	function(modules, dependencies, namespace, window, document, undefined) {
		'use strict';

		function getOwnPropertyDescriptors(object) {
			var descriptors = {},
				properties  = Object.getOwnPropertyNames(object),
				i, property;

			for(i = 0; (property = properties[i]) !== undefined; i++) {
				descriptors[property] = Object.getOwnPropertyDescriptor(object, property);
			}

			return descriptors;
		}

		return {
			create: function() {
				var instance = Object.create(this, getOwnPropertyDescriptors(this)),
					result;

				if(instance._constructor) {
					result = instance._constructor.apply(instance, arguments);
				}

				instance.create = instance.extend = undefined;

				return result || instance;
			},
			extend: function(properties) {
				properties         = properties || {};
				properties._parent = this;

				return Object.create(this, getOwnPropertyDescriptors(properties));
			}
		};
	},
	window, document
));
;(function(pDefinition, window) {
	'use strict';

	function definition() {
		return window.qoopido.initialize('proxy', pDefinition);
	}

	if(typeof define === 'function' && define.amd) {
		define([ './base', './function/unique/uuid' ], definition);
	} else {
		definition();
	}
}(function(modules) {
	'use strict';

	return modules['base'].extend({
		_constructor: function(context, fn) {
			var args  = Array.prototype.splice.call(arguments, 2),
				proxy = function() {
					return fn.apply(context, Array.prototype.slice.call(arguments, 0).concat(args));
				};

			proxy._quid = modules['function/unique/uuid']();

			return proxy;
		}
	});
}, window));
;(function(pDefinition, window) {
	'use strict';

	function definition() {
		return window.qoopido.initialize('dom/element', pDefinition, arguments);
	}

	if(typeof define === 'function' && define.amd) {
		var dependencies = [ '../base', '../proxy' ];

		if(!window.getComputedStyle) {
			dependencies.push('../polyfill/window/getcomputedstyle');
		}

		define(dependencies, definition);
	} else {
		definition();
	}
}(
	function(modules, dependencies, namespace, window, document, undefined) {
		'use strict';

		var onMethod, offMethod, emitMethod,
			stringObject = 'object',
			stringString = 'string';

		function normalizeEvent(event) {
			if(!event.target) {
				event.target = event.srcElement || document;
			}

			if(event.target.nodeType === 3) {
				event.target = event.target.parentNode;
			}

			if(!event.relatedTarget && event.fromElement ) {
				event.relatedTarget = (event.fromElement === event.target) ? event.toElement : event.fromElement;
			}

			return event;
		}

		onMethod = (window.addEventListener) ?
			function(name, fn) {
				var self    = this,
					element = self.element,
					luid    = ''.concat('listener[', name, '][', fn._quid || fn, ']');

				element[luid] = function(event) { fn.call(this, normalizeEvent(event)); };
				element.addEventListener(name, element[luid], false);
			}
			: function(name, fn) {
				var self    = this,
					element = self.element,
					luid    = ''.concat('listener[', name, '][', fn._quid || fn, ']');

				element[luid] = function() { fn.call(this, normalizeEvent(window.event)); };
				if(element['on' + name] !== undefined) {
					element.attachEvent('on' + name, element[luid]);
				} else {
					name = ''.concat('fake[', name, ']');

					element[name] = null;
					element.attachEvent('onpropertychange', function(event) {
						if(event.propertyName === name) {
							fn.call(this, normalizeEvent(element[name]));
						}
					});
				}
			};

		offMethod = (window.removeEventListener) ?
			function(name, fn) {
				var self    = this,
					element = self.element,
					luid    = ''.concat('listener[', name, '][', fn._quid || fn, ']');

				element.removeEventListener(name, element[luid], false);
				delete element[luid];
			}
			: function(name, fn) {
				var self    = this,
					element = self.element,
					luid    = ''.concat('listener[', name, '][', fn._quid || fn, ']');

				element.detachEvent('on' + name, element[luid]);
				delete element[luid];
			};

		emitMethod = (document.createEvent) ?
			function(type, data) {
				var self    = this,
					element = self.element,
					event   = document.createEvent('HTMLEvents');

				event.initEvent(type, true, true);
				event.data = data;
				element.dispatchEvent(event);
			}
			: function(type, data) {
				var self    = this,
					element = self.element,
					event   = document.createEventObject();

				event.type = event.eventType = type;
				event.data = data;

				try{
					element.fireEvent('on' + event.eventType, event);
				} catch(exception) {
					var name = ''.concat('fake[', type, ']');

					if(element[name] !== undefined) {
						element[name] = event;
					}
				}
			};

		return modules['base'].extend({
			type:     null,
			element:  null,
			listener: null,
			_constructor: function(element) {
				var self = this;

				if(!element) {
					throw new Error('Missing element argument');
				}

				self.type     = element.tagName;
				self.element  = element;
				self.listener = {};
			},
			getAttribute: function(attribute) {
				if(attribute && typeof attribute === stringString) {
					var self = this;

					attribute = attribute.split(' ');

					if(attribute.length === 1) {
						return self.element.getAttribute(attribute[0]);
					} else {
						return self.getAttributes(attribute);
					}
				}
			},
			getAttributes: function(attributes) {
				var self   = this,
					result = {};

				if(attributes) {
					attributes = (typeof attributes === stringString) ? attributes.split(' ') : attributes;

					if(typeof attributes === stringObject && attributes.length) {
						var i, attribute;

						for(i = 0; (attribute = attributes[i]) !== undefined; i++) {
							result[attribute] = self.element.getAttributes(attribute);
						}
					}
				}

				return result;
			},
			setAttribute: function(attribute, value) {
				var self = this;

				if(attribute && typeof attribute === stringString) {
					self.element.setAttribute(attribute, value);
				}

				return self;
			},
			setAttributes: function(attributes) {
				var self = this;

				if(attributes && typeof attributes === stringObject && !attributes.length) {
					var attribute;

					for(attribute in attributes) {
						self.element.setAttribute(attribute, attributes[attribute]);
					}
				}

				return self;
			},
			removeAttribute: function(attribute) {
				var self = this;

				if(attribute && typeof attribute === stringString) {
					attribute = attribute.split(' ');

					if(attribute.length === 1) {
						self.element.removeAttribute(attribute[0]);
					} else {
						self.removeAttributes(attribute);
					}
				}

				return self;
			},
			removeAttributes: function(attributes) {
				var self = this;

				if(attributes) {
					attributes = (typeof attributes === stringString) ? attributes.split(' ') : attributes;

					if(typeof attributes === stringObject && attributes.length) {
						var i, attribute;

						for(i = 0; (attribute = attributes[i]) !== undefined; i++) {
							self.element.removeAttribute(attribute);
						}
					}
				}

				return self;
			},
			getStyle: function(property) {
				if(property && typeof property === stringString) {
					var self = this;

					property = property.split(' ');

					if(property.length === 1) {
						return window.getComputedStyle(self.element, null).getPropertyValue(property[0]);
					} else {
						return self.getStyles(property);
					}
				}
			},
			getStyles: function(properties) {
				var self   = this,
					result = {};

				if(properties) {
					properties = (typeof properties === stringString) ? properties.split(' ') : properties;

					if(typeof properties === stringObject && properties.length) {
						var i, property;

						for(i = 0; (property = properties[i]) !== undefined; i++) {
							result[property] = window.getComputedStyle(self.element, null).getPropertyValue(property);
						}
					}
				}

				return result;
			},
			setStyle: function(property, value) {
				var self = this;

				if(property && typeof property === stringString) {
					self.element.style[property] = value;
				}

				return self;
			},
			setStyles: function(properties) {
				var self = this;

				if(properties && typeof properties === stringObject && !properties.length) {
					var property;

					for(property in properties) {
						self.element.style[property] = properties[property];
					}
				}

				return self;
			},
			isVisible: function() {
				var element = this.element;

				return !(element.offsetWidth <= 0 && element.offsetHeight <= 0);
			},
			on: function(events, fn) {
				var self = this,
					i, listener;

				events = events.split(' ');

				for(i = 0; (listener = events[i]) !== undefined; i++) {
					(self.listener[listener] = self.listener[listener] || []).push(fn);

					onMethod.call(self, listener, fn);
				}

				return self;
			},
			one: function(events, fn, each) {
				each = (each !== false);

				var self     = this,
					listener = modules['proxy'].create(self, function(event) {
						self.off(((each === true) ? event.type : events), listener);

						fn.call(self, event);
					});

				self.on(events, listener);

				return self;
			},
			off: function(events, fn) {
				var self = this,
					i, event, j, listener;

				if(events) {
					events = events.split(' ');

					for(i = 0; (event = events[i]) !== undefined; i++) {
						self.listener[event] = self.listener[event] || [];

						if(fn) {
							for(j = 0; (listener = self.listener[event][j]) !== undefined; j++) {
								if(listener === fn) {
									self.listener[event].splice(j, 1);
									offMethod.call(self, event, listener);

									j--;
								}
							}
						} else {
							while(self.listener[event].length > 0) {
								offMethod.call(self, event, self.listener[event].pop());
							}
						}
					}
				} else {
					for(event in self.listener) {
						while(self.listener[event].length > 0) {
							offMethod.call(self, event, self.listener[event].pop());
						}
					}
				}

				return self;
			},
			emit: function(event, data) {
				var self = this;

				emitMethod.call(self, event, data);

				return self;
			}
		});
	},
	window)
);
;(function(pDefinition, window) {
	'use strict';

	function definition() {
		return window.qoopido.initialize('function/merge', pDefinition, arguments);
	}

	if(typeof define === 'function' && define.amd) {
		define([ '../base' ], definition);
	} else {
		definition();
	}
}(function(modules, dependencies, namespace, window, document, undefined) {
	'use strict';

	return function merge() {
		var target = arguments[0],
			i, properties, property, tgt, src;

		for(i = 1; (properties = arguments[i]) !== undefined; i++) {
			for(property in properties) {
				tgt = target[property];
				src = properties[property];

				if(src !== undefined) {
					if(src !== null && typeof src === 'object') {
						if(src.length !== undefined) {
							tgt = (tgt && typeof tgt === 'object' && tgt.length !== undefined) ? tgt : [];
						} else {
							tgt = (tgt && typeof tgt === 'object' && tgt.length === undefined) ? tgt : {};
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
}, window));
;(function(pDefinition, window) {
	'use strict';

	function definition() {
		return window.qoopido.initialize('function/unique/uuid', pDefinition);
	}

	if(typeof define === 'function' && define.amd) {
		define([ './../../base' ], definition);
	} else {
		definition();
	}
}(function() {
	'use strict';

	var lookup     = {},
		regex      = new RegExp('[xy]', 'g');

	function generateUuid() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(regex, function(c) {
			var r = Math.random() * 16 | 0,
				v = (c === 'x') ? r : (r & 0x3 | 0x8);

			return v.toString(16);
		});
	}

	return function() {
		var result;

		do {
			result = generateUuid();
		} while(typeof lookup[result] !== 'undefined');

		lookup[result] = true;

		return result;
	};
}, window));
;(function(pDefinition, window) {
	'use strict';

	function definition() {
		return window.qoopido.initialize('dom/element/emerge', pDefinition, arguments);
	}

	if(typeof define === 'function' && define.amd) {
		define([ '../element', '../../function/merge', '../../function/unique/uuid' ], definition);
	} else {
		definition();
	}
}(function(modules, dependencies, namespace, window, document, undefined) {
	'use strict';

	var
	// variables
		defaults        = { interval: 50, threshold: 'auto', recur: true, auto: 0.5, visibility: true },
		documentElement = window.document.documentElement,
		viewport        = {},
		intervals       = {},
		elements        = {},

	// classes
		prototype,

	// events
		EVENT_EMERGED  = 'emerged',
		EVENT_DEMERGED = 'demerged',
		DOM_RESIZE     = 'resize orientationchange';

	window = modules['dom/element'].create(window);

	if(document.compatMode !== 'CSS1Compat') {
		throw('This script requires your browser to work in standards mode');
	}

	function tick(interval) {
		var index,
			pointer = elements[interval];

		for(index in pointer) {
			if(index !== 'length') {
				checkState.call(pointer[index]);
			}
		}

		if(pointer.length === 0) {
			window.element.clearInterval(intervals[interval]);

			delete intervals[interval];
		}
	}

	function globalOnResize() {
		viewport.left   = 0;
		viewport.top    = 0;
		viewport.right  = documentElement.clientWidth;
		viewport.bottom = documentElement.clientHeight;
	}

	function instanceOnResize() {
		var self = this,
			x    = self._settings.threshold || documentElement.clientWidth * self._settings.auto,
			y    = self._settings.threshold || documentElement.clientHeight * self._settings.auto;

		self._viewport.left   = viewport.left - x;
		self._viewport.top    = viewport.top - y;
		self._viewport.right  = viewport.right + x;
		self._viewport.bottom = viewport.bottom + y;
	}

	function checkState() {
		var self     = this,
			state    = false,
			priority = 2,
			boundaries;

		if(self.isVisible() && (self.getStyle('visibility') !== 'hidden' || self._settings.visibility === false)) {
			boundaries = self.element.getBoundingClientRect();

			if((boundaries.left >= self._viewport.left && boundaries.top >= self._viewport.top && boundaries.left <= self._viewport.right && boundaries.top <= self._viewport.bottom) || (boundaries.right >= self._viewport.left && boundaries.bottom >= self._viewport.top && boundaries.right <= self._viewport.right && boundaries.bottom <= self._viewport.bottom)) {
				if((boundaries.left >= viewport.left && boundaries.top >= viewport.top && boundaries.left <= viewport.right && boundaries.top <= viewport.bottom) || (boundaries.right >= viewport.left && boundaries.bottom >= viewport.top && boundaries.right <= viewport.right && boundaries.bottom <= viewport.bottom)) {
					priority = 1;
				}

				state = true;
			}
		}

		if(state !== self._state || (state === true && priority !== self._priority)) {
			setState.call(self, state, priority);
		}
	}

	function setState(state, priority) {
		var self = this;

		self._state    = state;
		self._priority = priority;

		if(self._settings.recur !== true) {
			self.remove();
		}

		if(state === true) {
			self.emit(EVENT_EMERGED, priority);
		} else {
			self.emit(EVENT_DEMERGED);
		}
	}

	prototype = modules['dom/element'].extend({
		_quid:     null,
		_viewport: null,
		_element:  null,
		_settings: null,
		_state:    null,
		_priority: null,
		_constructor: function(element, settings) {
			var self = this;

			prototype._parent._constructor.call(self, element);

			settings = modules['function/merge']({}, defaults, settings || {});

			if(settings.threshold === 'auto') {
				delete settings.threshold;
			}

			if(intervals[settings.interval] === undefined) {
				elements[settings.interval]  = elements[settings.interval] || { length: 0 };
				intervals[settings.interval] = window.element.setInterval(function() { tick(settings.interval); }, settings.interval);
			}

			self._quid     = modules['function/unique/uuid']();
			self._viewport = {};
			self._settings = settings;
			self._state    = false;
			self._priority = 2;

			elements[settings.interval][self._quid] = self;
			elements[settings.interval].length++;

			window.on(DOM_RESIZE, function() { instanceOnResize.call(self); });
			instanceOnResize.call(self);
		},
		remove: function() {
			var self = this;

			delete elements[self._settings.interval][self._quid];
			elements[self._settings.interval].length--;
		}
	});

	window.on(DOM_RESIZE, globalOnResize);
	globalOnResize();

	return prototype;
}, window));
;(function(pDefinition, window) {
	'use strict';

	function definition() {
		return window.qoopido.initialize('dom/element/lazyimage', pDefinition, arguments);
	}

	if(typeof define === 'function' && define.amd) {
		define([ './emerge', '../../function/merge' ], definition);
	} else {
		definition();
	}
}(function(modules, merge) {
	'use strict';

	var
	// variables
		defaults = { interval: 50, threshold: 'auto', attribute: 'data-lazyimage' },
		queue    = 0,

	// methods / classes
		prototype,

	// events
		EVENT_REQUESTED = 'requested',
		EVENT_LOADED    = 'loaded',
		EVENT_FAILED    = 'failed',
		EVENT_EMERGED   = 'emerged',
		DOM_LOAD        = 'load',
		DOM_ERROR       = 'error',
		DOM_STATE       = ''.concat(DOM_LOAD, ' ', DOM_ERROR);

	function load() {
		var self      = this,
			attribute = self._settings.attribute;

		queue += 1;

		self
			.emit(EVENT_REQUESTED)
			.one(DOM_STATE, function(event) {
				if(event.type === DOM_LOAD) {
					self.emit(EVENT_LOADED);
				} else {
					self.emit(EVENT_FAILED);
				}

				queue -= 1;
			}, false)
			.setAttribute('src', self.getAttribute(attribute))
			.removeAttribute(attribute);
	}

	prototype = modules['dom/element/emerge'].extend({
		_constructor: function(element, settings) {
			var self = this;

			prototype._parent._constructor.call(self, element, modules['function/merge']({}, defaults, settings || {}));

			self.on(EVENT_EMERGED, function onEmerge(event) {
				if(queue === 0 || event.data === 1) {
					self.remove();
					self.off(EVENT_EMERGED, onEmerge);

					load.call(self);
				}
			});
		}
	});

	return prototype;
}, window));