/*! Qoopido.js library 3.7.4, 2015-08-14 | https://github.com/dlueth/qoopido.js | (c) 2015 Dirk Lueth */
!function(e,t,r){"use strict";function o(e,o,n,i){var u,d=e.split("/");return s[e]?s[e]:(u=function(){if(n)for(var u,f,l=d.slice(0,-1).join("/"),g=0;(u=n[g])!==r;g++)f=a.test(u),f&&(u=c(l+"/"+u)),!s[u]&&arguments[g]&&(s[u]=arguments[g]),f&&!s[u]&&"undefined"!=typeof console&&console.error("".concat("[Qoopido.js] ",e,": Could not load dependency ",u));return s[e]=o(s,p,t,r),i&&i(s[e]),s[e]},void("undefined"!=typeof module&&module.exports?module.exports=define(u):"function"==typeof define&&define.amd?n?define(n,u):define(u):u()))}function n(e,t,r){o(e,t,r,function(t){s[e]=t.create()})}function c(e){for(var t;(t=e.replace(d,""))!==e;)e=t;return e.replace(f,"")}var i=t.qoopido||(t.qoopido={}),p=i.shared||(i.shared={}),s=i.modules||(i.modules={}),u=[],a=new RegExp("^\\.+\\/"),d=new RegExp("(?:\\/|)[^\\/]*\\/\\.\\."),f=new RegExp("(^\\/)|\\.\\/","g");i.register=o,i.registerSingleton=n,Object.create||u.push("./polyfill/object/create"),Object.getOwnPropertyNames||u.push("./polyfill/object/getownpropertynames"),Object.getOwnPropertyDescriptor&&function(){try{return Object.getOwnPropertyDescriptor({x:0},"x"),!0}catch(e){return!1}}()||u.push("./polyfill/object/getownpropertydescriptor"),o("base",e,u)}(function(e,t,r,o){"use strict";function n(e){for(var t,r={},n=Object.getOwnPropertyNames(e),c=0;(t=n[c])!==o;c++)r[t]=Object.getOwnPropertyDescriptor(e,t);return r}function c(){throw new Error("[Qoopido.js] Operation prohibited")}return{create:function(){var e,t=Object.create(this,n(this));return t._constructor&&(e=t._constructor.apply(t,arguments)),t.create=t.extend=c,e||t},extend:function(e,t){var r;return e=e||{},t=t===!0,e._parent=this,r=Object.create(this,n(e)),t===!0&&(r.extend=c),r}}},this);