(function(t){window.qoopido.register("polyfill/object/getownpropertynames",t)})(function(){"use strict";return Object.getOwnPropertyNames||(Object.getOwnPropertyNames=function(t){if(t!==Object(t))throw new TypeError("Object.getOwnPropertyNames called on non-object");var e,n=[];for(e in t)Object.prototype.hasOwnProperty.call(t,e)&&n.push(e);return n}),!0});