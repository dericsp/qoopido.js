/*
 * Qoopido transport
 *
 * Provides basic transport functionality
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
 * @require ./function/merge
 */
;(function(definition, global) {
	global.qoopido.register('transport', definition, [ './base', './function/merge' ]);
}(function(qoopido, global, undefined) {
	'use strict';

	var prototype,
		merge = qoopido.module('function/merge');

	prototype = qoopido.module('base').extend({
		setup: function(options) {
			var self = this;

			self._settings = merge({}, self._settings, options);

			return self;
		},
		serialize: function(obj, prefix) {
			var parameter = [], id, key, value;

			for(id in obj) {
				key   = prefix ? ''.concat(prefix, '[', id, ']') : id;
				value = obj[id];

				parameter.push((typeof value === 'object') ? this.serialize(value, key) : ''.concat(encodeURIComponent(key), '=', encodeURIComponent(value)));
			}

			return parameter.join('&');
		}
	});

	return prototype;
}, this));