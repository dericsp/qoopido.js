(function(t){window.qoopido.register("support/capability/datauri",t,["../../support","../../dom/element","../../pool/dom"])})(function(t,e,r,n){"use strict";return t.support.addTest("/capability/datauri",function(e){var r=t["dom/element"].create(n.qoopido.shared.pool.dom.obtain("img"));r.one("error load",function(t){"load"===t.type&&1===r.element.width&&1===r.element.height?e.resolve():e.reject(),r.element.dispose()},!1).setAttribute("src","data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==")})});