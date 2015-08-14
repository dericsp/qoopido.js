/*
 * Qoopido support/element/video/ogg
 *
 * Copyright (c) 2015 Dirk Lueth
 *
 * Dual licensed under the MIT and GPL licenses.
 *  - http://www.opensource.org/licenses/mit-license.php
 *  - http://www.gnu.org/copyleft/gpl.html
 *
 * @author Dirk Lueth <info@qoopido.com>
 *
 * @require ../../../support
 * @require ../video
 */

;(function(definition, global) {
	global.qoopido.register('support/element/video/ogg', definition, [ '../../../support', '../video' ]);
}(function(modules, shared, global, undefined) {
	'use strict';

	var support = modules['support'];

	return support.addTest('/element/video/ogg', function(deferred) {
		modules['support/element/video']()
			.then(
				function() {
					var sample = support.pool ? support.pool.obtain('video') : document.createElement('video');

					(sample.canPlayType('video/ogg; codecs="theora, vorbis"')) ? deferred.resolve() : deferred.reject();

					sample.dispose && sample.dispose();
				},
				function() {
					deferred.reject();
				}
			);
	});
}, this));