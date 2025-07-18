'use strict';

var baseSortedIndexBy = require('./baseSortedIndexBy');
var isSymbol = require('../isSymbol');

/** Used as references for the maximum length and index of an array. */
var MAX_ARRAY_LENGTH = 4294967295;
var HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;

/**
 * The base implementation of `sortedIndex` and `sortedLastIndex` which
 * performs a binary search of `array` to determine the index at which `value`
 * should be inserted into `array` in order to maintain its sort order.
 *
 * @private
 * @param {Array} array The sorted array to inspect.
 * @param {*} value The value to evaluate.
 * @param {boolean} [retHighest] Specify returning the highest qualified index.
 * @returns {number} Returns the index at which `value` should be inserted
 *  into `array`.
 */
function baseSortedIndex(array, value, retHighest) {
    let low = 0;
    let high = array == null ? low : array.length;

    if (typeof value == 'number' && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
        while (low < high) {
            var mid = (low + high) >>> 1;
            var computed = array[mid];
            if (computed !== null && !isSymbol(computed)
          && (retHighest ? (computed <= value) : (computed < value))) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        return high;
    }
    return baseSortedIndexBy(array, value, function (value) { return value; }, retHighest);
}

module.exports = baseSortedIndex;
