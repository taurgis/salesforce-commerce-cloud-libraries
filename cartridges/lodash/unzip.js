'use strict';

var filter = require('./filter');
var map = require('./map');
var baseProperty = require('./internal/baseProperty');
var isArrayLikeObject = require('./isArrayLikeObject');

/**
 * This method is like `zip` except that it accepts an array of grouped
 * elements and creates an array regrouping the elements to their pre-zip
 * configuration.
 *
 * @static
 * @since 1.2.0
 * @category Array
 * @param {Array} array The array of grouped elements to process.
 * @returns {Array} Returns the new array of regrouped elements.
 * @see unzipWith, zip, zipObject, zipObjectDeep, zipWith
 * @example
 *
 * const zipped = zip(['a', 'b'], [1, 2], [true, false]) => [['a', 1, true], ['b', 2, false]]
 *
 * unzip(zipped) => [['a', 'b'], [1, 2], [true, false]]
 */
function unzip(array) {
    if (!(array != null && array.length)) {
        return [];
    }
    let length = 0;
    array = filter(array, function (group) {
        if (isArrayLikeObject(group)) {
            length = Math.max(group.length, length);
            return true;
        }

        return false;
    });
    let index = -1;
    var result = new Array(length);
    while (++index < length) {
        result[index] = map(array, baseProperty(index));
    }
    return result;
}

module.exports = unzip;
