/*! Qoopido.js library 3.7.4, 2015-08-14 | https://github.com/dlueth/qoopido.js | (c) 2015 Dirk Lueth */
!function(e,t){t.register?t.register("polyfill/object/defineproperty",e):(t.modules=t.modules||{})["polyfill/object/defineproperty"]=e()}(function(e,t,r,o){"use strict";if(!Object.defineProperty||!function(){try{return Object.defineProperty({},"x",{}),!0}catch(e){return!1}}()){var n=Object.defineProperty,i=Object.prototype.__defineGetter__,c=Object.prototype.__defineSetter__;Object.defineProperty=function(e,t,r){if(n)try{return n(e,t,r)}catch(o){}if(e!==Object(e))throw new TypeError("Object.defineProperty called on non-object");return i&&"get"in r&&i.call(e,t,r.get),c&&"set"in r&&c.call(e,t,r.set),"value"in r&&(e[t]=r.value),e}}return Object.defineProperty},this.qoopido=this.qoopido||{});