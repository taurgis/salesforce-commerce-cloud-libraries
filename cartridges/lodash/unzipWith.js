'use strict';

var apply = require('./internal/apply');
var arrayMap = require('./internal/arrayMap');
var unzip = require('./unzip');

/**
 * This method is like `unzip` except that it accepts `iteratee` to specify
 * how regrouped values should be combined. The iteratee is invoked with the
 * elements of each group: (...group).
 *
 * @static
 * @since 3.8.0
 * @category Array
 * @param {Array} array The array of grouped elements to process.
 * @param {Function} [iteratee=identity] The function to combine
 *  regrouped values.
 * @returns {Array} Returns the new array of regrouped elements.
 * @example
 *
 * var zipped = zip([1, 2], [10, 20], [100, 200]); => [[1, 10, 100], [2, 20, 200]]
 *
 * unzipWith(zipped, add); => [3, 30, 300]
 */
function unzipWith(array, iteratee) {
    if (!(array && array.length)) {
        return [];
    }
    var result = unzip(array);
    if (iteratee == null) {
        return result;
    }
    return arrayMap(result, function (group) {
        return apply(iteratee, undefined, group);
    });
}

module.exports = unzipWith;
