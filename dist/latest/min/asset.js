/*! Qoopido.js library 3.7.0, 2015-07-23 | https://github.com/dlueth/qoopido.js | (c) 2015 Dirk Lueth */
!function(e){window.qoopido.register("asset",e,["./emitter","./transport/xhr","./promise/defer","./function/unique/uuid"])}(function(e,o,t,r,i,n,u){"use strict";function a(e){m.push(e),1===m.length&&c()}function c(){l(m[0]).then(function(){m.splice(0,1)&&m.length>=1&&c()},function(){m.splice(0,1)&&m.length>=1&&c()})}function l(e){var o=d[e._uuid],t=o.dfd,r=o.url;return v.get(r,null,f).then(function(i){var u=i.data,a=o.id,c=o.version,l=o.storage;e.emit("loaded",r,a,c,u),l&&(n.cookie=o.cookie+"="+encodeURIComponent(c)+"; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/",localStorage[l.version]=c,localStorage[l.value]=u,e.emit("stored",r,a,c,u,l.version,l.value)),t.resolve(localStorage[l.value])},function(){t.reject()})}var s,d={},v=e["transport/xhr"],f={cache:!0},g=e["promise/defer"],p=e["function/unique/uuid"],h=new RegExp("/","g"),m=[];return s=e.emitter.extend({_uuid:null,_constructor:function(e,o,t){var r=this,i=p(),n=d[i]={dfd:new g,url:e};s._parent._constructor.call(r),r._uuid=i,o&&t&&(n.id=o,n.version=t,n.cookie=encodeURIComponent("qoopido[asset]["+o.replace(h,"][")+"]"),n.storage={version:"@"+o,value:"©"+o})},fetch:function(){var e=this,o=d[e._uuid],t=o.dfd,r=o.url,i=o.id,n=o.version,u=o.storage,c=u&&u.version&&localStorage[u.version];if(c&&c>=n){var l=localStorage[o.storage.value];e.emit("hit",r,i,n,l),t.resolve(l)}else e.emit("miss",r,i,n),a(e);return t.promise},clear:function(){var e=this,o=d[e._uuid],t=o.storage;return t&&(n.cookie=o.cookie+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/",delete localStorage[t.version],delete localStorage[t.value],e.emit("cleared",o.url,o.id,o.version)),e}})},window,document);