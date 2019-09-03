'use strict';

/**
 * Gets all but the first element of `array`.
 *
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to query.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * tail([1, 2, 3]) => [2, 3]
 */
function tail(array) {
    const length = array == null ? 0 : array.length;
    if (!length) {
        return [];
    }

    return Array.prototype.slice.call(array, 1);
}

module.exports = tail;
