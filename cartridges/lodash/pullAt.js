'use strict';

var arrayMap = require('./internal/arrayMap');
var baseAt = require('./internal/baseAt');
var basePullAt = require('./internal/basePullAt');
var compareAscending = require('./internal/compareAscending');
var flatRest = require('./internal/flatRest');
var isIndex = require('./internal/isIndex');

/**
 * Removes elements from `array` corresponding to `indexes` and returns an
 * array of removed elements.
 *
 * **Note:** Unlike `at`, this method mutates `array`.
 *
 * @static
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to modify.
 * @param {...(number|number[])} [indexes] The indexes of elements to remove.
 * @returns {Array} Returns the new array of removed elements.
 * @example
 *
 * var array = ['a', 'b', 'c', 'd'];
 * var pulled = pullAt(array, [1, 3]);
 *
 * console.log(array); => ['a', 'c']
 *
 * console.log(pulled); => ['b', 'd']
 */
var pullAt = flatRest(function (array, indexes) {
    var length = array == null ? 0 : array.length;
    var result = baseAt(array, indexes);

    basePullAt(array, arrayMap(indexes, function (index) {
        return isIndex(index, length) ? +index : index;
    }).sort(compareAscending));

    return result;
});

module.exports = pullAt;
