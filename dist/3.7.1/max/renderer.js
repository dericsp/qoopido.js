/*!
* Qoopido.js library
*
* version: 3.7.1
* date:    2015-07-25
* author:  Dirk Lueth <info@qoopido.com>
* website: https://github.com/dlueth/qoopido.js
*
* Copyright (c) 2015 Dirk Lueth
*/
(function(definition) {
    window.qoopido.registerSingleton("renderer", definition, [ "./emitter", "./support", "./dom/element" ]);
})(function(modules, shared, namespace, navigator, window, document, undefined) {
    "use strict";
    function requestAnimationFrameFallback(callback) {
        return window.setTimeout(callback, targetInterval);
    }
    var prototype, mSupport = modules["support"], qDocument = modules["dom/element"].create(document), requestAnimationFrame = window[mSupport.getMethod("requestAnimationFrame")] || requestAnimationFrameFallback, cancelAnimationFrame = window[mSupport.getMethod("cancelAnimationFrame")] || clearTimeout, visibilityProperty = mSupport.getProperty("hidden", document), targetFramerate = 60, targetInterval = 1e3 / targetFramerate, pausedAt, pausedDuration, interval, timeStart, timeNow, timeLast, timeDelta, frames = 0;
    function onVisibilityChange() {
        var self = this;
        if (document[visibilityProperty]) {
            if (interval) {
                pausedAt = new Date().getTime();
                self.paused = true;
                cancelAnimationFrame(interval);
                interval = null;
                self.emit("suspend");
            }
        } else {
            if (!interval) {
                self.paused = false;
                if (pausedAt) {
                    pausedDuration = new Date().getTime() - pausedAt;
                    timeLast = timeLast + pausedDuration;
                    timeStart = timeStart + pausedDuration;
                    self.emit("resume", pausedDuration);
                }
                self._tick();
            }
        }
    }
    prototype = modules["emitter"].extend({
        framerate: 0,
        ratio: 1,
        paused: false,
        _tick: null,
        _constructor: function() {
            var self = this;
            prototype._parent._constructor.call(self);
            timeStart = timeLast = new Date().getTime();
            self._tick = function() {
                if (self.paused === false) {
                    timeNow = new Date().getTime();
                    timeDelta = timeNow - timeStart;
                    self.ratio = (timeNow - timeLast) / targetInterval;
                    self.framerate = targetFramerate / self.ratio;
                    if (timeDelta >= 1e3) {
                        timeStart = timeNow;
                        frames = 0;
                    }
                    timeLast = timeNow;
                    frames = frames + 1;
                    self.emit("tick", self.framerate, self.ratio);
                    interval = requestAnimationFrame(self._tick);
                }
            };
            qDocument.on("".concat("visibilitychange ", mSupport.getPrefix()[0], "visibilitychange"), function() {
                onVisibilityChange.call(self);
            });
            onVisibilityChange.call(self);
        }
    });
    return prototype;
});