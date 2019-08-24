'use strict';

var slice = require('../slice');

/**
 * Casts `array` to a slice if it's needed.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {number} start The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the cast slice.
 */
function castSlice(array, start, end) {
    var { length } = array;
    end = end === undefined ? length : end;
    return (!start && end >= length) ? array : slice(array, start, end);
}

module.exports = castSlice;
