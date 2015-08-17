/*
 * Qoopido asset
 *
 * Asset loading via XHR with localstorage caching
 *
 * Copyright (c) 2015 Dirk Lueth
 *
 * Dual licensed under the MIT and GPL licenses.
 *  - http://www.opensource.org/licenses/mit-license.php
 *  - http://www.gnu.org/copyleft/gpl.html
 *
 * @author Dirk Lueth <info@qoopido.com>
 *
 * @require ./emitter
 * @require ./transport/xhr
 * @require ./promise/defer
 * @require ./function/unique/uuid
 */
;(function(definition, global) {
	global.qoopido.register('asset', definition, [ './emitter', './transport/xhr', './promise/defer', './function/unique/uuid' ]);
}(function(qoopido, global, undefined) {
	'use strict';

	var prototype,
		document     = global.document,
		lookup       = {},
		xhrOptions   = { cache: true },
		TransportXhr = qoopido.module('transport/xhr'),
		PromiseDefer = qoopido.module('promise/defer'),
		uniqueUuid   = qoopido.module('function/unique/uuid'),
		regex        = new RegExp('/', 'g'),
		queue        = [];

	function queueAdd(asset) {
		queue.push(asset);

		queue.length === 1 && queueProcess();
	}

	function queueProcess() {
		loadAsset(queue[0])
			.then(
				function() {
					queue.splice(0, 1) && queue.length >= 1 && queueProcess();
				},
				function() {
					queue.splice(0, 1) && queue.length >= 1 && queueProcess();
				}
			);
	}

	function loadAsset(asset) {
		var properties = lookup[asset._uuid],
			defered    = properties.dfd,
			url        = properties.url;

		return TransportXhr
			.get(url, null, xhrOptions)
			.then(
				function(transport) {
					var value   = transport.data,
						id      = properties.id,
						version = properties.version,
						storage = properties.storage;

					asset.emit('loaded', url, id, version, value);

					if(storage) {
						document.cookie               = properties.cookie + '=' + encodeURIComponent(version) + '; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/';
						localStorage[storage.version] = version;
						localStorage[storage.value]   = value;

						asset.emit('stored', url, id, version, value, storage.version, storage.value);
					}

					defered.resolve(localStorage[storage.value]);
				},
				function() {
					defered.reject();
				}
			);
	}

	prototype = qoopido.module('emitter').extend({
		_uuid: null,
		_constructor: function(url, id, version, prefix) {
			var self       = prototype._parent._constructor.call(this),
				uuid       = uniqueUuid(),
				properties = lookup[uuid] = { dfd: new PromiseDefer(), url: url };

			self._uuid = uuid;

			if(id && version) {
				properties.id      = (prefix || global.location.host) + ':' + id;
				properties.version = version;
				properties.cookie  = encodeURIComponent('qoopido[asset][' + id.replace(regex, '][') + ']');
				properties.storage = {
					version: '#' + id,
					access:  '@' + id,
					value:   '$' + id
				};

				self.on('hit stored', function() {
					localStorage[properties.storage.access] = new Date().getTime();
				});
			}

			return self;
		},
		fetch: function() {
			var self       = this,
				properties = lookup[self._uuid],
				defered    = properties.dfd,
				url        = properties.url,
				id         = properties.id,
				version    = properties.version,
				storage    = properties.storage,
				stored     = storage && storage.version && localStorage[storage.version];

			if(stored && stored >= version) {
				var value = localStorage[properties.storage.value];

				self.emit('hit', url, id, version, value);
				defered.resolve(value);
			} else {
				self.emit('miss', url, id, version);

				queueAdd(self);
			}

			return defered.promise;
		},
		clear: function() {
			var self       = this,
				properties = lookup[self._uuid],
				storage    = properties.storage;

			if(storage) {
				document.cookie = properties.cookie + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';

				delete localStorage[storage.version];
				delete localStorage[storage.access];
				delete localStorage[storage.value];

				self.emit('cleared', properties.url, properties.id, properties.version);
			}

			return self;
		}
	});

	return prototype;
}, this));