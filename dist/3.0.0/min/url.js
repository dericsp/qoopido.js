(function(e,t){"use strict";function n(){return t.qoopido.shared.module.initialize("url",e,arguments,!0)}"function"==typeof define&&define.amd?define(["./base"],n):n(t.qoopido.base)})(function(e,t,n,r){"use strict";function o(e){var t=r.createElement("a");return t.href=e||"",t}var i,u,s=RegExp("[?&]?([^=]+)=([^&]*)","g");try{i=location}catch(a){i=o()}return u=RegExp("".concat("^",i.protocol,"//",i.hostname),"i"),e.extend({resolve:function(e){return o(e).href},redirect:function(e,t){t=t||n,t.location.href=this.resolve(e)},getParameter:function(e){for(var t,n={},r=o(e).search.split("+").join(" ");t=s.exec(r);)n[decodeURIComponent(t[1])]=decodeURIComponent(t[2]);return n},isLocal:function(e){return u.test(this.resolve(e))}})},window);