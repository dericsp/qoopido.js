(function(e,t){"use strict";function n(){return t.qoopido.initialize("support/element/canvas",e,arguments)}"function"==typeof define&&define.amd?define(["../../support","../../pool/dom"],n):n()})(function(e,t,n,r){"use strict";return e.support.addTest("/element/canvas",function(e){var t=r.qoopido.shared.pool.dom.obtain("canvas");t.getContext&&t.getContext("2d")?e.resolve():e.reject(),t.dispose()})},window);