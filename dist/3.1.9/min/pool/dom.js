(function(t){window.qoopido.register("pool/dom",t,["../pool"])})(function(t,e,n,r,o,i){"use strict";var s=t.pool.extend({_initPool:function(){return{}},_getPool:function(t){var e=this;return"string"!=typeof t&&(t=t.tagName.toLowerCase()),e._pool[t]=e._pool[t]||[]},_dispose:function(t){var e;t.parentNode&&t.parentNode.removeChild(t);for(e in t)if(Object.prototype.hasOwnProperty.call(t,e))try{t.removeAttribute(e)}catch(n){t.property=null}return t},_obtain:function(t){return i.createElement(t)}});return e.pool=e.pool||{},e.pool.dom=s.create(),s});