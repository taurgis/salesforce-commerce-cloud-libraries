'use strict';

var _arity = require('./_arity');
var _isPlaceholder = require('./_isPlaceholder');

/**
 * Internal curryN function.
 *
 * @private
 * @category Function
 * @param {number} length The arity of the curried function.
 * @param {Array} received An array of arguments received thus far.
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */
module.exports = function _curryN(length, received, fn) {
    return function () {
        var combined = [];
        var argsIdx = 0;
        var left = length;
        var combinedIdx = 0;
        while (combinedIdx < received.length || argsIdx < arguments.length) {
            var result;
            if (combinedIdx < received.length
          && (!_isPlaceholder(received[combinedIdx])
           || argsIdx >= arguments.length)) {
                result = received[combinedIdx];
            } else {
                result = arguments[argsIdx];
                argsIdx += 1;
            }
            combined[combinedIdx] = result;
            if (!_isPlaceholder(result)) {
                left -= 1;
            }
            combinedIdx += 1;
        }
        return left <= 0
            ? fn.apply(this, combined)
            : _arity(left, _curryN(length, combined, fn));
    };
};
