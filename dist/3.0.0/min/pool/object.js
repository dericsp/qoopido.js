(function(e,t){"use strict";function n(){var n=t.qoopido.initialize("pool/object",e,arguments);return t.qoopido.shared.pool=t.qoopido.shared.pool||{},t.qoopido.shared.pool.object=n.create(),n}"function"==typeof define&&define.amd?define(["../pool"],n):n()})(function(e,t,n,i,r){"use strict";var o,u=null===Object.prototype.__proto__,s=u?"__proto__":"prototype",a=u?null:function(){var e=r.createElement("iframe"),t=r.body||r.documentElement;e.style.display="none",t.appendChild(e),e.src="javascript:";var n=e.contentWindow.Object.prototype;return t.removeChild(e),e=null,delete n.constructor,delete n.hasOwnProperty,delete n.propertyIsEnumerable,delete n.isPrototypeOf,delete n.toLocaleString,delete n.toString,delete n.valueOf,n.__proto__=null,n}();return o=e.pool.extend({getModel:function(){return a},_dispose:function(e){var t;e[s]=a;for(t in e)delete e[t];return e},_obtain:function(){return{}}})},window);