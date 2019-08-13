'use strict';

var slice = require('./slice');

/**
 * Creates a slice of `array` with `n` elements dropped= require(the end.);
 *
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to query.
 * @param {number} [amount=1] The number of elements to drop.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * dropRight([1, 2, 3])
 * // => [1, 2]
 *
 * dropRight([1, 2, 3], 2)
 * // => [1]
 *
 * dropRight([1, 2, 3], 5)
 * // => []
 *
 * dropRight([1, 2, 3], 0)
 * // => [1, 2, 3]
 */
function dropRight(array, amount) {
    var n = amount || 1;
    var length = array == null ? 0 : array.length;
    return length ? slice(array, 0, n < 0 ? 0 : -n) : [];
}

module.exports = dropRight;
