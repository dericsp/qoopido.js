/*!
* Qoopido.js library v3.3.2, 2014-5-24
* https://github.com/dlueth/qoopido.js
* (c) 2014 Dirk Lueth
* Dual licensed under MIT and GPL
*/
!function(t){window.qoopido.registerSingleton("component/remux",t,["../emitter","../dom/element"])}(function(t,e,n,o,a,l){"use strict";function i(t,e){var n=this;return d.fontsize=t||parseInt(a.getComputedStyle(s).getPropertyValue("font-size"),10),d.layout=e||a.getComputedStyle(s,":after").getPropertyValue("content")||null,null!==d.layout&&(d.layout=d.layout.replace(m,"")),null===d.layout||d.fontsize===f.fontsize&&d.layout===f.layout||(f.fontsize=d.fontsize,f.layout=d.layout,d.ratio.device=a.devicePixelRatio||1,d.ratio.fontsize=d.fontsize/c,d.ratio.total=d.ratio.device*d.ratio.fontsize,n.emit("statechange",d)),n}var r,u,s=l.getElementsByTagName("html")[0],c=16,d={fontsize:null,layout:null,ratio:{}},f={fontsize:null,layout:null},y=null,m=new RegExp("[\"']","g");return r=t.emitter.extend({_constructor:function(){var e=this,n=parseInt(s.getAttribute("data-base"),10),o=function(){null!==y&&a.clearTimeout(y),y=a.setTimeout(function(){i.call(e)},20)};r._parent._constructor.call(e),isNaN(n)===!1&&(c=n),u=l.createElement("style"),u.type="text/css","undefined"!=typeof u.sheet&&u.appendChild(l.createTextNode("")),l.getElementsByTagName("head")[0].appendChild(u),t["dom/element"].create(a).on("resize orientationchange",o),i.call(e)},getState:function(){return d},getLayout:function(){return d.layout},forceLayout:function(t,e){var n=this;return i.call(n,t,e),n},addLayout:function(t,e){var n,o,a,r,s,d,f=this;arguments.length>1?(n={},n[t]=e):n=arguments[0];for(o in n)for(a=n[o],r=a.min;r<=a.max;r++)s=Math.round(a.width*(r/c)),d="@media screen and (min-width: "+s+"px) { html { font-size: "+r+'px; } html:after { content: "'+o+'"; display: none; } }',u.styleSheet&&u.styleSheet.insertRule?u.styleSheet.insertRule(d,u.styleSheet.cssRules.length):u.sheet&&u.appendChild(l.createTextNode(d));return i.call(f),f}})});