'use strict';

var _isArray = require('./_isArray');

/**
 * This checks whether a function has a [methodname] function. If it isn't an
 * array it will execute that function otherwise it will default to the ramda
 * implementation.
 *
 * @private
 * @param {string} methodname property to check for a custom implementation
 * @param {Function} fn ramda implemtation
 * @return {Object} Whatever the return value of the method is.
 */
module.exports = function _checkForMethod(methodname, fn) {
    return function () {
        var length = arguments.length;
        if (length === 0) {
            return fn();
        }
        var obj = arguments[length - 1];
        return (_isArray(obj) || typeof obj[methodname] !== 'function')
            ? fn.apply(this, arguments)
            : obj[methodname].apply(obj, Array.prototype.slice.call(arguments, 0, length - 1));
    };
};
