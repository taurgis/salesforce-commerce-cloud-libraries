'use strict';

/**
 * The base implementation of `sum` and `sumBy`.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {number} Returns the sum.
 */
function baseSum(array, iteratee) {
    let result;

    for (var key in array) {
        var value = array[key];
        var current = iteratee(value);
        if (current !== undefined) {
            result = result === undefined ? current : (result + current);
        }
    }
    return result;
}

module.exports = baseSum;
