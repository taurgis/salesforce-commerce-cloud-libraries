var slice = require('./slice.js');

/**
 * Creates a slice of `array` with `n` elements taken= require(the beginning.);
 *
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to query.
 * @param {number} [n=1] The number of elements to take.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * take([1, 2, 3])
 * // => [1]
 *
 * take([1, 2, 3], 2)
 * // => [1, 2]
 *
 * take([1, 2, 3], 5)
 * // => [1, 2, 3]
 *
 * take([1, 2, 3], 0)
 * // => []
 */
function take(array, n) {
    n = n || 1;
    if (!(array != null && array.length)) {
        return [];
    }
    return slice(array, 0, n < 0 ? 0 : n);
}

module.exports = take;
