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
!function(e){var t=[];document.querySelectorAll||t.push("../document/queryselectorall"),window.qoopido.register("polyfill/elements/matches",e,t)}(function(){"use strict";if(!Element.prototype.matches){var e=Element.prototype;e.matches=e.matchesSelector=e.matchesSelector||e.webkitMatchesSelector||e.mozMatchesSelector||e.msMatchesSelector||e.oMatchesSelector||function(e){for(var t,r=this.parentElement.querySelectorAll(e),o=0;t=r[o++];)if(t===this)return!0;return!1}}return Element.prototype.matches});