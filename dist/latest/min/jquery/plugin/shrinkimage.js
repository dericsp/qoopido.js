/*! Qoopido.js library 3.7.4, 2015-08-14 | https://github.com/dlueth/qoopido.js | (c) 2015 Dirk Lueth */
!function(n,t){t.qoopido.register("jquery/plugins/shrinkimage",n,["../../dom/element/shrinkimage","jquery"])}(function(n,t,e,r){"use strict";var i,c=n.jquery||e.jQuery,o="shrinkimage",u="queued",a="cached",g="loaded",s="failed",f="".concat(u,".",o),h="".concat(a,".",o),d="".concat(g,".",o),m="".concat(s,".",o);return c.fn[o]=function(n){return this.each(function(){i.create(this,n)})},i=n["dom/element/shrinkimage"].extend({_constructor:function(n,t){var e=i._parent._constructor.call(this,n,t),r=c(n);return e.on(u,function(){r.trigger(f)}),e.on(a,function(){r.trigger(h)}),e.on(g,function(){r.trigger(d)}),e.on(s,function(){r.trigger(m)}),e}})},this);