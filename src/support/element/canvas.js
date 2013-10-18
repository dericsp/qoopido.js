/*
 * Qoopido support/element/canvas
 *
 * Copyright (c) 2013 Dirk Lueth
 *
 * Dual licensed under the MIT and GPL licenses.
 *  - http://www.opensource.org/licenses/mit-license.php
 *  - http://www.gnu.org/copyleft/gpl.html
 *
 * @author Dirk Lueth <info@qoopido.com>
 *
 * @require ../../support
 * @require ../../pool/dom
 */

;(function(definition) {
	window.qoopido.register('support/element/canvas', definition, [ '../../support', '../../pool/dom' ]);
}(function(modules, namespace, navigator, window, document, undefined) {
	'use strict';

	return modules['support'].addTest('/element/canvas', function(deferred) {
		var sample = window.qoopido.shared.pool.dom.obtain('canvas');

		(sample.getContext && sample.getContext('2d')) ? deferred.resolve() : deferred.reject();

		sample.dispose();
	});
}));