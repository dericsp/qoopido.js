/*
 * Qoopido emitter
 *
 * Provides mechanism to emit events and register listeners
 *
 * Copyright (c) 2015 Dirk Lueth
 *
 * Dual licensed under the MIT and GPL licenses.
 *  - http://www.opensource.org/licenses/mit-license.php
 *  - http://www.gnu.org/copyleft/gpl.html
 *
 * @author Dirk Lueth <info@qoopido.com>
 *
 * @require ./base
 */
;(function(definition, global) {
	global.qoopido.register('emitter', definition, [ './base' ]);
}(function(modules, shared, global, undefined) {
	'use strict';

	var excludeMethods = /^(_|extend$|create$|on$|one$|off$|emit$|get.+)/;

	function map(context, method) {
		var event = method.charAt(0).toUpperCase() + method.slice(1);

		context._mapped[method] = context[method];

		return function() {
			var args = Array.prototype.slice.call(arguments),
				returnValue;

			context.emit.apply(context, ['pre' + event, args]);
			returnValue = context._mapped[method].apply(context, args);
			context.emit.apply(context, ['post' + event, args, returnValue]);

			return returnValue;
		};
	}

	return modules['base'].extend({
		_mapped:   null,
		_listener: null,
		_temp:     null,
		_constructor: function() {
			var self = this,
				method;

			self._mapped   = {};
			self._listener = {};

			for(method in self) {
				if(typeof self[method] === 'function' && excludeMethods.test(method) === false) {
					self[method] = map(self, method);
				}
			}

			return self;
		},
		on: function(events, fn) {
			var self = this,
				i = 0, event;

			events = events.split(' ');

			for(; (event = events[i]) !== undefined; i++) {
				(self._listener[event] = self._listener[event] || []).push(fn);
			}

			return self;
		},
		one: function(events, fn, each) {
			each = (each !== false);

			var self = this;

			self.on(events, function listener(event) {
				self.off(((each === true) ? event : events), listener);

				fn.apply(this, arguments);
			});

			return self;
		},
		off: function(events, fn) {
			var self = this,
				i = 0, event, j, listener;

			if(events) {
				events = events.split(' ');

				for(; (event = events[i]) !== undefined; i++) {
					self._listener[event] = self._listener[event] || [];

					if(fn) {
						for(j = 0; (listener = self._listener[event][j]) !== undefined; j++) {
							if(listener === fn) {
								self._listener[event].splice(j, 1);

								j--;
							}
						}
					} else {
						self._listener[event].length = 0;
					}
				}
			} else {
				for(event in self._listener) {
					self._listener[event].length = 0;
				}
			}

			return self;
		},
		emit: function(event) {
			var self = this,
				i = 0, listener;

			if(event !== undefined) {
				self._listener[event] = self._listener[event] || [];
				self._temp            = self._listener[event].slice();

				for(; (listener = self._temp[i]) !== undefined; i++) {
					listener.apply(self, arguments);
				}

				self._temp.length = 0;
			}

			return self;
		}
	});
}, this));