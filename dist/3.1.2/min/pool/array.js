(function(t){window.qoopido.register("pool/array",t,["../pool"])})(function(t,e,n,r){"use strict";var i=t.pool.extend({_dispose:function(t){return t.length=0,t},_obtain:function(){return[]}});return r.qoopido.shared.pool=r.qoopido.shared.pool||{},r.qoopido.shared.pool.array=i.create(),i});