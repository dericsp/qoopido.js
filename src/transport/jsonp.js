/*
 * Qoopido transport/jsonp
 *
 * Provides basic JSONP functionality
 *
 * Copyright (c) 2015 Dirk Lueth
 *
 * Dual licensed under the MIT and GPL licenses.
 *  - http://www.opensource.org/licenses/mit-license.php
 *  - http://www.gnu.org/copyleft/gpl.html
 *
 * @author Dirk Lueth <info@qoopido.com>
 *
 * @require ../url
 * @require ../transport
 * @require ../function/merge
 * @require ../function/unique/uuid
 * @require ../dom/element
 * @require ../promise/defer
 * @optional ./pool/dom
 */
;(function(definition, global) {
	global.qoopido.registerSingleton('transport/jsonp', definition, [ '../transport', '../function/merge', '../function/unique/uuid', '../url', '../dom/element', '../promise/defer' ]);
}(function(qoopido, global, undefined) {
	'use strict';

	var prototype,
		defaults     = qoopido.defaults('transport/jsonp', { callback: 'callback' }),
		document     = global.document,
		merge        = qoopido.module('function/merge'),
		uniqueString = qoopido.module('function/unique/string'),
		Url          = qoopido.module('url'),
		DomElement   = qoopido.module('dom/element'),
		PromiseDefer = qoopido.module('promise/defer'),
		pool         = qoopido.shared('pool/dom'),
		head         = document.getElementsByTagName('head')[0];

	function sendRequest(url, content) {
		var self     = this,
			dfd      = self.dfd,
			script   = self.script,
			settings = self.settings;

		content = (typeof content === 'object') ? self.serialize(content) : content;
		url     = ''.concat(url, (url.indexOf('?') > -1) ? '&' : '?', ''.concat(settings.callback, '=', self.id));
		url     = (settings.cache === false) ? ''.concat(url, (url.indexOf('?') > -1) ? '&' : '?', ''.concat('_=', new Date().getTime().toString())) : url;
		url     = (content) ? ''.concat(url, (url.indexOf('?') > -1) ? '&' : '?', content) : url;

		global[self.id] = function(data) {
			try {
				delete global[self.id];
			} catch (exception) {
				global[self.id] = null;
			}

			clear.call(self);
			dfd.resolve(data);
		};

		script
			.on('load readystatechange', function(event) {
				onReadyStateChange.call(self, event);
			})
			.one('error', function() {
				onError.call(self);
			})
			.setAttribute('src', url);

		head.appendChild(script.element);

		self.timeout = setTimeout(function() { onTimeout.call(self); }, settings.timeout);
	}

	function onReadyStateChange(event) {
		var self = this,
			dfd  = self.dfd;

		if(!event.readyState || event.readyState === 'loaded' || event.readyState === 'complete') {
			self.script.off() && self.script.element.dispose && self.script.element.dispose();
		}

		if(self.timeout) {
			clearTimeout(self.timeout);
		}

		self.timeout = setTimeout(function() { onTimeout.call(self); }, self.settings.timeout);

		dfd.notify(event);
	}

	function onError() {
		var self = this;

		clear.call(self);
		self.dfd.reject();
	}

	function onTimeout() {
		var self = this;

		clear.call(self);
		self.dfd.reject(false);
	}

	function clear() {
		var self = this;

		if(self.timeout) {
			clearTimeout(self.timeout);
		}

		self.script.off() && self.script.element.dispose && self.script.element.dispose();
	}

	prototype = qoopido.module('transport').extend({
		load: function(url, data, options) {
			var context = {};

			url = Url.resolve(url);

			context.id       = ''.concat('jsonp-', uniqueString());
			context.dfd      = new PromiseDefer();
			context.script   = DomElement.create(pool ? pool.obtain('script') : document.createElement('script'));
			context.settings = merge({}, qoopido.defaults('transport'), defaults, options);
			context.timeout  = null;

			context.script.setAttribute('async', true);

			sendRequest.call(context, url, data);

			return context.dfd.promise;
		}
	});

	return prototype;
}, this));