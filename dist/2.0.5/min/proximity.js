(function(t,e,n,r){"use strict";function i(){return[].push.apply(arguments,[e,n,r]),e[o]=e[o]||{},e[o][s]=t.apply(null,arguments)}var o="qoopido",s="proximity";"function"==typeof define&&define.amd?define(["./base"],i):i(e[o].base)})(function(t,e,n,r){"use strict";return t.extend({calculate:function(t,e){var n=!1;return t="object"==typeof t&&null!==t?t:{x:r,y:r},e="object"==typeof e&&null!==e?e:{x:r,y:r},t.x!==r&&t.y!==r&&e.x!==r&&e.y!==r&&(t.x=parseFloat(t.x),t.y=parseFloat(t.y),e.x=parseFloat(e.x),e.y=parseFloat(e.y),n={x:parseFloat(Math.abs(e.x-t.x)),y:parseFloat(Math.abs(e.y-t.y)),total:parseFloat(Math.sqrt(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2)))}),n}})},window,document);