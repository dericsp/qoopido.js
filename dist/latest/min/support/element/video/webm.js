(function(t){window.qoopido.register("support/element/video/webm",t,["../../../support","../video","../../../pool/dom"])})(function(t,e){"use strict";return t.support.addTest("/element/video/webm",function(o){t["support/element/video"]().then(function(){var t=e.pool.dom.obtain("video");t.canPlayType('video/webm; codecs="vp8, vorbis"')?o.resolve():o.reject(),t.dispose()}).fail(function(){o.reject()})})});