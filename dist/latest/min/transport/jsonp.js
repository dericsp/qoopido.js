(function(t){window.qoopido.registerSingleton("transport/jsonp",t,["../transport","../function/merge","../function/unique/uuid","../url","../dom/element","../pool/dom","q"])})(function(t,e,o,r,n,i){"use strict";function s(t,e){var o=this,r=o.dfd,i=o.script,s=o.settings;e="object"==typeof e?o.serialize(e):e,t="".concat(t,t.indexOf("?")>-1?"&":"?","".concat(s.callback,"=",o.id)),t=s.cache===!1?"".concat(t,t.indexOf("?")>-1?"&":"?","".concat("_=",""+(new Date).getTime())):t,t=e?"".concat(t,t.indexOf("?")>-1?"&":"?",e):t,n[o.id]=function(t){try{delete n[o.id]}catch(e){n[o.id]=null}l.call(o),r.resolve(t)},i.on("load readystatechange",function(t){u.call(o,t)}).one("error",function(){a.call(o)}).setAttribute("src",t),f.appendChild(i.element),o.timeout=setTimeout(function(){c.call(o)},s.timeout)}function u(t){var e=this,o=e.dfd;t.readyState&&"loaded"!==t.readyState&&"complete"!==t.readyState||e.script.off().element.dispose(),e.timeout&&clearTimeout(e.timeout),e.timeout=setTimeout(function(){c.call(e)},e.settings.timeout),o.notify(t)}function a(){var t=this;l.call(t),t.dfd.reject()}function c(){var t=this;l.call(t),t.dfd.reject(!1)}function l(){var t=this;t.timeout&&clearTimeout(t.timeout),t.script.off().element.dispose()}var p,d=t.q||n.Q,f=i.getElementsByTagName("head")[0];return p=t.transport.extend({_settings:{callback:"callback",cache:!1,timeout:5e3},load:function(o,r,n){var i={};return o=t.url.resolve(o),i.id="".concat("jsonp-",t["function/unique/string"]()),i.dfd=d.defer(),i.script=t["dom/element"].create(e.pool.dom.obtain("script")),i.settings=t["function/merge"]({},this._settings,n),i.timeout=null,i.script.setAttribute("async",!0),s.call(i,o,r),i.dfd.promise}})},window,document);