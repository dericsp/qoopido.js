/*! Qoopido.js library 3.7.2, 2015-08-05 | https://github.com/dlueth/qoopido.js | (c) 2015 Dirk Lueth */
!function(e){window.qoopido.register("asset",e,["./emitter","./transport/xhr","./promise/defer","./function/unique/uuid"])}(function(e,o,t,r,n,i,u){"use strict";function a(e){m.push(e),1===m.length&&c()}function c(){l(m[0]).then(function(){m.splice(0,1)&&m.length>=1&&c()},function(){m.splice(0,1)&&m.length>=1&&c()})}function l(e){var o=d[e._uuid],t=o.dfd,r=o.url;return v.get(r,null,f).then(function(n){var u=n.data,a=o.id,c=o.version,l=o.storage;e.emit("loaded",r,a,c,u),l&&(i.cookie=o.cookie+"="+encodeURIComponent(c)+"; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/",localStorage[l.version]=c,localStorage[l.value]=u,e.emit("stored",r,a,c,u,l.version,l.value)),t.resolve(localStorage[l.value])},function(){t.reject()})}var s,d={},v=e["transport/xhr"],f={cache:!0},g=e["promise/defer"],p=e["function/unique/uuid"],h=new RegExp("/","g"),m=[];return s=e.emitter.extend({_uuid:null,_constructor:function(e,o,t){var r=s._parent._constructor.call(this),n=p(),i=d[n]={dfd:new g,url:e};return r._uuid=n,o&&t&&(i.id=o,i.version=t,i.cookie=encodeURIComponent("qoopido[asset]["+o.replace(h,"][")+"]"),i.storage={version:"@"+o,value:"©"+o}),r},fetch:function(){var e=this,o=d[e._uuid],t=o.dfd,r=o.url,n=o.id,i=o.version,u=o.storage,c=u&&u.version&&localStorage[u.version];if(c&&c>=i){var l=localStorage[o.storage.value];e.emit("hit",r,n,i,l),t.resolve(l)}else e.emit("miss",r,n,i),a(e);return t.promise},clear:function(){var e=this,o=d[e._uuid],t=o.storage;return t&&(i.cookie=o.cookie+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/",delete localStorage[t.version],delete localStorage[t.value],e.emit("cleared",o.url,o.id,o.version)),e}})},window,document);