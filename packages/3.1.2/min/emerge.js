/*!
* Qoopido.js library package
*
* version: 3.1.2
* date:    2013-10-18
* author:  Dirk Lueth <info@qoopido.com>
* website: https://github.com/dlueth/qoopido.js
*
* Copyright (c) 2013 Dirk Lueth
*
* Dual licensed under the MIT and GPL licenses.
*  - http://www.opensource.org/licenses/mit-license.php
*  - http://www.gnu.org/copyleft/gpl.html
*/
(function(t){window.qoopido.register("polyfill/object/defineproperty",t)})(function(){"use strict";if(!Object.defineProperty||!function(){try{return Object.defineProperty({},"x",{}),!0}catch(t){return!1}}()){var t=Object.defineProperty,e=Object.prototype.__defineGetter__,n=Object.prototype.__defineSetter__;Object.defineProperty=function(r,i,o){if(t)try{return t(r,i,o)}catch(s){}if(r!==Object(r))throw new TypeError("Object.defineProperty called on non-object");return e&&"get"in o&&e.call(r,i,o.get),n&&"set"in o&&n.call(r,i,o.set),"value"in o&&(r[i]=o.value),r}}return!0});
(function(t){var e=[];Object.defineProperty&&function(){try{return Object.defineProperty({},"x",{}),!0}catch(t){return!1}}()||e.push("./defineproperty"),window.qoopido.register("polyfill/object/defineproperties",t,e)})(function(){"use strict";return Object.defineProperties||(Object.defineProperties=function(t,e){if(t!==Object(t))throw new TypeError("Object.defineProperties called on non-object");var n;for(n in e)Object.prototype.hasOwnProperty.call(e,n)&&Object.defineProperty(t,n,e[n]);return t}),!0});
(function(t){var e=[];Object.defineProperties||e.push("./defineproperties"),window.qoopido.register("polyfill/object/create",t,e)})(function(){"use strict";return Object.create||(Object.create=function(t,e){function n(){}if("object"!=typeof t)throw new TypeError;n.prototype=t;var r=new n;if(t&&(r.constructor=n),arguments.length>1){if(e!==Object(e))throw new TypeError;Object.defineProperties(r,e)}return r}),!0});
(function(t){window.qoopido.register("polyfill/object/getownpropertydescriptor",t)})(function(){"use strict";if(!Object.getOwnPropertyDescriptor||!function(){try{return Object.getOwnPropertyDescriptor({x:0},"x"),!0}catch(t){return!1}}()){var t=Object.getOwnPropertyDescriptor;Object.getOwnPropertyDescriptor=function(e,n){if(e!==Object(e))throw new TypeError;try{return t.call(Object,e,n)}catch(r){}return Object.prototype.hasOwnProperty.call(e,n)?{value:e[n],enumerable:!0,writable:!0,configurable:!0}:undefined}}return!0});
(function(e,t,r,n,o){"use strict";function c(e,c,i,u){var p,f=e.split("/");return a[e]?a[e]:(p=function(){if(i){var p,l,g=f.slice(0,-1).join("/");for(p=0;(l=i[p])!==o;p++)d.test(l)&&(l=s(g+"/"+l)),!a[l]&&arguments[p]&&(a[l]=arguments[p]),a[l]||"undefined"==typeof console||console.error("".concat("[Qoopido.js] ",e,": Could not load dependency ",l))}return a[e]=c(a,f,t,r,n,o),u&&u(a[e]),a[e]},"function"==typeof define&&define.amd?i?define(i,p):define(p):p(),o)}function i(e,t,r){c(e,t,r,function(t){a[e]=t.create()})}function s(e){for(var t;(t=e.replace(l,""))!==e;)e=t;return e.replace(g,"")}var u="qoopido",p=r[u]=r[u]||{register:c,registerSingleton:i},a=(p.shared=p.shared||{},p.modules=p.modules||{}),f=[],d=RegExp("^\\.+\\/"),l=RegExp("(?:\\/|)[^\\/]*\\/\\.\\."),g=RegExp("(^\\/)|\\.\\/","g");Object.create||f.push("./polyfill/object/create"),Object.getOwnPropertyNames||f.push("./polyfill/object/getownpropertynames"),Object.getOwnPropertyDescriptor&&function(){try{return Object.getOwnPropertyDescriptor({x:0},"x"),!0}catch(e){return!1}}()||f.push("./polyfill/object/getownpropertydescriptor"),c("base",e,f)})(function(e,t,r,n,o,c){"use strict";function i(e){var t,r,n={},o=Object.getOwnPropertyNames(e);for(t=0;(r=o[t])!==c;t++)n[r]=Object.getOwnPropertyDescriptor(e,r);return n}return{create:function(){var e,t=Object.create(this,i(this));return t._constructor&&(e=t._constructor.apply(t,arguments)),t.create=t.extend=c,e||t},extend:function(e){return e=e||{},e._parent=this,Object.create(this,i(e))}}},navigator,window,document);
(function(t){window.qoopido.register("proxy",t,["./function/unique/uuid"])})(function(t){"use strict";return t.base.extend({_constructor:function(e,n){var r=Array.prototype.splice.call(arguments,2),o=function(){return n.apply(e,Array.prototype.slice.call(arguments,0).concat(r))};return o._quid=t["function/unique/uuid"](),o}})});
(function(t){var e=["../proxy"];window.getComputedStyle||e.push("../polyfill/window/getcomputedstyle"),window.qoopido.register("dom/element",t,e)})(function(t,e,n,r,i,o){"use strict";function a(t){return t.target||(t.target=t.srcElement||i),3===t.target.nodeType&&(t.target=t.target.parentNode),!t.relatedTarget&&t.fromElement&&(t.relatedTarget=t.fromElement===t.target?t.toElement:t.fromElement),t}var s,l,u,c="object",f="string";return s=r.addEventListener?function(t,e){var n=this,r=n.element,i="".concat("listener[",t,"][",e._quid||e,"]");r[i]=function(t){e.call(this,a(t))},r.addEventListener(t,r[i],!1)}:function(t,e){var n=this,i=n.element,s="".concat("listener[",t,"][",e._quid||e,"]");i[s]=function(){e.call(this,a(r.event))},i["on"+t]!==o?i.attachEvent("on"+t,i[s]):(t="".concat("fake[",t,"]"),i[t]=null,i.attachEvent("onpropertychange",function(n){n.propertyName===t&&e.call(this,a(i[t]))}))},l=r.removeEventListener?function(t,e){var n=this,r=n.element,i="".concat("listener[",t,"][",e._quid||e,"]");r.removeEventListener(t,r[i],!1),delete r[i]}:function(t,e){var n=this,r=n.element,i="".concat("listener[",t,"][",e._quid||e,"]");r.detachEvent("on"+t,r[i]),delete r[i]},u=i.createEvent?function(t,e){var n=this,r=n.element,o=i.createEvent("HTMLEvents");o.initEvent(t,!0,!0),o.data=e,r.dispatchEvent(o)}:function(t,e){var n=this,r=n.element,a=i.createEventObject();a.type=a.eventType=t,a.data=e;try{r.fireEvent("on"+a.eventType,a)}catch(s){var l="".concat("fake[",t,"]");r[l]!==o&&(r[l]=a)}},t.base.extend({type:null,element:null,listener:null,_constructor:function(t){var e=this;if(!t)throw Error("Missing element argument");e.type=t.tagName,e.element=t,e.listener={}},getAttribute:function(t){if(t&&typeof t===f){var e=this;return t=t.split(" "),1===t.length?e.element.getAttribute(t[0]):e.getAttributes(t)}},getAttributes:function(t){var e=this,n={};if(t&&(t=typeof t===f?t.split(" "):t,typeof t===c&&t.length)){var r,i;for(r=0;(i=t[r])!==o;r++)n[i]=e.element.getAttributes(i)}return n},setAttribute:function(t,e){var n=this;return t&&typeof t===f&&n.element.setAttribute(t,e),n},setAttributes:function(t){var e=this;if(t&&typeof t===c&&!t.length){var n;for(n in t)e.element.setAttribute(n,t[n])}return e},removeAttribute:function(t){var e=this;return t&&typeof t===f&&(t=t.split(" "),1===t.length?e.element.removeAttribute(t[0]):e.removeAttributes(t)),e},removeAttributes:function(t){var e=this;if(t&&(t=typeof t===f?t.split(" "):t,typeof t===c&&t.length)){var n,r;for(n=0;(r=t[n])!==o;n++)e.element.removeAttribute(r)}return e},getStyle:function(t){if(t&&typeof t===f){var e=this;return t=t.split(" "),1===t.length?r.getComputedStyle(e.element,null).getPropertyValue(t[0]):e.getStyles(t)}},getStyles:function(t){var e=this,n={};if(t&&(t=typeof t===f?t.split(" "):t,typeof t===c&&t.length)){var i,a;for(i=0;(a=t[i])!==o;i++)n[a]=r.getComputedStyle(e.element,null).getPropertyValue(a)}return n},setStyle:function(t,e){var n=this;return t&&typeof t===f&&(n.element.style[t]=e),n},setStyles:function(t){var e=this;if(t&&typeof t===c&&!t.length){var n;for(n in t)e.element.style[n]=t[n]}return e},isVisible:function(){var t=this.element;return!(0>=t.offsetWidth&&0>=t.offsetHeight)},on:function(t,e){var n,r,i=this;for(t=t.split(" "),n=0;(r=t[n])!==o;n++)(i.listener[r]=i.listener[r]||[]).push(e),s.call(i,r,e);return i},one:function(e,n,r){r=r!==!1;var i=this,o=t.proxy.create(i,function(t){i.off(r===!0?t.type:e,o),n.call(i,t)});return i.on(e,o),i},off:function(t,e){var n,r,i,a,s=this;if(t)for(t=t.split(" "),n=0;(r=t[n])!==o;n++)if(s.listener[r]=s.listener[r]||[],e)for(i=0;(a=s.listener[r][i])!==o;i++)a===e&&(s.listener[r].splice(i,1),l.call(s,r,a),i--);else for(;s.listener[r].length>0;)l.call(s,r,s.listener[r].pop());else for(r in s.listener)for(;s.listener[r].length>0;)l.call(s,r,s.listener[r].pop());return s},emit:function(t,e){var n=this;return u.call(n,t,e),n}})});
(function(t){window.qoopido.register("function/merge",t)})(function(t,e,n,r,i,o){"use strict";return function a(){var t,e,n,r,i,l=arguments[0];for(t=1;(e=arguments[t])!==o;t++)for(n in e)r=l[n],i=e[n],i!==o&&(null!==i&&"object"==typeof i?(r=i.length!==o?r&&"object"==typeof r&&r.length!==o?r:[]:r&&"object"==typeof r&&r.length===o?r:{},l[n]=a(r,i)):l[n]=i);return l}});
(function(t){window.qoopido.register("function/unique/uuid",t)})(function(){"use strict";function t(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(n,function(t){var e=0|16*Math.random(),n="x"===t?e:8|3&e;return n.toString(16)})}var e={},n=RegExp("[xy]","g");return function(){var n;do n=t();while(e[n]!==undefined);return e[n]=!0,n}});
(function(t){window.qoopido.register("dom/element/emerge",t,["../element","../../function/merge","../../function/unique/uuid"])})(function(t,e,n,r,i,o){"use strict";function l(t){var e,n=m[t];for(e in n)"length"!==e&&u.call(n[e]);0===n.length&&(r.element.clearInterval(d[t]),delete d[t])}function s(){h.left=0,h.top=0,h.right=g.clientWidth,h.bottom=g.clientHeight}function a(){var t=this,e=t._settings.threshold||g.clientWidth*t._settings.auto,n=t._settings.threshold||g.clientHeight*t._settings.auto;t._viewport.left=h.left-e,t._viewport.top=h.top-n,t._viewport.right=h.right+e,t._viewport.bottom=h.bottom+n}function u(){var t,e=this,n=!1,r=2;!e.isVisible()||"hidden"===e.getStyle("visibility")&&e._settings.visibility!==!1||(t=e.element.getBoundingClientRect(),(t.left>=e._viewport.left&&t.top>=e._viewport.top&&t.left<=e._viewport.right&&t.top<=e._viewport.bottom||t.right>=e._viewport.left&&t.bottom>=e._viewport.top&&t.right<=e._viewport.right&&t.bottom<=e._viewport.bottom)&&((t.left>=h.left&&t.top>=h.top&&t.left<=h.right&&t.top<=h.bottom||t.right>=h.left&&t.bottom>=h.top&&t.right<=h.right&&t.bottom<=h.bottom)&&(r=1),n=!0)),(n!==e._state||n===!0&&r!==e._priority)&&c.call(e,n,r)}function c(t,e){var n=this;n._state=t,n._priority=e,n._settings.recur!==!0&&n.remove(),t===!0?n.emit(v,e):n.emit(_)}var f,p={interval:50,threshold:"auto",recur:!0,auto:.5,visibility:!0},g=r.document.documentElement,h={},d={},m={},v="emerged",_="demerged",y="resize orientationchange";if(r=t["dom/element"].create(r),"CSS1Compat"!==i.compatMode)throw"This script requires your browser to work in standards mode";return f=t["dom/element"].extend({_quid:null,_viewport:null,_element:null,_settings:null,_state:null,_priority:null,_constructor:function(e,n){var i=this;f._parent._constructor.call(i,e),n=t["function/merge"]({},p,n||{}),"auto"===n.threshold&&delete n.threshold,d[n.interval]===o&&(m[n.interval]=m[n.interval]||{length:0},d[n.interval]=r.element.setInterval(function(){l(n.interval)},n.interval)),i._quid=t["function/unique/uuid"](),i._viewport={},i._settings=n,i._state=!1,i._priority=2,m[n.interval][i._quid]=i,m[n.interval].length++,r.on(y,function(){a.call(i)}),a.call(i)},remove:function(){var t=this;delete m[t._settings.interval][t._quid],m[t._settings.interval].length--}}),r.on(y,s),s(),f});