/*! Qoopido.js library 3.7.1, 2015-07-25 | https://github.com/dlueth/qoopido.js | (c) 2015 Dirk Lueth */
!function(o){window.qoopido.register("support/capability/touch",o,["../../support"])}(function(o,t,c,u,n,i,s){"use strict";return o.support.addTest("/capability/touch",function(o){"ontouchstart"in n||n.DocumentTouch&&i instanceof DocumentTouch||u.maxTouchPoints>0||u.msMaxTouchPoints>0?o.resolve():o.reject()})});