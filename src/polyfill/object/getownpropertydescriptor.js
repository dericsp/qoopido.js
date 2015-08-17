/*
 * Qoopido polyfill/object/getownpropertydescriptor
 *
 * Borrowed from:
 * https://github.com/inexorabletash/polyfill
 *
 * Copyright (c) 2015 Dirk Lueth
 *
 * Dual licensed under the MIT and GPL licenses.
 *  - http://www.opensource.org/licenses/mit-license.php
 *  - http://www.gnu.org/copyleft/gpl.html
 *
 * @author Dirk Lueth <info@qoopido.com>
 *
 * @browsers Chrome < 5, Firefox < 4, Internet Explorer < 8, Opera < 12, Safari < 5
 */
;(function(definition, qoopido) {
	if(qoopido.register) {
		qoopido.register('polyfill/object/getownpropertydescriptor', definition);
	} else {
		(qoopido.modules = qoopido.modules || {})['polyfill/object/getownpropertydescriptor'] = definition();
	}
}(function(qoopido, global, undefined) {
		'use strict';

		if(!Object.getOwnPropertyDescriptor || !(function () { try { Object.getOwnPropertyDescriptor({ x: 0 }, 'x'); return true; } catch (exception) { return false; } } ())) {
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

		return Object.getOwnPropertyDescriptor;
	},
	this.qoopido = this.qoopido || {}
));