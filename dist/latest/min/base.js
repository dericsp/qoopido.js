(function(e,t,r,n,o){"use strict";function c(e,c,i,u){var p,f=e.split("/");return a[e]?a[e]:(p=function(){if(i){var p,l,g=f.slice(0,-1).join("/");for(p=0;(l=i[p])!==o;p++)d.test(l)&&(l=s(g+"/"+l)),!a[l]&&arguments[p]&&(a[l]=arguments[p]),a[l]||"undefined"==typeof console||console.error("".concat("[Qoopido.js] ",e,": Could not load dependency ",l))}return a[e]=c(a,f,t,r,n,o),u&&u(a[e]),a[e]},"function"==typeof define&&define.amd?i?define(i,p):define(p):p(),o)}function i(e,t,r){c(e,t,r,function(t){a[e]=t.create()})}function s(e){for(var t;(t=e.replace(l,""))!==e;)e=t;return e.replace(g,"")}var u="qoopido",p=r[u]=r[u]||{register:c,registerSingleton:i},a=(p.shared=p.shared||{},p.modules=p.modules||{}),f=[],d=RegExp("^\\.+\\/"),l=RegExp("(?:\\/|)[^\\/]*\\/\\.\\."),g=RegExp("(^\\/)|\\.\\/","g");Object.create||f.push("./polyfill/object/create"),Object.getOwnPropertyNames||f.push("./polyfill/object/getownpropertynames"),Object.getOwnPropertyDescriptor&&function(){try{return Object.getOwnPropertyDescriptor({x:0},"x"),!0}catch(e){return!1}}()||f.push("./polyfill/object/getownpropertydescriptor"),c("base",e,f)})(function(e,t,r,n,o,c){"use strict";function i(e){var t,r,n={},o=Object.getOwnPropertyNames(e);for(t=0;(r=o[t])!==c;t++)n[r]=Object.getOwnPropertyDescriptor(e,r);return n}return{create:function(){var e,t=Object.create(this,i(this));return t._constructor&&(e=t._constructor.apply(t,arguments)),t.create=t.extend=c,e||t},extend:function(e){return e=e||{},e._parent=this,Object.create(this,i(e))}}},navigator,window,document);