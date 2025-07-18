'use strict';

var _has = require('./_has');

var toString = Object.prototype.toString;
var _isArguments = (function () {
    return toString.call(arguments) === '[object Arguments]'
        ? function _isArguments(x) { return toString.call(x) === '[object Arguments]'; }
        : function _isArguments(x) { return _has('callee', x); };
}());

module.exports = _isArguments;
