'use strict';

var _curry2 = require('./_curry2');
var _xfBase = require('./_xfBase');

function XMap(f, xf) {
    this.xf = xf;
    this.f = f;
}
XMap.prototype['@@transducer/init'] = _xfBase.init;
XMap.prototype['@@transducer/result'] = _xfBase.result;
XMap.prototype['@@transducer/step'] = function (result, input) {
    return this.xf['@@transducer/step'](result, this.f(input));
};

var _xmap = _curry2(function _xmap(f, xf) { return new XMap(f, xf); });
module.exports = _xmap;
