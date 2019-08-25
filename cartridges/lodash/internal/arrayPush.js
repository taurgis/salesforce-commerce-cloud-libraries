'use strict';

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
    var index = -1;
    var length = values.length;
    var offset = array.length;

    while (++index < length) {
        array[offset + index] = values[index];
    }
    return array;
}

module.exports = arrayPush;
