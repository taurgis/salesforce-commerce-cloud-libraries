'use strict';

var baseFindIndex = require('./.internal/baseFindIndex.js');
var baseIsNaN = require('./.internal/baseIsNaN.js');
var strictLastIndexOf = require('./.internal/strictLastIndexOf.js');

/**
 * This method is like `indexOf` except that it iterates over elements of
 * `array`= require(right to left.);
 *
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} [fromIndex=array.length-1] The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 * @example
 *
 * lastIndexOf([1, 2, 1, 2], 2)
 * // => 3
 *
 * // Search= require(the `fromIndex`.);
 * lastIndexOf([1, 2, 1, 2], 2, 2)
 * // => 1
 */
function lastIndexOf(array, value, fromIndex) {
    const length = array == null ? 0 : array.length;
    if (!length) {
        return -1;
    }
    let index = length;
    if (fromIndex !== undefined) {
        index = index < 0 ? Math.max(length + index, 0) : Math.min(index, length - 1);
    }
    return value === value
        ? strictLastIndexOf(array, value, index)
        : baseFindIndex(array, baseIsNaN, index, true);
}

module.exports = lastIndexOf;
