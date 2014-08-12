/*!
* Qoopido.js library v3.4.5, 2014-7-12
* https://github.com/dlueth/qoopido.js
* (c) 2014 Dirk Lueth
* Dual licensed under MIT and GPL
*/
!function(t){window.qoopido.register("dom/collection",t,["../base","./element"])}(function(t,e,n,r,l,o,s){"use strict";function i(t){for(var e,n=this,r=n.elements,l=Array.prototype.slice.call(arguments,1),o=0;(e=r[o])!==s;o++)e[t].apply(e,l);return n}function u(t){for(var e,n=this,r=n.elements,l=Array.prototype.slice.call(arguments,1),o=r.length-1;(e=r[o])!==s;o--)e[t].apply(e,l);return n}var c=t["pool/module"]&&t["pool/module"].create(t["dom/element"])||null;return t.base.extend({elements:null,_constructor:function(e,n,r){var l,o=this,i=0;for(o.elements=[];(l=e[i])!==s;i++)o.elements.push(c?c.obtain(l):t["dom/element"].create(l));"object"==typeof n&&null!==n&&o.setAttributes(n),"object"==typeof r&&null!==r&&o.setStyles(r)},get:function(t){return this.elements[t]||null},each:function(t){for(var e,n=this,r=n.elements,l=0;(e=r[l])!==s;l++)t.call(e,l);return n},setAttribute:function(t,e){return i.call(this,"setAttribute",t,e)},setAttributes:function(t){return i.call(this,"setAttributes",t)},removeAttribute:function(t){return i.call(this,"removeAttribute",t)},removeAttributes:function(t){return i.call(this,"removeAttributes",t)},setStyle:function(t,e){return i.call(this,"setStyle",t,e)},setStyles:function(t){return i.call(this,"setStyles",t)},addClass:function(t){return i.call(this,"addClass",t)},removeClass:function(t){return i.call(this,"removeClass",t)},toggleClass:function(t){return i.call(this,"toggleClass",t)},prependTo:function(t){return u.call(this,"prependTo",t)},appendTo:function(t){return i.call(this,"appendTo",t)},insertBefore:function(t){return i.call(this,"insertBefore",t)},insertAfter:function(t){return u.call(this,"insertAfter",t)},replace:function(t){for(var e,n=this,r=n.elements,l=0;(e=r[l])!==s;l++)0===l?e.replace(t):e.insertAfter(r[l-1]);return n},remove:function(){for(var t,e=this,n=e.elements,r=n.length-1;(t=n[r])!==s;r--)t.remove(),t.dispose&&t.dispose(),n.pop();return e},on:function(){return i.apply(this,["on"].concat(Array.prototype.slice.call(arguments,0)))},one:function(){return i.apply(this,["one"].concat(Array.prototype.slice.call(arguments,0)))},off:function(){return i.apply(this,["off"].concat(Array.prototype.slice.call(arguments,0)))},emit:function(){return i.apply(this,["emit"].concat(Array.prototype.slice.call(arguments,0)))}})});