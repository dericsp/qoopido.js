(function(t){window.qoopido.registerSingleton("url",t)})(function(t,e,o,r,n){"use strict";function i(t){var e=n.createElement("a");return e.href=t||"",e}var s,u,a=RegExp("[?&]?([^=]+)=([^&]*)","g");try{s=location}catch(c){s=i()}return u=RegExp("".concat("^",s.protocol,"//",s.hostname),"i"),t.base.extend({resolve:function(t){return i(t).href},redirect:function(t,e){e=e||r,e.location.href=this.resolve(t)},getParameter:function(t){for(var e,o={},r=i(t).search.split("+").join(" ");e=a.exec(r);)o[decodeURIComponent(e[1])]=decodeURIComponent(e[2]);return o},isLocal:function(t){return u.test(this.resolve(t))}})});