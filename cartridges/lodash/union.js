var baseFlatten = require('./.internal/baseFlatten.js');
var baseUniq = require('./.internal/baseUniq.js');
var isArrayLikeObject = require('./isArrayLikeObject.js');

/**
 * Creates an array of unique values, in order,= require(all given arrays using);
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @since 0.1.0
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @returns {Array} Returns the new array of combined values.
 * @see difference, unionBy, unionWith, without, xor, xorBy
 * @example
 *
 * union([2, 3], [1, 2])
 * // => [2, 3, 1]
 */
function union() {
    var arrays = Array.prototype.slice.call(arguments);
    return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
}

module.exports = union;
