/*! Qoopido.js library 3.7.4, 2015-08-14 | https://github.com/dlueth/qoopido.js | (c) 2015 Dirk Lueth */
!function(e,t){t.register?t.register("polyfill/object/defineproperty",e):(t.modules=t.modules||{})["polyfill/object/defineproperty"]=e()}(function(e,t,r,o){"use strict";if(!Object.defineProperty||!function(){try{return Object.defineProperty({},"x",{}),!0}catch(e){return!1}}()){var n=Object.defineProperty,i=Object.prototype.__defineGetter__,c=Object.prototype.__defineSetter__;Object.defineProperty=function(e,t,r){if(n)try{return n(e,t,r)}catch(o){}if(e!==Object(e))throw new TypeError("Object.defineProperty called on non-object");return i&&"get"in r&&i.call(e,t,r.get),c&&"set"in r&&c.call(e,t,r.set),"value"in r&&(e[t]=r.value),e}}return Object.defineProperty},this.qoopido=this.qoopido||{}),function(e,t){if(t.register){var r=[];Object.defineProperty&&function(){try{return Object.defineProperty({},"x",{}),!0}catch(e){return!1}}()||r.push("./defineproperty"),t.register("polyfill/object/defineproperties",e,r)}else(t.modules=t.modules||{})["polyfill/object/defineproperties"]=e()}(function(e,t,r,o){"use strict";return Object.defineProperties||(Object.defineProperties=function(e,t){if(e!==Object(e))throw new TypeError("Object.defineProperties called on non-object");var r;for(r in t)Object.prototype.hasOwnProperty.call(t,r)&&Object.defineProperty(e,r,t[r]);return e}),Object.defineProperties},this.qoopido=this.qoopido||{}),function(e,t){if(t.register){var r=[];Object.defineProperties||r.push("./defineproperties"),t.register("polyfill/object/create",e,r)}else(t.modules=t.modules||{})["polyfill/object/create"]=e()}(function(e,t,r,o){"use strict";return Object.create||(Object.create=function(e,t){function r(){}if("object"!=typeof e)throw new TypeError;r.prototype=e;var o=new r;if(e&&(o.constructor=r),arguments.length>1){if(t!==Object(t))throw new TypeError;Object.defineProperties(o,t)}return o}),Object.create},this.qoopido=this.qoopido||{}),function(e,t){t.register?t.register("polyfill/object/getownpropertynames",e):(t.modules=t.modules||{})["polyfill/object/getownpropertynames"]=e()}(function(e,t,r,o){"use strict";return Object.getOwnPropertyNames||(Object.getOwnPropertyNames=function(e){if(e!==Object(e))throw new TypeError("Object.getOwnPropertyNames called on non-object");var t,r=[];for(t in e)Object.prototype.hasOwnProperty.call(e,t)&&r.push(t);return r}),Object.getOwnPropertyNames},this.qoopido=this.qoopido||{}),function(e,t){t.register?t.register("polyfill/object/getownpropertydescriptor",e):(t.modules=t.modules||{})["polyfill/object/getownpropertydescriptor"]=e()}(function(e,t,r,o){"use strict";if(!Object.getOwnPropertyDescriptor||!function(){try{return Object.getOwnPropertyDescriptor({x:0},"x"),!0}catch(e){return!1}}()){var n=Object.getOwnPropertyDescriptor;Object.getOwnPropertyDescriptor=function(e,t){if(e!==Object(e))throw new TypeError;try{return n.call(Object,e,t)}catch(r){}return Object.prototype.hasOwnProperty.call(e,t)?{value:e[t],enumerable:!0,writable:!0,configurable:!0}:void 0}}return Object.getOwnPropertyDescriptor},this.qoopido=this.qoopido||{}),function(e,t,r){"use strict";function o(e,o,n,c){var u,l=e.split("/");return s[e]?s[e]:(u=function(){if(n)for(var u,d,a=l.slice(0,-1).join("/"),y=0;(u=n[y])!==r;y++)d=f.test(u),d&&(u=i(a+"/"+u)),!s[u]&&arguments[y]&&(s[u]=arguments[y]),d&&!s[u]&&"undefined"!=typeof console&&console.error("".concat("[Qoopido.js] ",e,": Could not load dependency ",u));return s[e]=o(s,p,t,r),c&&c(s[e]),s[e]},void("undefined"!=typeof module&&module.exports?module.exports=define(u):"function"==typeof define&&define.amd?n?define(n,u):define(u):u()))}function n(e,t,r){o(e,t,r,function(t){s[e]=t.create()})}function i(e){for(var t;(t=e.replace(l,""))!==e;)e=t;return e.replace(d,"")}var c=t.qoopido||(t.qoopido={}),p=c.shared||(c.shared={}),s=c.modules||(c.modules={}),u=[],f=new RegExp("^\\.+\\/"),l=new RegExp("(?:\\/|)[^\\/]*\\/\\.\\."),d=new RegExp("(^\\/)|\\.\\/","g");c.register=o,c.registerSingleton=n,Object.create||u.push("./polyfill/object/create"),Object.getOwnPropertyNames||u.push("./polyfill/object/getownpropertynames"),Object.getOwnPropertyDescriptor&&function(){try{return Object.getOwnPropertyDescriptor({x:0},"x"),!0}catch(e){return!1}}()||u.push("./polyfill/object/getownpropertydescriptor"),o("base",e,u)}(function(e,t,r,o){"use strict";function n(e){for(var t,r={},n=Object.getOwnPropertyNames(e),i=0;(t=n[i])!==o;i++)r[t]=Object.getOwnPropertyDescriptor(e,t);return r}function i(){throw new Error("[Qoopido.js] Operation prohibited")}return{create:function(){var e,t=Object.create(this,n(this));return t._constructor&&(e=t._constructor.apply(t,arguments)),t.create=t.extend=i,e||t},extend:function(e,t){var r;return e=e||{},t=t===!0,e._parent=this,r=Object.create(this,n(e)),t===!0&&(r.extend=i),r}}},this);