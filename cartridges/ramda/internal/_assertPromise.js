'use strict';

var _isFunction = require('./_isFunction');
var _toString = require('./_toString');

module.exports = function _assertPromise(name, p) {
    if (p == null || !_isFunction(p.then)) {
        throw new TypeError('`' + name + '` expected a Promise, received ' + _toString(p, []));
    }
};
