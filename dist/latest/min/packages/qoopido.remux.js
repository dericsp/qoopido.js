/*! Qoopido.js library 3.7.3, 2015-08-05 | https://github.com/dlueth/qoopido.js | (c) 2015 Dirk Lueth */
!function(e,t,n,i,r){"use strict";function o(e,o,a,c){var d,f=e.split("/");return u[e]?u[e]:(d=function(){if(a)for(var d,m,h=f.slice(0,-1).join("/"),y=0;(d=a[y])!==r;y++)m=p.test(d),m&&(d=s(h+"/"+d)),!u[d]&&arguments[y]&&(u[d]=arguments[y]),m&&!u[d]&&"undefined"!=typeof console&&console.error("".concat("[Qoopido.js] ",e,": Could not load dependency ",d));return u[e]=o(u,l,f,t,n,i,r),c&&c(u[e]),u[e]},void("undefined"!=typeof module&&module.exports?module.exports=define(d):"function"==typeof define&&define.amd?a?define(a,d):define(d):d()))}function a(e,t,n){o(e,t,n,function(t){u[e]=t.create()})}function s(e){for(var t;(t=e.replace(f,""))!==e;)e=t;return e.replace(m,"")}var c=n.qoopido||(n.qoopido={}),l=c.shared||(c.shared={}),u=c.modules||(c.modules={}),d=[],p=new RegExp("^\\.+\\/"),f=new RegExp("(?:\\/|)[^\\/]*\\/\\.\\."),m=new RegExp("(^\\/)|\\.\\/","g");c.register=o,c.registerSingleton=a,Object.create||d.push("./polyfill/object/create"),Object.getOwnPropertyNames||d.push("./polyfill/object/getownpropertynames"),Object.getOwnPropertyDescriptor&&function(){try{return Object.getOwnPropertyDescriptor({x:0},"x"),!0}catch(e){return!1}}()||d.push("./polyfill/object/getownpropertydescriptor"),o("base",e,d)}(function(e,t,n,i,r,o,a){"use strict";function s(e){for(var t,n={},i=Object.getOwnPropertyNames(e),r=0;(t=i[r])!==a;r++)n[t]=Object.getOwnPropertyDescriptor(e,t);return n}function c(){throw new Error("[Qoopido.js] Operation prohibited")}return{create:function(){var e,t=Object.create(this,s(this));return t._constructor&&(e=t._constructor.apply(t,arguments)),t.create=t.extend=c,e||t},extend:function(e,t){var n;return e=e||{},t=t===!0,e._parent=this,n=Object.create(this,s(e)),t===!0&&(n.extend=c),n}}},navigator,this,document),function(e){var t=[];window.getComputedStyle||t.push("polyfill/window/getcomputedstyle"),Array.prototype.indexOf||t.push("../array/indexof"),window.qoopido.register("polyfill/window/matchmedia",e,t)}(function(e,t,n,i,r,o,a){"use strict";function s(){var e=r.innerWidth||h.clientWidth,t=r.innerHeight||h.clientHeight,n=r.screen.width,i=r.screen.height,o=r.screen.colorDepth,a=r.devicePixelRatio;v.width=e,v.height=t,v["aspect-ratio"]=(e/t).toFixed(2),v.color=o,v["color-index"]=Math.pow(2,o),v["device-aspect-ratio"]=(n/i).toFixed(2),v["device-height"]=i,v["device-width"]=n,v["device-pixel-ratio"]=a||1,v.resolution=a&&96*a||r.screen.deviceXDPI||96,v.orientation=t>=e?"portrait":"landscape"}function c(e){var t,n,i={matches:!1,media:e,addListener:function(e){e&&n.push(e)},removeListener:function(e){for(var t,i=0;(t=n[i])!==a;i++)t===e&&n.splice(i,1)}};return i.matches=""===e?!0:l(e),y.push({mql:i,listeners:[]}),t=y.length-1,g[e]=t,n=y[t].listeners,i}function l(e){var t=-1!==e.indexOf(",")&&e.split(",")||[e],n=t.length-1,i=n,r=null,o=null,a="",s=0,c=!1,l="",u="",d=null,p=0,f=0,m=null,h="",y="",g="",x="",_="",z=!1;if(""===e)return!0;do if(r=t[i-n],c=!1,o=r.match(w.type),o&&(a=o[0],s=o.index),!o||-1===r.substring(0,s).indexOf("(")&&(s||!o[3]&&a!==o.input))z=!1;else{if(u=r,c="not"===o[1],s||(l=o[2],u=r.substring(a.length)),z=l===v.type||"all"===l||""===l,d=-1!==u.indexOf(" and ")&&u.split(" and ")||[u],p=d.length-1,f=p,z&&p>=0&&""!==u)do{if(m=d[p].match(w.media),!m||!v[m[3]]){z=!1;break}if(h=m[2],y=m[5],x=y,g=m[7],_=v[m[3]],g&&(x="px"===g?Number(y):"em"===g||"rem"===g?16*y:m[8]?(y/m[8]).toFixed(2):"dppx"===g?96*y:"dpcm"===g?.3937*y:Number(y)),z="min-"===h&&x?_>=x:"max-"===h&&x?x>=_:x?_===x:!!_,!z)break}while(p--);if(z)break}while(n--);return c?!z:z}function u(){var e,t,n=!1,i=0,o=0;if(y.length>0)for(s();(e=y[i])!==a;i++)if(n=l(e.mql.media),(n&&!e.mql.matches||!n&&e.mql.matches)&&(e.mql.matches=n,e.listeners))for(;(t=e.listeners[o])!==a;o++)t.call(r,e.mql)}function d(){r.clearTimeout(f),f=r.setTimeout(u,10)}function p(){var t,n=r.document.getElementsByTagName("script")[0],i=o.createElement("style"),s=["screen","print","speech","projection","handheld","tv","braille","embossed","tty"],c="#"+m+" { position: relative; z-index: 0; }",l="",u=r.addEventListener||(l="on")&&r.attachEvent,p=0;for(i.type="text/css",i.id=m,n.parentNode.insertBefore(i,n);(t=s[p])!==a;p++)c+="@media "+t+" { #"+m+" { position: relative; z-index: "+p+" } }";i.styleSheet?i.styleSheet.cssText=c:i.textContent=c,v.type=s[1*(r.getComputedStyle||e["polyfill/window/getcomputedstyle"])(i).zIndex||0],i.parentNode.removeChild(i),u(l+"resize",d),u(l+"orientationchange",d)}var f,m="qoopidoPolyfillWindowMatchmedia",h=o.documentElement,y=[],g={},v={},w={type:/\s*(only|not)?\s*(screen|print|[a-z\-]+)\s*(and)?\s*/i,media:/^\s*\(\s*(-[a-z]+-)?(min-|max-)?([a-z\-]+)\s*(:?\s*([0-9]+(\.[0-9]+)?|portrait|landscape)(px|em|dppx|dpcm|rem|%|in|cm|mm|ex|pt|pc|\/([0-9]+(\.[0-9]+)?))?)?\s*\)\s*$/};return r.matchMedia||(p(),s(),r.matchMedia=function(e){var t=g[e]||!1;return t===!1?c(e):y[t].mql}),r.matchMedia}),function(e){window.qoopido.register("emitter",e,["./base"])}(function(e,t,n,i,r,o,a){"use strict";function s(e,t){var n=t.charAt(0).toUpperCase()+t.slice(1);return e._mapped[t]=e[t],function(){var i,r=Array.prototype.slice.call(arguments);return e.emit.apply(e,["pre"+n,r]),i=e._mapped[t].apply(e,r),e.emit.apply(e,["post"+n,r,i]),i}}var c=/^(_|extend$|create$|on$|one$|off$|emit$|get.+)/;return e.base.extend({_mapped:null,_listener:null,_temp:null,_constructor:function(){var e,t=this;t._mapped={},t._listener={};for(e in t)"function"==typeof t[e]&&c.test(e)===!1&&(t[e]=s(t,e));return t},on:function(e,t){var n,i=this,r=0;for(e=e.split(" ");(n=e[r])!==a;r++)(i._listener[n]=i._listener[n]||[]).push(t);return i},one:function(e,t,n){n=n!==!1;var i=this;return i.on(e,function r(o){i.off(n===!0?o:e,r),t.apply(this,arguments)}),i},off:function(e,t){var n,i,r,o=this,s=0;if(e)for(e=e.split(" ");(n=e[s])!==a;s++)if(o._listener[n]=o._listener[n]||[],t)for(i=0;(r=o._listener[n][i])!==a;i++)r===t&&(o._listener[n].splice(i,1),i--);else o._listener[n].length=0;else for(n in o._listener)o._listener[n].length=0;return o},emit:function(e){var t,n=this,i=0;if(e!==a){for(n._listener[e]=n._listener[e]||[],n._temp=n._listener[e].slice();(t=n._temp[i])!==a;i++)t.apply(n,arguments);n._temp.length=0}return n}})}),function(e){var t=["../emitter"];window.matchMedia||t.push("../polyfill/window/matchmedia"),window.qoopido.register("component/sense",e,t)}(function(e,t,n,i,r,o,a){"use strict";function s(){var e=this,t=e.mql;e.emit(t.matches===!0?"matched":"dematched")}var c,l={};return c=e.emitter.extend({mql:null,_constructor:function(e){var t=c._parent._constructor.call(this),n=t.mql=l[e]||(l[e]=r.matchMedia(e)),i=function(){s.call(t)};return n.addListener(i),r.setTimeout(i,0),t},matches:function(){return this.mql.matches}})}),function(e){window.qoopido.registerSingleton("component/remux",e,["../emitter","./sense"])}(function(e,t,n,i,r,o,a){"use strict";function s(e,t){var n=this;return e&&t&&(u.className=e,u.style.fontSize=t+"px",p.layout=e,p.fontsize=t,(f.fontsize!==p.fontsize||f.layout!==p.layout)&&(p.ratio.device=r.devicePixelRatio||1,p.ratio.fontsize=p.fontsize/d,p.ratio.total=p.ratio.device*p.ratio.fontsize,f.layout!==p.layout&&n.emit("layoutchanged",p),f.fontsize!==p.fontsize&&n.emit("fontsizechanged",p),n.emit("statechanged",p),f.fontsize=p.fontsize,f.layout=p.layout)),n}function c(t,n,i){var o=this;r.setTimeout(function(){e["component/sense"].create(t).on("matched",function(){s.call(o,n,i)})},0)}var l,u=o.getElementsByTagName("html")[0],d=16,p={fontsize:null,layout:null,ratio:{}},f={fontsize:null,layout:null};return l=e.emitter.extend({_constructor:function(){var e=l._parent._constructor.call(this),t=parseInt(u.getAttribute("data-base"),10);return isNaN(t)===!1&&(d=t),e},getState:function(){return p},getLayout:function(){return p.layout},getFontsize:function(){return p.fontsize},setLayout:function(e,t){var n=this;return s.call(n,e,t),n},addLayout:function(e,t){var n,i,r,o,a,s,l,u,p=this;arguments.length>1?(n={},n[e]=t):n=arguments[0];for(i in n)for(r=n[i],o=r.min;o<=r.max;o++)l=Math.round(r.width*(o/d)),u=Math.round(r.width*((o+1)/d))-1,c.call(p,"screen and (min-width: "+l+"px) and (max-width: "+u+"px )",i,o),a=!a||l<a.width?{width:l,fontsize:o,layout:i}:a,s=!s||u>=s.width?{width:u,fontsize:o,layout:i}:s;return c.call(p,"screen and (max-width: "+(a.width-1)+"px)",a.layout,a.fontsize),c.call(p,"screen and (min-width: "+(s.width+1)+"px)",s.layout,s.fontsize),p}})});