(function(e,t){"use strict";var r=function r(){return t.qoopido.shared.module.initialize("support/capability/datauri",e,arguments)};"function"==typeof define&&define.amd?define(["../../support"],r):r(t.qoopido.support)})(function(e){"use strict";return e.addTest("/capability/datauri",function(t){var r=e.getElement("image");r.onerror=function(){t.reject()},r.onload=function(){1===r.width&&1===r.height?t.resolve():t.reject()},r.src="data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="})},window);