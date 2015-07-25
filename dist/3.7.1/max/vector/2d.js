/*!
* Qoopido.js library
*
* version: 3.7.1
* date:    2015-07-25
* author:  Dirk Lueth <info@qoopido.com>
* website: https://github.com/dlueth/qoopido.js
*
* Copyright (c) 2015 Dirk Lueth
*/
(function(definition) {
    window.qoopido.register("vector/2d", definition, [ "../base" ]);
})(function(modules, shared, namespace, navigator, window, document, undefined) {
    "use strict";
    var prototype, TO_DEGREES = 180 / Math.PI, TO_RADIANS = Math.PI / 180, pool = shared.pool && shared.pool.object;
    prototype = modules["base"].extend({
        _temp: null,
        x: null,
        y: null,
        _constructor: function(x, y) {
            this._temp = pool ? pool.obtain() : {};
            this._temp.x = 0;
            this._temp.y = 0;
            this.x = x || 0;
            this.y = y || 0;
        },
        _obtain: function(x, y) {
            this.x = x || 0;
            this.y = y || 0;
        },
        _destroy: function() {
            this._temp = this._temp.dispose && this._temp.dispose();
        },
        getAngle: function(useRadians) {
            return useRadians ? Math.atan2(this.y, this.x) : Math.atan2(this.y, this.x) * TO_DEGREES % 360;
        },
        getLength: function(squared) {
            return squared ? this.x * this.x + this.y * this.y : Math.sqrt(this.x * this.x + this.y * this.y);
        },
        rotate: function(angle, useRadians) {
            var cosRY = Math.cos(angle * (useRadians ? 1 : TO_RADIANS)), sinRY = Math.sin(angle * (useRadians ? 1 : TO_RADIANS));
            this._temp.x = this.x;
            this._temp.y = this.y;
            this.x = this._temp.x * cosRY - this._temp.y * sinRY;
            this.y = this._temp.x * sinRY + this._temp.y * cosRY;
            return this;
        },
        invert: function() {
            this.x = -this.x;
            this.y = -this.y;
            return this;
        },
        add: function(vector) {
            this.x += typeof vector === "object" ? vector.x : vector;
            this.y += typeof vector === "object" ? vector.y : vector;
            return this;
        },
        subtract: function(vector) {
            this.x -= typeof vector === "object" ? vector.x : vector;
            this.y -= typeof vector === "object" ? vector.y : vector;
            return this;
        },
        multiply: function(vector) {
            this.x *= typeof vector === "object" ? vector.x : vector;
            this.y *= typeof vector === "object" ? vector.y : vector;
            return this;
        },
        divide: function(vector) {
            this.x /= typeof vector === "object" ? vector.x : vector;
            this.y /= typeof vector === "object" ? vector.y : vector;
            return this;
        }
    });
    return prototype;
});