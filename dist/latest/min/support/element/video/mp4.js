/*! Qoopido.js library 3.7.4, 2015-08-14 | https://github.com/dlueth/qoopido.js | (c) 2015 Dirk Lueth */
!function(e,o){o.qoopido.register("support/element/video/mp4",e,["../../../support","../video"])}(function(e,o,t,i){"use strict";var n=e.support;return n.addTest("/element/video/mp4",function(o){e["support/element/video"]().then(function(){var e=n.pool?n.pool.obtain("video"):document.createElement("video");e.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"')?o.resolve():o.reject(),e.dispose&&e.dispose()},function(){o.reject()})})},this);