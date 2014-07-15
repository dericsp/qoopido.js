/*!
* Qoopido.js library v3.4.4, 2014-6-15
* https://github.com/dlueth/qoopido.js
* (c) 2014 Dirk Lueth
* Dual licensed under MIT and GPL
*//*!
* Qoopido.js library
*
* version: 3.4.4
* date:    2014-6-15
* author:  Dirk Lueth <info@qoopido.com>
* website: https://github.com/dlueth/qoopido.js
*
* Copyright (c) 2014 Dirk Lueth
*
* Dual licensed under the MIT and GPL licenses.
* - http://www.opensource.org/licenses/mit-license.php
* - http://www.gnu.org/copyleft/gpl.html
*/
!function(e){window.qoopido.register("pool",e,["./base","./function/merge","./function/unique/uuid"])}(function(e){"use strict";function t(){var e,t,i,n=this,o=n.metrics,u=n._settings,r=n._queue,s=n._variables,a=1;if(r.length>0&&(s.durationAverage>0&&(a=~~((a=u.frameBudget/s.durationAverage)<1?1:a)),(e=Math.min(r.length,(t=r.splice(0,a)).length))>0))if(o.inPool+e<=u.maxPoolsize){i=(new Date).getTime();for(var l=0;e>l;l++){var c=t[l],d=c._quid,_=c.dispose;c=n._dispose(c),c._quid=d,c.dispose=_,n._getPool.call(n,c).push(c)}o.inPool+=e,o.inQueue-=e,s.durationSamples+=e,s.durationTotal+=(new Date).getTime()-i,s.durationAverage=s.durationTotal/s.durationSamples}else{if("function"==typeof n._destroy)for(var p=0;e>p;p++)n._destroy(t[p]);t.length=0,o.inQueue-=e,o.destroyed+=e}}var i,n={interval:1e3/60,frameBudget:.5,maxPoolsize:1e3};return i=e.base.extend({metrics:null,_settings:null,_pool:null,_queue:null,_variables:null,_constructor:function(i){var o=this;o.metrics={total:0,inPool:0,inUse:0,inQueue:0,recycled:0,destroyed:0},o._settings=e["function/merge"]({},n,i),o._pool=o._initPool(),o._queue=[],o._variables={durationSamples:0,durationTotal:0,durationAverage:0},setInterval(function(){t.call(o)},o._settings.interval)},_initPool:function(){return[]},_initElement:function(t){var i=this;return t._quid=e["function/unique/uuid"](),t.dispose=function(){i.dispose(t)},i.metrics.total++,t},_getPool:function(){return this._pool},obtain:function(){var e=this,t=e._getPool.apply(e,arguments).pop();return t?(e.metrics.inPool--,e.metrics.recycled++):t=e._initElement(e._obtain.apply(e,arguments)),"function"==typeof t._obtain&&t._obtain.apply(t,arguments),e.metrics.inUse++,t},dispose:function(e){var t=this,i=t._queue;return e._quid||(e=t._initElement(e),t.metrics.inUse++),"function"==typeof e._dispose&&e._dispose(),i.push(e),t.metrics.inUse--,t.metrics.inQueue++,null}})});