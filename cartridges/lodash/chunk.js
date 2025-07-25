'use strict';

var baseSlice = require('./internal/baseSlice');
var isIterateeCall = require('./internal/isIterateeCall');
var toInteger = require('./toInteger');

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeCeil = Math.ceil;
var nativeMax = Math.max;

/**
 * Creates an array of elements split into groups the length of `size`.
 * If `array` can't be split evenly, the final chunk will be the remaining
 * elements.
 *
 * @static
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to process.
 * @param {number} [size=1] The length of each chunk
 * @param {Object} [guard] Enables use as an iteratee for methods like `map`.
 * @returns {Array} Returns the new array of chunks.
 * @example
 *
 * chunk(['a', 'b', 'c', 'd'], 2); => [['a', 'b'], ['c', 'd']]
 *
 * chunk(['a', 'b', 'c', 'd'], 3); => [['a', 'b', 'c'], ['d']]
 */
function chunk(array, size, guard) {
    if ((guard ? isIterateeCall(array, size, guard) : size === undefined)) {
        size = 1;
    } else {
        size = nativeMax(toInteger(size), 0);
    }
    var length = array == null ? 0 : array.length;
    if (!length || size < 1) {
        return [];
    }
    var index = 0;
    var resIndex = 0;
    var result = Array(nativeCeil(length / size));

    while (index < length) {
        result[resIndex++] = baseSlice(array, index, (index += size));
    }
    return result;
}

module.exports = chunk;
