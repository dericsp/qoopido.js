var settings = {
	width:      640,
	brightness: 0,
	contrast:   0,
	size:       8,
	space:      2,
	alpha:      100,
	radius:     2
};

;(function(window, document, undefined) {
	var TARGET_FRAMERATE  = 1000 / 60,
		MATH_PI_TIMES_TWO = 2 * Math.PI,
		options = {
			width:      0,
			height:     0,
			brightness: 0,
			contrast:   0,
			size:       0,
			space:      0,
			alpha:      0,
			radius:     0
		},
		qDocument = requestAnimationFrame = cancelAnimationFrame = visibilityProperty = video = iCanvas = iContext = sCanvas = sContext = tCanvas = tContext = methodURL = getUserMedia = interval = paused = imageCache = imageData = colorLookup = colorData = false,
		size = radius = factor = width = height = xOffset = yOffset = i = px = x = y = color = 0,
		hint = document.createElement('div');

	hint.className = 'hint';

	function requestAnimationFrameFallback(callback) {
		window.setTimeout(callback, TARGET_FRAMERATE);
	}

	function onVisibilityChange() {
		if(document[visibilityProperty]) {
			if(interval) {
				cancelAnimationFrame(interval);
				interval = null;
			}
		} else {
			if(!interval) {
				update();
			}
		}
	}

	function onSettingsChanged() {
		options.width      = settings.width;
		options.height     = settings.width * 3 / 4;
		options.brightness = (255 * (settings.brightness / 100)) >> 0;
		options.contrast   = Math.pow((settings.contrast + 100) / 100, 2);
		options.size       = settings.size;
		options.space      = settings.space;
		options.alpha      = settings.alpha / 100;
		options.radius     = Math.min(settings.radius, settings.size / 2);

		size    = options.size + options.space;
		radius  = options.size / 2;
		factor  = options.width / ((options.width * size) - options.space);
		width   = (options.width * factor) >> 0;
		height  = (options.height * factor) >> 0;
		xOffset = ((options.width - (options.width - (options.width % size)) + options.space) / 2) >> 0;
		yOffset = ((options.height - (options.height - (options.height % size)) + options.space) / 2) >> 0;

		iCanvas.width  = width;
		iCanvas.height = height;

		colorLookup = {};

		video.width  = sCanvas.width  = tCanvas.width  = imageCache.width = options.width;
		video.height = sCanvas.height = tCanvas.height = imageCache.height = options.height;

		tCanvas.style.width  = (options.width + 40) + 'px';
		tCanvas.style.height = (options.height + 40) + 'px';

		tContext.translate(options.width, 0);
		tContext.scale(-1, 1);
	}

	function onIncompatible() {
		hint.textContent = 'Sure your browser is up to date and you have a webcam?';

		document.body.appendChild(hint);
	}

	function onAccessRequested() {
		hint.textContent = 'Please grant access to your webcam for this demo to work.';

		document.body.appendChild(hint);
	}

	function onAccessDenied() {
		hint.textContent = 'You might really want to grant me access to your webcam :)';

		document.body.appendChild(hint);
	}

	function initializeSetting(element, mDomElement) {
		var parameter = mDomElement.create(element).getAttribute('data-setting').split(':'),
			setting   = parameter[0],
			range     = parameter[1].split(','),
			stepping  = parseFloat(range.pop()),
			previous  = document.createElement('span'),
			value     = document.createElement('span'),
			next      = document.createElement('span');

		previous.className = 'previous';
		value.className    = 'value';
		next.className     = 'next';

		previous.textContent = '-';
		value.textContent    = settings[setting];
		next.textContent     = '+';

		element.appendChild(previous);
		element.appendChild(value);
		element.appendChild(next);

		previous = mDomElement.create(previous);
		next     = mDomElement.create(next);

		previous.on('click', function(event) {
			event.preventDefault();
			event.stopPropagation();

			settings[setting] = Math.max(range[0], Math.min(range[1], settings[setting] - stepping));
			value.textContent = settings[setting];

			onSettingsChanged();

			return false;
		});

		next.on('click', function(event) {
			event.preventDefault();
			event.stopPropagation();

			settings[setting] = Math.max(range[0], Math.min(range[1], settings[setting] + stepping));
			value.textContent = settings[setting];

			onSettingsChanged();

			return false;
		});
	}

	function initializePause(element) {
		var states = element.getAttribute('data-pause').split(',');

		element.setStyle('display', 'inline-block').on('click', function(event) {
			event.preventDefault();
			event.stopPropagation();

			if(paused === true) {
				this.textContent = states[0];

				imageCache.src = '';
				paused         = false;
			} else {
				this.textContent = states[1];

				sContext.drawImage(video, 0, 0, options.width, options.height);

				imageCache.src = sCanvas.toDataURL('image/png');
				paused         = true;
			}

			return false;
		});
	}

	function initializeDownload(element, link) {
		element.setStyle('display', 'inline-block');

		link.on('click', function() {
			if(paused === false) {
				paused = true;

				link.setAttribute('href', tCanvas.toDataURL('image/png'));

				paused = false;
			} else {
				link.setAttribute('href', tCanvas.toDataURL('image/png'));
			}
		});
	}

	function createPixel(color) {
		if(!colorLookup[color]) {
			var pColor   = color,
				pCanvas  = document.createElement('canvas'),
				pContext = pCanvas.getContext('2d');

			pCanvas.width = pCanvas.height = options.size;

			pColor /= 255;
			pColor -= 0.5;
			pColor *= options.contrast;
			pColor += 0.5;
			pColor *= 255;
			pColor  = (pColor + 0.5) >> 0;
			pColor += options.brightness;
			pColor  = Math.max(0, Math.min(255, pColor));

			pContext.beginPath();

			if(radius === options.radius) {
				pContext.arc(radius, radius, radius, 0, MATH_PI_TIMES_TWO, false);
			} else {
				pContext.moveTo(options.radius, 0);
				pContext.lineTo(options.size - options.radius, 0);
				pContext.quadraticCurveTo(options.size, 0, options.size, options.radius);
				pContext.lineTo(options.size, options.size - options.radius);
				pContext.quadraticCurveTo(options.size, options.size, options.size - options.radius, options.size);
				pContext.lineTo(options.radius, options.size);
				pContext.quadraticCurveTo(0, options.size, 0, options.size - options.radius);
				pContext.lineTo(0, options.radius);
				pContext.quadraticCurveTo(0, 0, options.radius, 0);
			}

			pContext.closePath();
			pContext.fillStyle = 'rgba(' + pColor + ', ' + pColor + ', ' + pColor + ', ' + options.alpha + ')';
			pContext.fill();

			colorLookup[color] = pCanvas;
		}

		return colorLookup[color];
	}

	function update() {
		try {
			iContext.drawImage((paused === false) ? video : imageCache, 0, 0, width, height);
			tContext.clearRect(0, 0, options.width, options.height);

			imageData = iContext.getImageData(0, 0, width, height);
		} catch(e) {}

		if(imageData) {
			colorData = imageData.data;

			for(i = 0; colorData[i] !== undefined; i += 4) {
				px    = i / 4;
				color = (0.299 * colorData[i] + 0.587 * colorData[i + 1] + 0.114 * colorData[i + 2] + 0.5) >> 0;
				x     = (px % width) * size + xOffset;
				y     = ((px / width) >> 0) * size + yOffset;

				tContext.drawImage(colorLookup[color] || createPixel(color), x, y);
			}
		}

		interval = requestAnimationFrame(update);
	}

	require([ 'base' ], function() {
		require([ 'support', 'dom/element', 'proxy', 'support/element/video', 'support/element/canvas', 'support/element/canvas/todataurl/png' ], function(mSupport, mDomElement, mProxy) {
			mSupport.testMultiple('/element/video', '/element/canvas', mSupport.supportsMethod('URL'), mSupport.supportsMethod('getUserMedia', navigator))
				.then(
				function() {
					qDocument             = mDomElement.create(document);
					requestAnimationFrame = window[mSupport.getMethod('requestAnimationFrame')] || requestAnimationFrameFallback;
					cancelAnimationFrame  = window[mSupport.getMethod('cancelAnimationFrame')] || clearTimeout;
					visibilityProperty    = mSupport.getProperty('hidden', document);
					video                 = document.createElement('video');
					iCanvas               = document.createElement('canvas');
					iContext              = iCanvas.getContext('2d');
					sCanvas               = document.createElement('canvas');
					sContext              = sCanvas.getContext('2d');
					tCanvas               = document.createElement('canvas');
					tContext              = tCanvas.getContext('2d');
					imageCache            = document.createElement('img');
					methodURL             = mSupport.getMethod('URL');
					getUserMedia          = mProxy.create(navigator, navigator[mSupport.getMethod('getUserMedia', navigator)]);

					mDomElement.create(video).setAttribute('autoplay', 'autoplay');
					mDomElement.create(tCanvas).setAttribute('id', 'canvas');

					if(visibilityProperty) {
						qDocument
							.on(''.concat('visibilitychange ', mSupport.getPrefix().properties[0], 'visibilitychange'), onVisibilityChange)
							.emit('visibilitychange');
					}

					onAccessRequested();

					getUserMedia({ video: true, audio: false },
						function(stream) {
							var temp;

							video.src = window[methodURL].createObjectURL(stream);

							document.body.removeChild(hint);
							document.body.appendChild(tCanvas);

							onSettingsChanged();
							update();

							temp = document.querySelectorAll('#console [data-setting]');
							for(i = 0; temp[i] !== undefined; i++) {
								initializeSetting(temp[i], mDomElement);
							}

							mSupport.testMultiple('/element/canvas/todataurl/png')
								.then(function() {
									initializePause(mDomElement.create(document.querySelectorAll('#console [data-pause]')[0]));
								})
								.done();

							mSupport.testMultiple('/element/canvas/todataurl/png', mSupport.supportsProperty('download', document.createElement('a')))
								.then(function() {
									temp = document.querySelectorAll('#console [data-download]')[0];

									initializeDownload(mDomElement.create(temp), mDomElement.create(temp.firstChild));
								})
								.done();
						},
						onAccessDenied
					);
				},
				onIncompatible
			);
		});
	});
}(window, document));