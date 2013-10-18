(function(t){window.qoopido.registerSingleton("support",t,["./base","./polyfill/string/ucfirst","./pool/dom","q"])})(function(t,e,r,n,o,i){"use strict";var s=t.q||n.Q,l=RegExp("-([a-z])","gi"),u=RegExp("^(Moz|WebKit|Khtml|ms|O|Icab)(?=[A-Z])"),a=function(t){return t.ucfirst()},c={prefix:null,method:{},property:{},css:{},element:{},promises:{prefix:null,method:{},property:{},css:{},test:{}}};return t.base.extend({test:{},testMultiple:function(){var t,e=[],r=0;for(r;(t=arguments[r])!==i;r++)switch(typeof t){case"string":e.push(this.test[t]());break;case"boolean":var n=s.defer();t?n.resolve():n.reject(),e.push(n.promise);break;default:e.push(t)}return s.all(e)},getPrefix:function(){var t,e=c.prefix||null;if(null===e){var r=n.qoopido.shared.pool.dom.obtain("div"),o=r.style;e=!1;for(t in o)u.test(t)&&(e=t.match(u)[0]);e===!1&&"WebkitOpacity"in o&&(e="WebKit"),e===!1&&"KhtmlOpacity"in o&&(e="Khtml"),e=c.prefix=e===!1?!1:{method:e,properties:[e.toLowerCase(),e.toLowerCase().ucfirst()]},r.dispose()}return e},getMethod:function(t,e){e=e||n;var r=e.tagName,o=c.method[r]=c.method[r]||{},s=o[t]=c.method[r][t]||null;if(null===s){s=!1;var l,u,a=0,p=t.ucfirst(),f=this.getPrefix();for(l=f!==!1?(t+" "+f.method+p+" "+f.properties.join(p+" ")+p).split(" "):[t],a;(u=l[a])!==i;a++)if(e[u]!==i&&("function"==typeof e[u]||"object"==typeof e[u])){s=u;break}c.method[r][t]=s}return s},getProperty:function(t,e){e=e||n;var r=e.tagName,o=c.property[r]=c.property[r]||{},s=o[t]=c.property[r][t]||null;if(null===s){s=!1;var l,u,a=0,p=t.ucfirst(),f=this.getPrefix();for(l=f!==!1?(t+" "+f.properties.join(p+" ")+p).split(" "):[t],a;(u=l[a])!==i;a++)if(e[u]!==i){s=u;break}c.property[r][t]=s}return s},getCssProperty:function(t){t=t.replace(l,a);var e=c.css[t]||null;if(null===e){e=!1;var r,o=0,s=n.qoopido.shared.pool.dom.obtain("div"),u=t.ucfirst(),p=(this.getPrefix()||{properties:[]}).properties,f=(t+" "+p.join(u+" ")+u).split(" ");for(o;(r=f[o])!==i;o++)if(s.style[r]!==i){e=r;break}c.css[t]=e,s.dispose()}return e},supportsPrefix:function(){return!!this.getPrefix()},supportsMethod:function(t,e){return!!this.getMethod(t,e)},supportsProperty:function(t,e){return!!this.getProperty(t,e)},supportsCssProperty:function(t){return!!this.getCssProperty(t)},testPrefix:function(){var t=c.promises.prefix;if(null===t){var e=s.defer(),r=this.getPrefix();r?e.resolve(r):e.reject(),t=c.promises.prefix=e.promise}return t},testMethod:function(t,e){e=e||n;var r=e.tagName,o=c.promises.method[r]=c.promises.method[r]||{},i=o[t]=c.promises.method[r][t]||null;if(null===i){var l=s.defer(),u=this.getMethod(t,e);u?l.resolve(u):l.reject(),i=c.promises.method[r][t]=l.promise}return i},testProperty:function(t,e){e=e||n;var r=e.tagName,o=c.promises.property[r]=c.promises.property[r]||{},i=o[t]=c.promises.property[r][t]||null;if(null===i){var l=s.defer(),u=this.getProperty(t,e);u?l.resolve(u):l.reject(),i=c.promises.property[r][t]=l.promise}return i},testCssProperty:function(t){var e=c.promises.css[t]||null;if(null===e){var r=s.defer(),n=this.getCssProperty(t);n?r.resolve(n):r.reject(),e=c.promises.css[t]=r.promise}return e},addTest:function(t,e){return this.test[t]=function(){var r=c.promises.test[t]||null;if(null===r){var n=s.defer(),o=Array.prototype.slice.call(arguments);o.splice(0,0,n),e.apply(null,o),r=c.promises.test[t]=n.promise}return r}}})});