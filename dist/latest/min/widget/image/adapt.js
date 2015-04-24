/*!
* Qoopido.js library v3.6.3, 2015-4-24
* https://github.com/dlueth/qoopido.js
* (c) 2015 Dirk Lueth
* Dual licensed under MIT and GPL
*/
!function(e){window.qoopido.register("widget/image/adapt",e,["../../dom/element","../../dom/element/emerge","../../component/sense"])}(function(e,t,i,n,a,o,r){"use strict";function l(e){var t=this;return t._container.setStyle("paddingBottom",100*e+"%"),t}function c(e,t){var i=this;e.mql=h.create(t).on("matched dematched",function(){d.call(i)})}function d(){for(var e,t,i,n,o,c,d=this,s=0;(e=d._candidates[s])!==r;s++)if(!e.mql||e.mql.matches&&e.mql.matches()===!0){l.call(d,e.ratio),d._visible===!0&&(t=d._image||(d._image=A.create("<img />",{src:"data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",alt:d._caption},{position:"absolute",display:"block",width:"100%",height:"100%",top:"0",left:"0",margin:"0",padding:"0"}).appendTo(d._container)),i=t.element.getBoundingClientRect(),n=Math.round(i.width),o=Math.round(i.width*e.ratio),c=e.url.replace(g,"$1."+n+"x"+o+"@"+(a.devicePixelRatio||1)+".$2"),t.setAttribute("src",c));break}}function s(){for(var e,t=0;(e=_[t])!==r;t++)d.call(e)}function m(){a.clearTimeout(u),u=a.setTimeout(s,200)}var p,u,g=new RegExp("(.+?).(jpg|jpeg|png|gif|webp)$"),A=e["dom/element"],h=e["component/sense"],_=[];return p=e["dom/element/emerge"].extend({_visible:!1,_candidates:null,_container:null,_image:null,_caption:null,_constructor:function(e,t){var i,n,a,o,s=this,m=0;for(p._parent._constructor.call(s,e,t),i=parseFloat(s.getAttribute("data-ratio")||1),n=s.find('[itemprop="source"],[itemprop="contentUrl"]'),s._candidates=[],s._container=A.create("<div />").setStyles({position:"relative",display:"block",width:"100%",height:0,padding:0}).appendTo(s),s._caption=(o=s.find('[itemprop="caption"]')[0])?o.getAttribute("content"):null,l.call(s,i);(a=n[m])!==r;m++){var u=parseFloat(a.getAttribute("data-ratio")||i),g=a.getAttribute("data-media")||null;s._candidates.push({ratio:u,url:a.getAttribute("content"),mql:g}),g&&c.call(s,s._candidates[s._candidates.length-1],g)}s.on("emerged demerged",function(e){s._visible="emerged"===e.type?!0:!1,d.call(s)}),_.push(s)}}),A.create(a).on("resize orientationchange",m),p});