(function(t){window.qoopido.register("support/element/video/webm",t,["../../../support","../video"])})(function(t,e,o,r,n,i){"use strict";var s=t.support;return s.addTest("/element/video/webm",function(e){t["support/element/video"]().then(function(){var t=s.pool?s.pool.obtain("video"):i.createElement("video");t.canPlayType('video/webm; codecs="vp8, vorbis"')?e.resolve():e.reject(),t.dispose&&t.dispose()},function(){e.reject()}).done()})});