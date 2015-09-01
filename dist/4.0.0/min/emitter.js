/*! Qoopido.js 4.0.0, 2015-09-01 | https://github.com/dlueth/qoopido.js | (c) 2015 Dirk Lueth */
!function(t){"use strict";function e(){var t=this,e=t.constructor.prototype,r=u(e);r.forEach(function(r){var i,u;"function"==typeof t[r]&&n.test(r)===!1&&o(e,r).writable&&(i=r.charAt(0).toUpperCase()+r.slice(1),u=o(e,r),u.value=function(){var n;return t.emit("pre"+i,arguments),n=e[r].apply(t,arguments),t.emit("post"+i,arguments,n),n},Object.defineProperty(t,r,u))})}function r(r,n){function u(){var t=this,r=t.uuid;return!r&&(r=n())&&i(t,"uuid",c(r)),s[r]={},f(t)!==u.prototype&&e.call(t),t}return u.prototype={on:function(e,r){var n,i=this,u=s[i.uuid],o=0;for(e=e.split(" ");(n=e[o])!==t;o++)(u[n]=u[n]||[]).push(r);return i},one:function(t,e,r){var n=this;return r=r!==!1,n.on(t,function i(u){n.off(r===!0?u:t,i),e.apply(this,arguments)}),n},off:function(e,r){var n,i,u,o=this,f=s[o.uuid],c=0;if(e)for(e=e.split(" ");(n=e[c])!==t;c++)if(f[n]=f[n]||[],r)for(i=0;(u=f[n][i])!==t;i++)u===r&&(f[n].splice(i,1),i--);else f[n].length=0;else for(n in o.listener)f[n].length=0;return o},emit:function(e){var r,n,i,u=this,o=0;if(e)for(r=s[u.uuid],r[e]=r[e]||[],n=r[e].slice();(i=n[o])!==t;o++)i.apply(u,arguments);return u}},r.extend(u)}var n=/^(extend$|_|get.+)/,i=Object.defineProperty,u=Object.getOwnPropertyNames,o=Object.getOwnPropertyDescriptor,f=Object.getPrototypeOf,c=function(t,e){return{writable:!!e,configurable:!1,enumerable:!1,value:t}},s={};provide(r).when("base","function/unique/uuid")}();