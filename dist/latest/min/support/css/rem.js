/*! Qoopido.js library 3.7.2, 2015-08-05 | https://github.com/dlueth/qoopido.js | (c) 2015 Dirk Lueth */
!function(e){window.qoopido.register("support/css/rem",e,["../../support"])}(function(e,t,o,s,r,i,n){"use strict";var p=e.support;return p.addTest("/css/rem",function(e){var t=p.pool?p.pool.obtain("div"):i.createElement("div");try{t.style.fontSize="3rem"}catch(o){}/rem/.test(t.style.fontSize)?e.resolve():e.reject(),t.dispose&&t.dispose()})});