(function(e,t){"use strict";function n(){return t.qoopido.initialize("support/element/canvas/todataurl/png",e,arguments)}"function"==typeof define&&define.amd?define(["../../../../support","../todataurl","../../../../pool/dom"],n):n()})(function(e){"use strict";return e.support.addTest("/element/canvas/todataurl/png",function(t){e["support/element/canvas/todataurl"]().then(function(){var e=window.qoopido.shared.pool.dom.obtain("canvas");0===e.toDataURL("image/png").indexOf("data:image/png")?t.resolve():t.reject(),e.dispose()}).fail(function(){t.reject()})})},window);