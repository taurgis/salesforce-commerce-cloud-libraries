'use strict';

var _curry2 = require('./_curry2');
var _xfBase = require('./_xfBase');

function XFilter(f, xf) {
    this.xf = xf;
    this.f = f;
}
XFilter.prototype['@@transducer/init'] = _xfBase.init;
XFilter.prototype['@@transducer/result'] = _xfBase.result;
XFilter.prototype['@@transducer/step'] = function (result, input) {
    return this.f(input) ? this.xf['@@transducer/step'](result, input) : result;
};

var _xfilter = _curry2(function _xfilter(f, xf) { return new XFilter(f, xf); });
module.exports = _xfilter;
