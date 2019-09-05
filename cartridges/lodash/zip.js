'use strict';

var unzip = require('./unzip');

/**
 * Creates an array of grouped elements, the first of which contains the
 * first elements of the given arrays, the second of which contains the
 * second elements of the given arrays, and so on.
 *
 * @static
 * @since 0.1.0
 * @category Array
 * @param {...Array} [arrays] The arrays to process.
 * @returns {Array} Returns the new array of grouped elements.
 * @see unzip, unzipWith, zipObject, zipObjectDeep, zipWith
 * @example
 *
 * zip(['a', 'b'], [1, 2], [true, false]) => [['a', 1, true], ['b', 2, false]]
 */
function zip() {
    var arrays = Array.prototype.slice.call(arguments);
    return unzip(arrays);
}

module.exports = zip;
