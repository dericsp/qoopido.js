(function(t){"use strict";if("function"==typeof define&&define.amd){var e=[];document.querySelectorAll||e.push("../document/queryselectorall"),define(e,t)}else t()})(function(){"use strict";if(!Element.prototype.matches){var t=Element.prototype;t.matches=t.matchesSelector=t.matchesSelector||t.webkitMatchesSelector||t.mozMatchesSelector||t.msMatchesSelector||t.oMatchesSelector||function(t){for(var e,n=this.parentElement.querySelectorAll(t),i=0;e=n[i++];)if(e===this)return!0;return!1}}});