(function(e,t){"use strict";var r="qoopido/support/element/canvas/todataurl/webp",o=function o(){return t.qoopido.shared.prepareModule(r,e,arguments)};"function"==typeof define&&define.amd?define(["../../../../support","../todataurl"],o):o(t.qoopido.support,t.qoopido.support.element.canvas.todataurl)})(function(e,t){"use strict";return e.addTest("/element/canvas/todataurl/webp",function(r){t().then(function(){0===e.getElement("canvas").toDataURL("image/webp").indexOf("data:image/webp")?r.resolve():r.reject()}).fail(function(){r.reject()})})},window,document);