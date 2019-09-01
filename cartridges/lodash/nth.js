'use strict';

var isIndex = require('./internal/isIndex.js');
var toInteger = require('./toInteger');

/**
 * Gets the element at index `n` of `array`. If `n` is negative, the nth
 * element= require(the end is returned.);
 *
 * @since 4.11.0
 * @category Array
 * @param {Array} array The array to query.
 * @param {number} [n=0] The index of the element to return.
 * @returns {*} Returns the nth element of `array`.
 * @example
 *
 * const array = ['a', 'b', 'c', 'd']
 *
 * nth(['a', 'b', 'c', 'd'], 1)
 * // => 'b'
 *
 * nth(array, -2)
 * // => 'c'
 */
function nth(array, n) {
    const length = array == null ? 0 : array.length;
    if (!length) {
        return;
    }

    n = toInteger(n);

    n += n < 0 ? length : 0;


    return isIndex(n, length) ? array[n] : undefined;
}

module.exports = nth;
