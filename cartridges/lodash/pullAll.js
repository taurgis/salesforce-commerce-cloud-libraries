'use strict';

var basePullAll = require('./internal/basePullAll.js');

/**
 * This method is like `pull` except that it accepts an array of values to remove.
 *
 * **Note:** Unlike `difference`, this method mutates `array`.
 *
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to modify.
 * @param {Array} values The values to remove.
 * @returns {Array} Returns `array`.
 * @see pull, pullAllBy, pullAllWith, pullAt, remove, reject
 * @example
 *
 * const array = ['a', 'b', 'c', 'a', 'b', 'c']
 *
 * pullAll(['a', 'b', 'c', 'a', 'b', 'c'], ['a', 'c'])
 * console.log(array) => ['b', 'b']
 */
function pullAll(array, values) {
    return (array != null && array.length && values != null && values.length)
        ? basePullAll(array, values)
        : array;
}

module.exports = pullAll;
