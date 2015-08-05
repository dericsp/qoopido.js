/*
 * Qoopido pool/module
 *
 * Provides module pooling facilities
 *
 * Copyright (c) 2014 Dirk Lueth
 *
 * Dual licensed under the MIT and GPL licenses.
 *  - http://www.opensource.org/licenses/mit-license.php
 *  - http://www.gnu.org/copyleft/gpl.html
 *
 * @author Dirk Lueth <info@qoopido.com>
 *
 * @require ../pool
 * @require ../function/unique/uuid
 */
;(function(definition) {
	window.qoopido.register('pool/module', definition, [ '../pool', '../function/unique/uuid' ]);
}(function(modules, shared, namespace, navigator, window, document, undefined) {
	'use strict';

	var generateUuid = modules['function/unique/uuid'];

	var prototype = modules['pool'].extend({
		_module:  null,
		_destroy: null,
		_constructor: function(module, options, useShared) {
			var self    = this,
				uuid    = module._puid || (module._puid = generateUuid()),
				pointer = useShared && (shared.pool || (shared.pool = {})) && (shared.pool.module || (shared.pool.module = {}));

			if(useShared === true && pointer[uuid]) {
				return pointer[uuid];
			} else {
				self = prototype._parent._constructor.call(this, options);

				self._module = module;

				if(typeof module._destroy === 'function') {
					self._destroy = function(element) {
						element._destroy();
					};
				}

				if(useShared === true) {
					pointer[uuid] = self;
				}
			}

			return self;
		},
		_dispose: function(element) {
			return element;
		},
		_obtain: function() {
			return this._module.create.apply(this._module, arguments);
		}
	});

	return prototype;
}));