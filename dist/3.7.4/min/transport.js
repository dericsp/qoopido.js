/*! Qoopido.js library 3.7.4, 2015-08-14 | https://github.com/dlueth/qoopido.js | (c) 2015 Dirk Lueth */
!function(e,n){n.qoopido.register("transport",e,["./base","./function/merge"])}(function(e,n,t,o){"use strict";var i;return i=e.base.extend({setup:function(n){var t=this;return t._settings=e["function/merge"]({},t._settings,n),t},serialize:function(e,n){var t,o,i,r=[];for(t in e)o=n?"".concat(n,"[",t,"]"):t,i=e[t],r.push("object"==typeof i?this.serialize(i,o):"".concat(encodeURIComponent(o),"=",encodeURIComponent(i)));return r.join("&")}})},this);