(function(t){window.qoopido.register("dom/element/emerge",t,["../element","../../function/merge","../../function/unique/uuid"])})(function(t,e,n,r,i,o,l){"use strict";function s(t){var e,n=v[t];for(e in n)"length"!==e&&c.call(n[e]);0===n.length&&(i.element.clearInterval(m[t]),delete m[t])}function a(){h.left=0,h.top=0,h.right=d.clientWidth,h.bottom=d.clientHeight}function u(){var t=this,e=t._settings.threshold||d.clientWidth*t._settings.auto,n=t._settings.threshold||d.clientHeight*t._settings.auto;t._viewport.left=h.left-e,t._viewport.top=h.top-n,t._viewport.right=h.right+e,t._viewport.bottom=h.bottom+n}function c(){var t,e=this,n=!1,r=2;!e.isVisible()||"hidden"===e.getStyle("visibility")&&e._settings.visibility!==!1||(t=e.element.getBoundingClientRect(),(t.left>=e._viewport.left&&t.top>=e._viewport.top&&t.left<=e._viewport.right&&t.top<=e._viewport.bottom||t.right>=e._viewport.left&&t.bottom>=e._viewport.top&&t.right<=e._viewport.right&&t.bottom<=e._viewport.bottom)&&((t.left>=h.left&&t.top>=h.top&&t.left<=h.right&&t.top<=h.bottom||t.right>=h.left&&t.bottom>=h.top&&t.right<=h.right&&t.bottom<=h.bottom)&&(r=1),n=!0)),(n!==e._state||n===!0&&r!==e._priority)&&f.call(e,n,r)}function f(t,e){var n=this;n._state=t,n._priority=e,n._settings.recur!==!0&&n.remove(),t===!0?n.emit(y,e):n.emit(_)}var p,g={interval:50,threshold:"auto",recur:!0,auto:.5,visibility:!0},d=i.document.documentElement,h={},m={},v={},y="emerged",_="demerged",b="resize orientationchange";if(i=t["dom/element"].create(i),"CSS1Compat"!==o.compatMode)throw"This script requires your browser to work in standards mode";return p=t["dom/element"].extend({_quid:null,_viewport:null,_element:null,_settings:null,_state:null,_priority:null,_constructor:function(e,n){var r=this;p._parent._constructor.call(r,e),n=t["function/merge"]({},g,n||{}),"auto"===n.threshold&&delete n.threshold,m[n.interval]===l&&(v[n.interval]=v[n.interval]||{length:0},m[n.interval]=i.element.setInterval(function(){s(n.interval)},n.interval)),r._quid=t["function/unique/uuid"](),r._viewport={},r._settings=n,r._state=!1,r._priority=2,v[n.interval][r._quid]=r,v[n.interval].length++,i.on(b,function(){u.call(r)}),u.call(r)},remove:function(){var t=this;delete v[t._settings.interval][t._quid],v[t._settings.interval].length--}}),i.on(b,a),a(),p});