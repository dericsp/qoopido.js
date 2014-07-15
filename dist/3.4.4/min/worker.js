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
!function(e){window.qoopido.register("worker",e,["./base","./support","./promise/defer"])}(function(e,t,s,n,r){"use strict";var o=e["promise/defer"],p=new RegExp("Blob$","i"),u=e.support.supportsMethod("Worker"),i=e.support.supportsMethod("URL")?r[e.support.getMethod("URL")]:null,a=e.support.getMethod("Blob")||e.support.getMethod("BlobBuilder"),c="var self = this, regex = new RegExp(',\\s+', 'g'); self.addEventListener('message', function(pEvent) { self.postMessage({ type: 'result', result: self.process(pEvent.data.func).apply(null, pEvent.data.args)}); }, false); self.postProgress = function(pProgress) { self.postMessage({ type: 'progress', progress: pProgress}); }; self.process = function(pFunction) { var functionArguments = pFunction.substring(pFunction.indexOf('(') + 1, pFunction.indexOf(')')).replace(regex, ',').split(','); functionArguments.push(pFunction.substring(pFunction.indexOf('{') + 1, pFunction.lastIndexOf('}'))); return Function.apply(null, functionArguments); };",l=null;return u&&i&&a&&(l=i.createObjectURL(p.test(a)===!0?new r[a]([c],{type:"text/javascript"}):(new r[a]).append(c).getBlob("text/javascript"))),e.base.extend({execute:function(e,t){var s=new o;if(t=t||[],l){var n=new Worker(l);n.addEventListener("message",function(e){switch(e.data.type){case"result":s.resolve(e.data.result)}},!1),n.addEventListener("error",function(e){s.reject(e)},!1),n.postMessage({func:e.toString(),args:t})}else setTimeout(function(){try{s.resolve(e.apply(null,t))}catch(n){s.reject()}},0);return s.promise}})});