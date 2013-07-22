(function(e,t){"use strict";function n(){return t.qoopido.initialize("support",e,arguments,!0)}"function"==typeof define&&define.amd?define(["./base","./polyfill/string/ucfirst","q"],n):n()})(function(e,t,n,i,r,o){"use strict";var u=i.Q||t[2],s=RegExp("-([a-z])","gi"),a=RegExp("^(Moz|WebKit|Khtml|ms|O|Icab)(?=[A-Z])"),c=function(e){return e.ucfirst()},l={prefix:null,property:{},method:{},element:{},promises:{prefix:null,property:{},method:{},test:{}}};return e.base.extend({test:{},testMultiple:function(){var e,t=[],n=0;for(n;(e=arguments[n])!==o;n++)switch(typeof e){case"string":t.push(this.test[e]());break;case"boolean":var i=u.defer();e?i.resolve():i.reject(),t.push(i.promise);break;default:t.push(e)}return u.all(t)},getPrefix:function(){var e,t=l.prefix||null;if(null===t){var n=this.getElement("div").style;t=!1;for(e in n)a.test(e)&&(t=e.match(a)[0]);t===!1&&"WebkitOpacity"in n&&(t="WebKit"),t===!1&&"KhtmlOpacity"in n&&(t="Khtml"),t=l.prefix=t===!1?!1:{method:t,properties:[t.toLowerCase(),t.toLowerCase().ucfirst()]}}return t},getProperty:function(e){e=e.replace(s,c);var t=l.property[e]||null;if(null===t){t=!1;var n,i=0,r=this.getElement("div"),u=e.ucfirst(),a=(this.getPrefix()||{properties:[]}).properties,f=(e+" "+a.join(u+" ")+u).split(" ");for(i;(n=f[i])!==o;i++)if(r.style[n]!==o){t=n;break}l.property[e]=t}return t},getMethod:function(e,t){t=t||i;var n=t.tagName,r=l.method[n]=l.method[n]||{},u=r[e]=l.method[n][e]||null;if(null===u){u=!1;var s,a,c=0,f=e.ucfirst(),d=this.getPrefix();for(s=d!==!1?(e+" "+d.method+f+" "+d.properties.join(f+" ")+f).split(" "):[e],c;(a=s[c])!==o;c++)if(t[a]!==o&&("function"==typeof t[a]||"object"==typeof t[a])){u=a;break}l.method[n][e]=u}return u},supportsPrefix:function(){return!!this.getPrefix()},supportsProperty:function(e){return!!this.getProperty(e)},supportsMethod:function(e,t){return!!this.getMethod(e,t)},testPrefix:function(){var e=l.promises.prefix;if(null===e){var t=u.defer(),n=this.getPrefix();n?t.resolve(n):t.reject(),e=l.promises.prefix=t.promise}return e},testProperty:function(e){var t=l.promises.property[e]||null;if(null===t){var n=u.defer(),i=this.getProperty(e);i?n.resolve(i):n.reject(),t=l.promises.property[e]=n.promise}return t},testMethod:function(e,t){t=t||i;var n=t.tagName,r=l.promises.method[n]=l.promises.method[n]||{},o=r[e]=l.promises.method[n][e]||null;if(null===o){var s=u.defer(),a=this.getMethod(e,t);a?s.resolve(a):s.reject(),o=l.promises.method[n][e]=s.promise}return o},addTest:function(e,t){return this.test[e]=function(){var n=l.promises.test[e]||null;if(null===n){var i=u.defer(),r=Array.prototype.slice.call(arguments);r.splice(0,0,i),t.apply(null,r),n=l.promises.test[e]=i.promise}return n}}})},window);