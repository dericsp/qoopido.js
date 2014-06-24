/*!
* Qoopido.js library v3.3.3, 2014-5-24
* https://github.com/dlueth/qoopido.js
* (c) 2014 Dirk Lueth
* Dual licensed under MIT and GPL
*/
!function(e){var t=["./base","q"];String.prototype.ucfirst||t.push("./polyfill/string/ucfirst"),window.qoopido.registerSingleton("support",e,t)}(function(e,t,r,s,o,i,p){"use strict";var n=e.q||o.Q,l=new RegExp("^(Moz|WebKit|Khtml|ms|O|Icab)(?=[A-Z])"),u=new RegExp("-([a-z])","gi"),f=new RegExp("([A-Z])","g"),a=function(){return arguments[1].ucfirst()},c={prefix:null,method:{},property:{},css:{},element:{},promises:{prefix:null,method:{},property:{},css:{},test:{}}};return e.base.extend({test:{},pool:t.pool&&t.pool.dom,testMultiple:function(){var e,t=[],r=0;for(r;(e=arguments[r])!==p;r++)switch(typeof e){case"string":t.push(this.test[e]());break;case"boolean":var s=n.defer();e?s.resolve():s.reject(),t.push(s.promise);break;default:t.push(e)}return n.all(t)},getPrefix:function(){var e,t=this,r=c.prefix||null;if(null===r){var s=t.pool?t.pool.obtain("div"):i.createElement("div"),o=s.style;r=!1;for(e in o)l.test(e)&&(r=e.match(l)[0]);r===!1&&"WebkitOpacity"in o&&(r="WebKit"),r===!1&&"KhtmlOpacity"in o&&(r="Khtml"),r=c.prefix=r===!1?!1:[r.toLowerCase(),r.toLowerCase().ucfirst(),r],s.dispose&&s.dispose()}return r},getMethod:function(e,t){t=t||o;var r=t.tagName,s=c.method[r]=c.method[r]||{},i=s[e]=c.method[r][e]||null;if(null===i){i=!1;var n,l,u=0,f=e.ucfirst(),a=this.getPrefix();for(n=a!==!1?(e+" "+a.join(f+" ")+f).split(" "):[e],u;(l=n[u])!==p;u++)if(t[l]!==p&&("function"==typeof t[l]||"object"==typeof t[l])){i=l;break}c.method[r][e]=i}return i},getProperty:function(e,t){t=t||o;var r=t.tagName,s=c.property[r]=c.property[r]||{},i=s[e]=c.property[r][e]||null;if(null===i){i=!1;var n,l,u=0,f=e.ucfirst(),a=this.getPrefix();for(n=a!==!1?(e+" "+a.join(f+" ")+f).split(" "):[e],u;(l=n[u])!==p;u++)if(t[l]!==p){i=l;break}c.property[r][e]=i}return i},getCssProperty:function(e){e=e.replace(u,a);var t=this,r=c.css[e]||null;if(null===r){r=!1;var s,o=0,n=t.pool?t.pool.obtain("div"):i.createElement("div"),l=e.ucfirst(),m=this.getPrefix()||[],h=(e+" "+m.join(l+" ")+l).split(" "),d="";for(o;(s=h[o])!==p;o++)if(n.style[s]!==p){r=s,o>0&&(d="-");break}c.css[e]=r!==!1?[d+r.replace(f,"-$1").toLowerCase(),r]:!1,n.dispose&&n.dispose()}return r},supportsPrefix:function(){return!!this.getPrefix()},supportsMethod:function(e,t){return!!this.getMethod(e,t)},supportsProperty:function(e,t){return!!this.getProperty(e,t)},supportsCssProperty:function(e){return!!this.getCssProperty(e)},testPrefix:function(){var e=c.promises.prefix;if(null===e){var t=n.defer(),r=this.getPrefix();r?t.resolve(r):t.reject(),e=c.promises.prefix=t.promise}return e},testMethod:function(e,t){t=t||o;var r=t.tagName,s=c.promises.method[r]=c.promises.method[r]||{},i=s[e]=c.promises.method[r][e]||null;if(null===i){var p=n.defer(),l=this.getMethod(e,t);l?p.resolve(l):p.reject(),i=c.promises.method[r][e]=p.promise}return i},testProperty:function(e,t){t=t||o;var r=t.tagName,s=c.promises.property[r]=c.promises.property[r]||{},i=s[e]=c.promises.property[r][e]||null;if(null===i){var p=n.defer(),l=this.getProperty(e,t);l?p.resolve(l):p.reject(),i=c.promises.property[r][e]=p.promise}return i},testCssProperty:function(e){var t=c.promises.css[e]||null;if(null===t){var r=n.defer(),s=this.getCssProperty(e);s?r.resolve(s):r.reject(),t=c.promises.css[e]=r.promise}return t},addTest:function(e,t){return this.test[e]=function(){var r=c.promises.test[e]||null;if(null===r){var s=n.defer(),o=Array.prototype.slice.call(arguments);o.splice(0,0,s),t.apply(null,o),r=c.promises.test[e]=s.promise}return r}}})});