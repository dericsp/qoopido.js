/*! Qoopido.js library 3.6.9, 2015-07-10 | https://github.com/dlueth/qoopido.js | (c) 2015 Dirk Lueth */
!function(o){window.qoopido.register("support/css/rgba",o,["../../support"])}(function(o,r,t,s,e,a,c){"use strict";var i=o.support;return i.addTest("/css/rgba",function(o){var r=i.pool?i.pool.obtain("div"):a.createElement("div");try{r.style.backgroundColor="rgba(0,0,0,.5)"}catch(t){}/rgba/.test(r.style.backgroundColor)?o.resolve():o.reject(),r.dispose&&r.dispose()})});