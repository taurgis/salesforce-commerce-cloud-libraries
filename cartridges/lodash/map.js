'use strict';

/**
 * Creates an array of values by running each element of `array` thru `iteratee`.
 * The iteratee is invoked with three arguments: (value, index, array).
 *
 * @since 5.0.0
 * @category Array
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 * @example
 *
 * function square(n) {
    *   return n * n
    * }
    *
    * map([4, 8], function square(n) { return n * n })
    * // => [16, 64]
    */
function map(array, iteratee) {
    let index = -1;
    var length = array == null ? 0 : array.length;
    var result = new Array(length);

    while (++index < length) {
        result[index] = iteratee(array[index], index, array);
    }
    return result;
}

module.exports = map;
