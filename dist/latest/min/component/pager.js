(function(t){window.qoopido.register("component/pager",t,["../emitter","../function/merge"])})(function(t,e,n,r,i,s){"use strict";var o,a={loop:!0,initial:0};return o=t.emitter.extend({_settings:null,_state:null,_constructor:function(e,n){var r=this;o._parent._constructor.call(r),r._settings=t["function/merge"]({},a,n||{}),r._state={length:null,index:null,item:null,data:null},e!==s&&null!==e&&r.setData(e)},getState:function(){var t=this;return t._state},setData:function(t){var e=this;return"object"==typeof t&&(e._state.data=t,e._state.length=t.length,null!==e._settings.initial&&e.seek(e._settings.initial)),e},getData:function(){var t=this;return t._state.data},getLength:function(){var t=this;return t._state.length},getIndex:function(){var t=this;return t._state.index},getItem:function(t){var e=this;return e._state.data[t]!==s?e._state.data[t]:null},first:function(){var t=this;return t.seek(0)},last:function(){var t=this;return t.seek(t._state.length-1)},previous:function(){var t,e=this;return t=e._settings.loop===!0?(e._state.index-1)%e._state.length:e._state.index-1,t=e._settings.loop===!0&&0>t?e._state.length+t:t,e.seek(t)},next:function(){var t,e=this;return t=e._settings.loop===!0?(e._state.index+1)%e._state.length:e._state.index+1,e.seek(t)},seek:function(t){var e=this;return t=parseInt(t,10),t!==e._state.index&&e._state.data[t]!==s&&(e._state.index=t,e._state.item=e._state.data[t]),e}})});