(function(t){window.qoopido.register("jquery/plugins/emerge",t,["../../dom/element/emerge","jquery"])})(function(t,e,n,r){"use strict";var i,o=t.jquery||r.jQuery,a=e.pop(),s="emerged",l="demerged",u="".concat(s,".",a),c="".concat(l,".",a);return o.fn[a]=function(t){return this.each(function(){i.create(this,t)})},i=t["element/emerge"].extend({_constructor:function(t,e){var n=this,r=o(t);i._parent._constructor.call(n,t,e),n.on(s,function(t){r.trigger(u,{priority:t.data})}),n.on(l,function(){r.trigger(c)})}})});