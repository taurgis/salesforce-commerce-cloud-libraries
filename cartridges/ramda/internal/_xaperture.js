'use strict';

var _concat = require('./_concat');
var _curry2 = require('./_curry2');
var _xfBase = require('./_xfBase');

function XAperture(n, xf) {
    this.xf = xf;
    this.pos = 0;
    this.full = false;
    this.acc = new Array(n);
}
XAperture.prototype['@@transducer/init'] = _xfBase.init;
XAperture.prototype['@@transducer/result'] = function (result) {
    this.acc = null;
    return this.xf['@@transducer/result'](result);
};
XAperture.prototype['@@transducer/step'] = function (result, input) {
    this.store(input);
    return this.full ? this.xf['@@transducer/step'](result, this.getCopy()) : result;
};
XAperture.prototype.store = function (input) {
    this.acc[this.pos] = input;
    this.pos += 1;
    if (this.pos === this.acc.length) {
        this.pos = 0;
        this.full = true;
    }
};
XAperture.prototype.getCopy = function () {
    return _concat(
        Array.prototype.slice.call(this.acc, this.pos),
        Array.prototype.slice.call(this.acc, 0, this.pos)
    );
};

var _xaperture = _curry2(function _xaperture(n, xf) { return new XAperture(n, xf); });
module.exports = _xaperture;
