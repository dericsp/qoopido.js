(function(t){window.qoopido.register("polyfill/window/getcomputedstyle",t)})(function(t,e,n,r){"use strict";if(!r.getComputedStyle){var i=RegExp("(\\-([a-z]){1})","g"),o=function(){return arguments[2].toUpperCase()};r.getComputedStyle=function(t){var e=this;return e.element=t,e.getPropertyValue=function(e){return"float"===e&&(e="styleFloat"),i.test(e)&&(e=e.replace(i,o)),t.currentStyle[e]?t.currentStyle[e]:null},e}}return!0});