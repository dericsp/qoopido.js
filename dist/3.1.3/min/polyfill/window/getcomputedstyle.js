(function(t){window.qoopido.register("polyfill/window/getcomputedstyle",t)})(function(t,e,n,r,i){"use strict";if(!i.getComputedStyle){var o=RegExp("(\\-([a-z]){1})","g"),s=function(){return arguments[2].toUpperCase()};i.getComputedStyle=function(t){var e=this;return e.element=t,e.getPropertyValue=function(e){return"float"===e&&(e="styleFloat"),o.test(e)&&(e=e.replace(o,s)),t.currentStyle[e]?t.currentStyle[e]:null},e}}return!0});