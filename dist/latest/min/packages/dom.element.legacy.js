/*! Qoopido.js library 3.7.4, 2015-08-14 | https://github.com/dlueth/qoopido.js | (c) 2015 Dirk Lueth */
!function(e,t){t.register?t.register("polyfill/object/defineproperty",e):(t.modules=t.modules||{})["polyfill/object/defineproperty"]=e()}(function(e,t,r,n){"use strict";if(!Object.defineProperty||!function(){try{return Object.defineProperty({},"x",{}),!0}catch(e){return!1}}()){var o=Object.defineProperty,i=Object.prototype.__defineGetter__,s=Object.prototype.__defineSetter__;Object.defineProperty=function(e,t,r){if(o)try{return o(e,t,r)}catch(n){}if(e!==Object(e))throw new TypeError("Object.defineProperty called on non-object");return i&&"get"in r&&i.call(e,t,r.get),s&&"set"in r&&s.call(e,t,r.set),"value"in r&&(e[t]=r.value),e}}return Object.defineProperty},this.qoopido=this.qoopido||{}),function(e,t){if(t.register){var r=[];Object.defineProperty&&function(){try{return Object.defineProperty({},"x",{}),!0}catch(e){return!1}}()||r.push("./defineproperty"),t.register("polyfill/object/defineproperties",e,r)}else(t.modules=t.modules||{})["polyfill/object/defineproperties"]=e()}(function(e,t,r,n){"use strict";return Object.defineProperties||(Object.defineProperties=function(e,t){if(e!==Object(e))throw new TypeError("Object.defineProperties called on non-object");var r;for(r in t)Object.prototype.hasOwnProperty.call(t,r)&&Object.defineProperty(e,r,t[r]);return e}),Object.defineProperties},this.qoopido=this.qoopido||{}),function(e,t){if(t.register){var r=[];Object.defineProperties||r.push("./defineproperties"),t.register("polyfill/object/create",e,r)}else(t.modules=t.modules||{})["polyfill/object/create"]=e()}(function(e,t,r,n){"use strict";return Object.create||(Object.create=function(e,t){function r(){}if("object"!=typeof e)throw new TypeError;r.prototype=e;var n=new r;if(e&&(n.constructor=r),arguments.length>1){if(t!==Object(t))throw new TypeError;Object.defineProperties(n,t)}return n}),Object.create},this.qoopido=this.qoopido||{}),function(e,t){t.register?t.register("polyfill/object/getownpropertynames",e):(t.modules=t.modules||{})["polyfill/object/getownpropertynames"]=e()}(function(e,t,r,n){"use strict";return Object.getOwnPropertyNames||(Object.getOwnPropertyNames=function(e){if(e!==Object(e))throw new TypeError("Object.getOwnPropertyNames called on non-object");var t,r=[];for(t in e)Object.prototype.hasOwnProperty.call(e,t)&&r.push(t);return r}),Object.getOwnPropertyNames},this.qoopido=this.qoopido||{}),function(e,t){t.register?t.register("polyfill/object/getownpropertydescriptor",e):(t.modules=t.modules||{})["polyfill/object/getownpropertydescriptor"]=e()}(function(e,t,r,n){"use strict";if(!Object.getOwnPropertyDescriptor||!function(){try{return Object.getOwnPropertyDescriptor({x:0},"x"),!0}catch(e){return!1}}()){var o=Object.getOwnPropertyDescriptor;Object.getOwnPropertyDescriptor=function(e,t){if(e!==Object(e))throw new TypeError;try{return o.call(Object,e,t)}catch(r){}return Object.prototype.hasOwnProperty.call(e,t)?{value:e[t],enumerable:!0,writable:!0,configurable:!0}:void 0}}return Object.getOwnPropertyDescriptor},this.qoopido=this.qoopido||{}),function(e,t,r){"use strict";function n(e,n,o,s){var c,a=e.split("/");return l[e]?l[e]:(c=function(){if(o)for(var c,f,d=a.slice(0,-1).join("/"),m=0;(c=o[m])!==r;m++)f=p.test(c),f&&(c=i(d+"/"+c)),!l[c]&&arguments[m]&&(l[c]=arguments[m]),f&&!l[c]&&"undefined"!=typeof console&&console.error("".concat("[Qoopido.js] ",e,": Could not load dependency ",c));return l[e]=n(l,u,t,r),s&&s(l[e]),l[e]},void("undefined"!=typeof module&&module.exports?module.exports=define(c):"function"==typeof define&&define.amd?o?define(o,c):define(c):c()))}function o(e,t,r){n(e,t,r,function(t){l[e]=t.create()})}function i(e){for(var t;(t=e.replace(a,""))!==e;)e=t;return e.replace(f,"")}var s=t.qoopido||(t.qoopido={}),u=s.shared||(s.shared={}),l=s.modules||(s.modules={}),c=[],p=new RegExp("^\\.+\\/"),a=new RegExp("(?:\\/|)[^\\/]*\\/\\.\\."),f=new RegExp("(^\\/)|\\.\\/","g");s.register=n,s.registerSingleton=o,Object.create||c.push("./polyfill/object/create"),Object.getOwnPropertyNames||c.push("./polyfill/object/getownpropertynames"),Object.getOwnPropertyDescriptor&&function(){try{return Object.getOwnPropertyDescriptor({x:0},"x"),!0}catch(e){return!1}}()||c.push("./polyfill/object/getownpropertydescriptor"),n("base",e,c)}(function(e,t,r,n){"use strict";function o(e){for(var t,r={},o=Object.getOwnPropertyNames(e),i=0;(t=o[i])!==n;i++)r[t]=Object.getOwnPropertyDescriptor(e,t);return r}function i(){throw new Error("[Qoopido.js] Operation prohibited")}return{create:function(){var e,t=Object.create(this,o(this));return t._constructor&&(e=t._constructor.apply(t,arguments)),t.create=t.extend=i,e||t},extend:function(e,t){var r;return e=e||{},t=t===!0,e._parent=this,r=Object.create(this,o(e)),t===!0&&(r.extend=i),r}}},this),function(e,t){t.qoopido.register("polyfill/string/ucfirst",e)}(function(e,t,r,n){"use strict";return String.prototype.ucfirst||(String.prototype.ucfirst=function(){var e=this;return e.charAt(0).toUpperCase()+e.slice(1)}),String.prototype.ucfirst},this),function(e,t){t.qoopido.register("polyfill/string/lcfirst",e)}(function(e,t,r,n){"use strict";return String.prototype.lcfirst||(String.prototype.lcfirst=function(){var e=this;return e.charAt(0).toLowerCase()+e.slice(1)}),String.prototype.lcfirst},this),function(e,t){t.qoopido.register("polyfill/window/getcomputedstyle",e)}(function(e,t,r,n){"use strict";if(r.getComputedStyle)return r.getComputedStyle;var o=new RegExp("(\\-([a-z]){1})","g"),i=function(){return arguments[2].toUpperCase()};return function(e,t){var r=this;return r.getPropertyValue=function(t){return"float"===t&&(t="styleFloat"),o.test(t)&&(t=t.replace(o,i)),e.currentStyle[t]||null},r}},this),function(e,t){t.qoopido.register("polyfill/window/promise",e)}(function(e,t,r,n){"use strict";function o(e,t){return function(){e.apply(t,arguments)}}function i(e){var t=this;return null===t._state?void t._deferreds.push(e):void m(function(){var r,n=t._state?e.onFulfilled:e.onRejected;if(null===n)return void(t._state?e.resolve:e.reject)(t._value);try{r=n(t._value)}catch(o){return void e.reject(o)}e.resolve(r)})}function s(e){var t,r=this;try{if(e===r)throw new TypeError("A promise cannot be resolved with itself.");if(e&&(f(e)||d(e))&&(t=e.then,"function"==typeof t))return void p(o(t,e),o(s,r),o(u,r));r._state=!0,r._value=e,l.call(r)}catch(n){u.call(r,n)}}function u(e){var t=this;t._state=!1,t._value=e,l.call(t)}function l(){for(var e,t=this,r=0;(e=t._deferreds[r])!==n;r++)i.call(t,e);this._deferreds=null}function c(e,t,r,n){var o=this;o.onFulfilled="function"==typeof e?e:null,o.onRejected="function"==typeof t?t:null,o.resolve=r,o.reject=n}function p(e,t,r){var n=!1;try{e(function(e){n||(n=!0,t(e))},function(e){n||(n=!0,r(e))})}catch(o){if(n)return;n=!0,r(o)}}function a(e){var t=this;if(!f(t))throw new TypeError("Promises must be constructed via new");if(!d(e))throw new TypeError("not a function");t._state=null,t._value=null,t._deferreds=[],p(e,o(s,t),o(u,t))}var f=function(e){return"object"==typeof e},d=function(e){return"function"==typeof e},m=d(r.setImmediate)&&r.setImmediate||function(e){setTimeout(e,1)};return a.prototype["catch"]=function(e){return this.then(null,e)},a.prototype.then=function(e,t){var r=this;return new a(function(n,o){i.call(r,new c(e,t,n,o))})},a.resolve=function(e){return e&&f(e)&&e.constructor===a?e:new a(function(t){t(e)})},a.reject=function(e){return new a(function(t,r){r(e)})},r.Promise||(r.Promise=a),r.Promise},this),function(e,t){var r=[];t.Promise||r.push("../polyfill/window/promise"),t.qoopido.register("promise/all",e,r)}(function(e,t,r,n){"use strict";return function(e){if("[object Array]"!==Object.prototype.toString.call(e))throw new TypeError("You must pass an array to all.");return new r.Promise(function(t,r){function o(e){return function(t){i(e,t)}}function i(e,r){u[e]=r,0===--l&&t(u)}var s,u=[],l=e.length,c=0;for(0===l&&t([]);(s=e[c])!==n;c++)s&&"function"==typeof s.then?s.then(o(c),r):i(c,s)})}},this),function(e,t){var r=[];t.Promise||r.push("../polyfill/window/promise"),t.qoopido.register("promise/defer",e,r)}(function(e,t,r,n){"use strict";return function(){var e=this;e.promise=new r.Promise(function(t,r){e.resolve=t,e.reject=r})}},this),function(e,t){var r=["./base","./promise/all","./promise/defer"];String.prototype.ucfirst||r.push("./polyfill/string/ucfirst"),String.prototype.lcfirst||r.push("./polyfill/string/lcfirst"),t.qoopido.registerSingleton("support",e,r)}(function(e,t,r,n){"use strict";function o(e){return e.replace(c,"$1").lcfirst().replace(p,"").replace(a,d)}var i=r.document,s=e["promise/all"],u=e["promise/defer"],l=new RegExp("^(Moz|WebKit|Khtml|ms|O|Icab)(?=[A-Z])"),c=new RegExp("^(?:webkit|khtml|icab|moz|ms|o)([A-Z])"),p=new RegExp("^-(?:webkit|khtml|icab|moz|ms|o)-"),a=new RegExp("-([a-z])","gi"),f=new RegExp("([A-Z])","g"),d=function(){return arguments[1].ucfirst()},m={prefix:null,method:{},property:{},css:{},promises:{prefix:null,method:{},property:{},css:{},test:{}}};return e.base.extend({test:{},pool:t.pool&&t.pool.dom,testMultiple:function(){for(var e,t=[],r=0;(e=arguments[r])!==n;r++)switch(typeof e){case"string":t.push(this.test[e]());break;case"boolean":var o=new u;e?o.resolve():o.reject(),t.push(o.promise);break;default:t.push(e)}return new s(t)},getPrefix:function(){var e,t=this,r=m.prefix||null;if(null===r){var n=t.pool?t.pool.obtain("div"):i.createElement("div"),o=n.style;r=!1;for(e in o)l.test(e)&&(r=e.match(l)[0]);r===!1&&"WebkitOpacity"in o&&(r="WebKit"),r===!1&&"KhtmlOpacity"in o&&(r="Khtml"),r=m.prefix=r===!1?!1:[r.toLowerCase(),r.toLowerCase().ucfirst(),r],n.dispose&&n.dispose()}return r},getMethod:function(e,t){e=o(e),t=t||r;var i=t.tagName,s=m.method[i]=m.method[i]||{},u=s[e]=m.method[i][e]||null;if(null===u){u=!1;var l,c,p=0,a=e.ucfirst(),f=this.getPrefix();for(l=f!==!1?(e+" "+a+" "+f.join(a+" ")+a).split(" "):[e];(c=l[p])!==n;p++)if(t[c]!==n&&("function"==typeof t[c]||"object"==typeof t[c])){u=c;break}m.method[i][e]=u}return u},getProperty:function(e,t){e=o(e),t=t||r;var i=t.tagName,s=m.property[i]=m.property[i]||{},u=s[e]=m.property[i][e]||null;if(null===u){u=!1;var l,c,p=0,a=e.ucfirst(),f=this.getPrefix();for(l=f!==!1?(e+" "+a+" "+f.join(a+" ")+a).split(" "):[e],p;(c=l[p])!==n;p++)if(t[c]!==n){u=c;break}m.property[i][e]=u}return u},getCssProperty:function(e){e=o(e);var t=this,r=m.css[e]||null;if(null===r){r=!1;var s,u=0,l=t.pool?t.pool.obtain("div"):i.createElement("div"),c=e.ucfirst(),p=this.getPrefix()||[],a=(e+" "+c+" "+p.join(c+" ")+c).split(" "),d="";for(u;(s=a[u])!==n;u++)if(l.style[s]!==n){r=s,u>0&&(d="-");break}r=m.css[e]=r!==!1?[d+r.replace(f,"-$1").toLowerCase(),r]:!1,l.dispose&&l.dispose()}return r},supportsPrefix:function(){return!!this.getPrefix()},supportsMethod:function(e,t){return!!this.getMethod(e,t)},supportsProperty:function(e,t){return!!this.getProperty(e,t)},supportsCssProperty:function(e){return!!this.getCssProperty(e)},testPrefix:function(){var e=m.promises.prefix;if(null===e){var t=new u,r=this.getPrefix();r?t.resolve(r):t.reject(),e=m.promises.prefix=t.promise}return e},testMethod:function(e,t){t=t||r;var n=t.tagName,o=m.promises.method[n]=m.promises.method[n]||{},i=o[e]=m.promises.method[n][e]||null;if(null===i){var s=new u,l=this.getMethod(e,t);l?s.resolve(l):s.reject(),i=m.promises.method[n][e]=s.promise}return i},testProperty:function(e,t){t=t||r;var n=t.tagName,o=m.promises.property[n]=m.promises.property[n]||{},i=o[e]=m.promises.property[n][e]||null;if(null===i){var s=new u,l=this.getProperty(e,t);l?s.resolve(l):s.reject(),i=m.promises.property[n][e]=s.promise}return i},testCssProperty:function(e){var t=m.promises.css[e]||null;if(null===t){var r=new u,n=this.getCssProperty(e);n?r.resolve(n):r.reject(),t=m.promises.css[e]=r.promise}return t},addTest:function(e,t){return this.test[e]=function(){var r=m.promises.test[e]||null;if(null===r){var n=new u,o=Array.prototype.slice.call(arguments);o.splice(0,0,n),t.apply(null,o),r=m.promises.test[e]=n.promise}return r}}})},this),function(e,t){t.qoopido.register("function/merge",e)}(function(e,t,r,n){"use strict";return function o(){var e,t,r,i,s,u=arguments[0];for(e=1;(t=arguments[e])!==n;e++)for(r in t)i=u[r],s=t[r],s!==n&&(null!==s&&"object"==typeof s?(i=s.length!==n?i&&"object"==typeof i&&i.length!==n?i:[]:i&&"object"==typeof i&&i.length===n?i:{},u[r]=o(i,s)):u[r]=s);return u}},this),function(e,t){t.qoopido.register("function/unique/uuid",e)}(function(e,t,r,n){"use strict";function o(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(s,function(e){var t=16*Math.random()|0,r="x"===e?t:3&t|8;return r.toString(16)})}var i={},s=new RegExp("[xy]","g");return function(){var e;do e=o();while("undefined"!=typeof i[e]);return i[e]=!0,e}},this),function(e,t){t.qoopido.registerSingleton("hook/event",e,["../base"])}(function(e,t,r,n){"use strict";function o(e,t,r){for(var o,i=0;(o=r[i])!==n;i++)e[o]=t[o];e._properties=e._properties.concat(r)}var i=r.document,s={general:{properties:"type altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which path".split(" "),process:function(e,t){var n;if(e.originalEvent=t,e.isDefaultPrevented=t.defaultPrevented?!0:!1,e.isPropagationStopped=t.cancelBubble?!0:!1,e.metaKey=t.metaKey&&t.metaKey!==!1?!0:!1,e.target||(e.target=t.srcElement||i),3===e.target.nodeType&&(e.target=e.target.parentNode),!e.path){e.path=[],n=e.target;do e.path.push(n);while(n=n.parentNode);e.path.push(r)}}},mouse:{regex:new RegExp("^(?:mouse|pointer|contextmenu|touch|click|dblclick|drag|drop)"),properties:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement dataTransfer".split(" "),process:function(e,t){var r,o,s;o=t.fromElement,s=t.button,null===e.pageX&&null!==t.clientX&&(r=e.target.ownerDocument||i,r=r.documentElement||r.body,e.pageX=t.clientX+(r.scrollLeft||0)-(r.clientLeft||0),e.pageY=t.clientY+(r.scrollTop||0)-(r.clientTop||0)),!e.relatedTarget&&o&&(e.relatedTarget=o===e.target?t.toElement:o),e.which||s===n||(e.which=1&s?1:2&s?3:4&s?2:0)}},key:{regex:new RegExp("^(?:key)"),properties:"char charCode key keyCode".split(" "),process:function(e,t){null===e.which&&(e.which=null!==t.charCode?t.charCode:t.keyCode)}}};return e.base.extend({add:function(e,t){return e&&t&&s[e]&&(s[e]=t),this},get:function(e){return e&&s[e]?s[e]:null},process:function(e,t){var r,n,i;for(r in s)n=s[r],i=!n.regex||n.regex.test(t.type),i&&(n.properties&&o(e,t,n.properties),n.process&&n.process(e,t),n.delegate&&(e.delegate=n.delegate))}})},this),function(e,t){var r=["../base","../support"];t.getComputedStyle||r.push("../polyfill/window/getcomputedstyle"),t.qoopido.registerSingleton("hook/css",e,r)}(function(e,t,r,n){"use strict";var o=e.support,i=r.getComputedStyle||e["polyfill/window/getcomputedstyle"],s={general:{get:function(e,t){return i(e,null).getPropertyValue(t[0])},set:function(e,t,r){e.style[t[1]]=r}},opacity:o.supportsCssProperty("opacity")?null:{regex:new RegExp("alpha\\(opacity=(.*)\\)","i"),get:function(e,t,r){return r=i(e,null).getPropertyValue("filter").toString().match(this.regex),r=r?r[1]/100:1},set:function(e,t,r){var n=e.style;n.zoom=1,n.filter="alpha(opacity="+(100*r+.5>>0)+")"}}};return e.base.extend({add:function(e,t){return e&&t&&s[e]&&(s[e]=t),this},get:function(e){return e&&s[e]?s[e]:null},process:function(e,t,r,n){var i;return r=o.getCssProperty(r,t)||null,r?((i=this.get(r[1]))&&i[e]||this.get("general")[e])(t,r,n):void 0}})},this),function(e,t){t.qoopido.register("dom/event",e,["../base","../hook/event"])}(function(e,t,r,n){"use strict";var o=e["hook/event"];return e.base.extend({originalEvent:null,isDelegate:!1,isDefaultPrevented:!1,isPropagationStopped:!1,isImmediatePropagationStopped:!1,_properties:null,_constructor:function(e){var t=this;return t._properties=[],t._obtain(e),t},_obtain:function(e){o.process(this,e)},_dispose:function(){for(var e,t=this,r=0;(e=t._properties[r])!==n;r++)delete t[e];delete t.delegate,t.originalEvent=null,t.isDelegate=!1,t.isDefaultPrevented=!1,t.isPropagationStopped=!1,t.isImmediatePropagationStopped=!1,t._properties.length=0},preventDefault:function(){var e=this,t=e.originalEvent;t.cancelable!==!1&&(e.isDefaultPrevented=!0,t.preventDefault?t.preventDefault():t.returnValue=!1)},stopPropagation:function(){var e=this,t=e.originalEvent;e.isPropagationStopped=!0,t.stopPropagation&&t.stopPropagation(),t.cancelBubble=!0},stopImmediatePropagation:function(){var e=this,t=e.originalEvent;e.isImmediatePropagationStopped=!0,t.stopImmediatePropagation&&t.stopImmediatePropagation(),e.stopPropagation()}})},this),function(e,t){var r=["../base","../function/unique/uuid","../hook/css","./event"];t.CustomEvent||r.push("../polyfill/window/customevent"),t.addEventListener||r.push("../polyfill/window/addeventlistener"),t.removeEventListener||r.push("../polyfill/window/removeeventlistener"),t.dispatchEvent||r.push("../polyfill/window/dispatchevent"),Element.prototype.matches||r.push("../polyfill/element/matches"),document.querySelector||r.push("../polyfill/document/queryselector"),document.querySelectorAll||r.push("../polyfill/document/queryselectorall"),String.prototype.trim||r.push("../polyfill/string/trim"),t.qoopido.register("dom/element",e,r)}(function(e,t,r,n){"use strict";function o(e){var t,r,n;for(t in P)r=P[t],(!r.regex||r.regex.test(e))&&(n=r);return n}function i(e,t,r){var n=this,i=o(e),s=c.createEvent(i.type);s[i.method](e,"load"===e?!1:!0,!0,t),r&&(s._quid=r,s.isDelegate=!0),n.element.dispatchEvent(s)}function s(e){var t;if("string"==typeof e)try{y.test(e)===!0?(t=e.replace(y,"$1").toLowerCase(),e=c.createElement(t)):e=c.querySelector(e)}catch(r){e=null}if(!e)throw new Error("[Qoopido.js] Element could not be resolved");return e}function u(e){return Array.prototype.concat.apply([],Array.prototype.splice.call(e,0)).join(" ").split(b)}function l(e,t){for(var r,o=0;(r=e.path[o])!==n;o++){if(r.matches(t))return e.currentTarget=r,!0;if(r===e.currentTarget)break}return!1}var c=r.document,p="object",a="string",f=e["function/unique/uuid"],d=c.getElementsByTagName("head")[0],m="textContent"in c.createElement("a")?"textContent":"innerText",h="undefined"!=typeof d.previousElementSibling?function(){return this.previousElementSibling}:function(){for(var e=this;e=e.previousSibling;)if(1===e.nodeType)return e},g="undefined"!=typeof d.nextElementSibling?function(){return this.nextElementSibling}:function(){for(var e=this;e=e.nextSibling;)if(1===e.nodeType)return e},y=new RegExp("^<(\\w+)\\s*/>$"),v=new RegExp("^[^-]+"),b=new RegExp(" +","g"),w=e["pool/module"]&&e["pool/module"].create(e["dom/event"],null,!0)||null,x=e["hook/css"],j={},P={custom:{type:"CustomEvent",method:"initCustomEvent"},html:{regex:new RegExp("^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$"),type:"HTMLEvents",method:"initEvent"},mouse:{regex:new RegExp("^(?:mouse|pointer|contextmenu|touch|click|dblclick|drag|drop)"),type:"MouseEvents",method:"initMouseEvent"}};return e.base.extend({type:null,element:null,_listener:null,_constructor:function(e,t,r){var n,o=this;return e=s(e),n=e._quid,n?o=j[n]:(n=e._quid=f(),o.type=e.tagName,o.element=e,o._listener={},j[n]=o),"object"==typeof t&&null!==t&&o.setAttributes(t),"object"==typeof r&&null!==r&&o.setStyles(r),o!==this&&this.dispose&&this.dispose(),o},_obtain:function(e,t,r){this._constructor(e,t,r)},_dispose:function(){var e,t,r=this;for(e in r._listener)t=e.match(v),r.element.removeEventListener(t,r._listener[e]),delete r._listener[e];r.type=null,r.element=null},getContent:function(e){var t=this.element;return e&&e!==!1?t.innerHTML:t[m]},setContent:function(e,t){var r=this,n=r.element;return t&&t!==!1?n.innerHTML=e:n[m]=e,r},getAttribute:function(e){var t=this;return e&&typeof e===a?t.element.getAttribute(e):void 0},getAttributes:function(){for(var e,t=this,r={},o=u(arguments),i=0;(e=o[i])!==n;i++)r[e]=t.element.getAttribute(e);return r},setAttribute:function(e,t){var r=this;return e&&typeof e===a&&r.element.setAttribute(e,t),r},setAttributes:function(e){var t,r=this;if(e&&typeof e===p&&!e.length)for(t in e)r.element.setAttribute(t,e[t]);return r},removeAttribute:function(e){var t=this;return e&&typeof e===a&&t.element.removeAttribute(e),t},removeAttributes:function(){for(var e,t=this,r=u(arguments),o=0;(e=r[o])!==n;o++)t.element.removeAttribute(e);return t},getStyle:function(e){var t=this;return e&&typeof e===a?x.process("get",t.element,e):void 0},getStyles:function(){for(var e,t=this,r={},o=u(arguments),i=0;(e=o[i])!==n;i++)r[e]=x.process("get",t.element,e);return r},setStyle:function(e,t){var r=this;return e&&typeof e===a&&x.process("set",r.element,e,t),r},setStyles:function(e){var t,r=this;if(e&&typeof e===p&&!e.length)for(t in e)x.process("set",r.element,t,e[t]);return r},removeStyle:function(e){var t=this;return e&&typeof e===a&&t.setStyle(e,""),t},removeStyles:function(){for(var e,t=this,r=u(arguments),o=0;(e=r[o])!==n;o++)t.setStyle(e,"");return t},siblings:function(e){for(var t=this.element,r=t.parentNode.firstChild,n=[];r;r=g.call(r))r===t||e&&!r.matches(e)||n.push(r);return n},siblingsBefore:function(e){for(var t=this.element.previousSibling,r=[];t;t=h.call(t))(!e||t.matches(e))&&r.push(t);return r},siblingsAfter:function(e){for(var t=this.element.nextSibling,r=[];t;t=g.call(t))(!e||t.matches(e))&&r.push(t);return r},previous:function(e){var t=h.call(this.element);if(!e)return t;for(;t;t=h.call(t))if(t.matches(e))return t},next:function(e){var t=g.call(this.element);if(!e)return t;for(;t;t=g.call(t))if(t.matches(e))return t},find:function(e){var t,r,n=this.element;return e=e.trim(),">"===e.charAt(0)?(t=n._quid,n.setAttribute("data-quid",t),e='[data-quid="'+t+'"] '+e,r=n.parentNode.querySelectorAll(e),n.removeAttribute("data-quid")):r=n.querySelectorAll(e),r},parent:function(e){var t;if(!e)return this.element.parentNode;for(t=this.element;t;t=t.parentNode)if(t.matches(e))return t},parents:function(e){for(var t=this.element.parentNode,r=[];t;t=t.parentNode){if(9===t.nodeType)return r;1===t.nodeType&&(!e||t.matches(e))&&r.push(t)}},isVisible:function(){var e=this,t=e.element;return!(t.offsetWidth<=0&&t.offsetHeight<=0||"hidden"===e.getStyle("visibility")||e.getStyle("opacity")<=0)},hasClass:function(e){return e?new RegExp("(?:^|\\s)"+e+"(?:\\s|$)").test(this.element.className):!1},addClass:function(e){var t=this;return e&&!t.hasClass(e)&&(t.element.className+=t.element.className?" "+e:e),t},removeClass:function(e){var t=this;return e&&t.hasClass(e)&&(t.element.className=t.element.className.replace(new RegExp("(?:^|\\s)"+e+"(?!\\S)"),"")),t},toggleClass:function(e){var t=this;return e&&(t.hasClass(e)?t.removeClass(e):t.addClass(e)),t},prepend:function(e){var t=this,r=t.element;if(e)try{e=e.element||s(e),r.firstChild?r.insertBefore(e,r.firstChild):t.append(e)}catch(n){r.insertAdjacentHTML("afterBegin",e)}return t},append:function(e){var t=this,r=t.element;if(e)try{r.appendChild(e.element||s(e))}catch(n){r.insertAdjacentHTML("beforeEnd",e)}return t},prependTo:function(e){var t=this,r=t.element;return e&&((e=e.element||s(e)).firstChild?e.insertBefore(r,e.firstChild):t.appendTo(e)),t},appendTo:function(e){var t=this;return e&&(e.element||s(e)).appendChild(t.element),t},insertBefore:function(e){var t=this,r=t.element;return e&&(e=e.element||s(e)).parentNode.insertBefore(r,e),t},insertAfter:function(e){var t=this,r=t.element;return e&&((e=e.element||s(e)).nextSibling?e.parentNode.insertBefore(r,e.nextSibling):t.appendTo(e.parentNode)),t},replace:function(e){var t=this,r=t.element;return e&&(e=e.element||s(e)).parentNode.replaceChild(r,e),t},replaceWith:function(e){var t=this,r=t.element;return e&&(e=e.element||s(e),r.parentNode.replaceChild(e,r)),t},remove:function(){var e=this,t=e.element;return t.parentNode.removeChild(t),e},on:function(t){var r,o=this,s=o.element,u=arguments.length>2?arguments[1]:null,c=arguments.length>2?arguments[2]:arguments[1],p=c._quid||(c._quid=f()),a=0;for(t=t.split(" ");(r=t[a])!==n;a++){var d=r+"-"+p,m=function(t){var r;t=w&&w.obtain(t)||e["dom/event"].create(t),t.isPropagationStopped||(r=t.delegate,t._quid=f(),(!u||l(t,u))&&c.call(t.currentTarget,t,t.originalEvent.detail),r&&(delete t.delegate,i.call(o,r))),t.dispose&&t.dispose()};m.type=r,o._listener[d]=m,s.addEventListener(r,m)}return o},one:function(e){var t=this,r=arguments.length>3||"string"==typeof arguments[1]?arguments[1]:null,n=arguments.length>3||"function"==typeof arguments[2]?arguments[2]:arguments[1],o=(arguments.length>3?arguments[3]:arguments[2])!==!1,i=function(r){t.off(o===!0?r.type:e,i),n.call(this,r,r.originalEvent.detail)};return n._quid=i._quid=f(),r?t.on(e,r,i):t.on(e,i),t},off:function(e,t){var r,o,i,s=this,u=s.element,l=0;for(e=e.split(" ");(r=e[l])!==n;l++)o=t._quid&&r+"-"+t._quid||null,i=o&&s._listener[o]||null,i?(u.removeEventListener(r,i),delete s._listener[o]):u.removeEventListener(r,t);return s},emit:function(e,t){var r=this;return i.call(r,e,t),r}})},this);