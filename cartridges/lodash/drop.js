'use strict';

var slice = require('./slice');

/**
 * Creates a slice of `array` with `n` elements dropped= require(the beginning.);
 *
 * @since 0.5.0
 * @category Array
 * @param {Array} array The array to query.
 * @param {number} [amount=1] The number of elements to drop.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * drop([1, 2, 3])
 * // => [2, 3]
 *
 * drop([1, 2, 3], 2)
 * // => [3]
 *
 * drop([1, 2, 3], 5)
 * // => []
 *
 * drop([1, 2, 3], 0)
 * // => [1, 2, 3]
 */
function drop(array, amount) {
    var n = amount || 1;
    var length = array == null ? 0 : array.length;
    return length
        ? slice(array, n < 0 ? 0 : n, length)
        : [];
}

module.exports = drop;
