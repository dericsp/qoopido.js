/*! Qoopido.js library 3.7.4, 2015-08-14 | https://github.com/dlueth/qoopido.js | (c) 2015 Dirk Lueth */
!function(t,e){e.qoopido.register("polyfill/window/dispatchevent",t)}(function(t,e,n,o){"use strict";return n.dispatchEvent||(n.dispatchEvent=Window.prototype.dispatchEvent=HTMLDocument.prototype.dispatchEvent=Element.prototype.dispatchEvent=function(t){if(!arguments.length)throw new Error("Not enough arguments");if(!t||"string"!=typeof t.type)throw new Error("DOM Events Exception 0");var e=this,o=t.type;try{if(!t.bubbles){t.cancelBubble=!0;var r=function(t){t.cancelBubble=!0,(e||n).detachEvent("on"+o,r)};this.attachEvent("on"+o,r)}this.fireEvent("on"+o,t)}catch(i){t.target=e;do t.currentTarget=e,e._events&&e._events[o]&&e._events[o].call(e,t),e["on"+o]&&e["on"+o].call(e,t),e=9===e.nodeType?e.parentWindow:e.parentNode;while(e&&!t.cancelBubble)}return!0}),n.dispatchEvent},this);