/*!
* Qoopido.js library
*
* version: 3.7.4
* date:    2015-08-14
* author:  Dirk Lueth <info@qoopido.com>
* website: https://github.com/dlueth/qoopido.js
*
* Copyright (c) 2015 Dirk Lueth
*/
(function(definition, global) {
    global.qoopido.register("component/iterator", definition, [ "../emitter", "../function/merge" ]);
})(function(modules, shared, global, undefined) {
    "use strict";
    var prototype, defaultSettings = {
        loop: true,
        initial: 0
    };
    prototype = modules["emitter"].extend({
        _settings: null,
        _state: null,
        _constructor: function(data, settings) {
            var self = prototype._parent._constructor.call(this);
            self._settings = modules["function/merge"]({}, defaultSettings, settings || {});
            self._state = {
                length: null,
                index: null,
                item: null,
                data: null
            };
            if (data !== undefined && data !== null) {
                self.setData(data);
            }
            return self;
        },
        getState: function() {
            var self = this;
            return self._state;
        },
        setData: function(data) {
            var self = this;
            if (typeof data === "object" && data.length) {
                self._state.data = data;
                self._state.length = data.length;
                if (self._settings.initial !== null) {
                    self.seek(self._settings.initial);
                }
            }
            return self;
        },
        getData: function() {
            var self = this;
            return self._state.data;
        },
        getLength: function() {
            var self = this;
            return self._state.length;
        },
        getIndex: function() {
            var self = this;
            return self._state.index;
        },
        getCurrent: function() {
            var self = this;
            return self._state.data[self._state.index] || null;
        },
        getItem: function(index) {
            var self = this;
            return self._state.data[index] || null;
        },
        first: function() {
            var self = this;
            return self.seek(0);
        },
        last: function() {
            var self = this;
            return self.seek(self._state.length - 1);
        },
        previous: function() {
            var self = this, index;
            index = self._settings.loop === true ? (self._state.index - 1) % self._state.length : self._state.index - 1;
            index = self._settings.loop === true && index < 0 ? self._state.length + index : index;
            return self.seek(index);
        },
        next: function() {
            var self = this, index;
            index = self._settings.loop === true ? (self._state.index + 1) % self._state.length : self._state.index + 1;
            return self.seek(index);
        },
        seek: function(index) {
            var self = this;
            index = parseInt(index, 10);
            if (index !== self._state.index && self._state.data[index] !== undefined) {
                self._state.index = index;
                self._state.item = self._state.data[index];
            }
            return self;
        }
    });
    return prototype;
}, this);