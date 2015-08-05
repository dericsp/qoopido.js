/*!
* Qoopido.js library
*
* version: 3.7.2
* date:    2015-08-05
* author:  Dirk Lueth <info@qoopido.com>
* website: https://github.com/dlueth/qoopido.js
*
* Copyright (c) 2015 Dirk Lueth
*/
(function(definition) {
    window.qoopido.register("particle", definition, [ "./emitter", "./pool/module", "./vector/2d" ]);
})(function(modules, shared, namespace, navigator, window, document, undefined) {
    "use strict";
    var prototype, poolVector = modules["pool/module"].create(modules["vector/2d"], null, true);
    prototype = modules["emitter"].extend({
        _velocity: null,
        _acceleration: null,
        position: null,
        velocity: null,
        acceleration: null,
        _constructor: function(x, y) {
            var self = prototype._parent._constructor.call(this);
            this._velocity = poolVector.obtain(0, 0);
            this._acceleration = poolVector.obtain(0, 0);
            this.position = poolVector.obtain(x, y);
            this.velocity = poolVector.obtain(0, 0);
            this.acceleration = [];
            return self;
        },
        _obtain: function(x, y) {
            this.position.x = x || 0;
            this.position.y = y || 0;
            this.velocity.x = 0;
            this.velocity.y = 0;
            this.acceleration.length = 0;
        },
        _destroy: function() {
            this._velocity = this._velocity.dispose();
            this._acceleration = this._acceleration.dispose();
            this.position = this.position.dispose();
            this.velocity = this.velocity.dispose();
        },
        update: function(factor) {
            factor = typeof factor !== "undefined" ? parseFloat(factor) : 1;
            var i = 0, acceleration;
            for (;(acceleration = this.acceleration[i]) !== undefined; i++) {
                this.velocity.add(acceleration);
            }
            this._velocity.x = this.velocity.x * factor;
            this._velocity.y = this.velocity.y * factor;
            this.position.add(this._velocity);
        }
    });
    return prototype;
});