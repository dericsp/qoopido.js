/*! Qoopido.js library 3.7.3, 2015-08-05 | https://github.com/dlueth/qoopido.js | (c) 2015 Dirk Lueth */
!function(e){window.qoopido.register("support/element/canvas/todataurl/jpeg",e,["../../../../support","../todataurl"])}(function(e,t,a,o,n,r,s){"use strict";var p=e.support;return p.addTest("/element/canvas/todataurl/jpeg",function(t){e["support/element/canvas/todataurl"]().then(function(){var e=p.pool?p.pool.obtain("canvas"):r.createElement("canvas");0===e.toDataURL("image/jpeg").indexOf("data:image/jpeg")?t.resolve():t.reject(),e.dispose&&e.dispose()},function(){t.reject()})})});