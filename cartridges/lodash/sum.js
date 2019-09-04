'use strict';

var baseSum = require('./internal/baseSum');

/**
 * Computes the sum of the values in `array`.
 *
 * @since 3.4.0
 * @category Math
 * @param {Array} array The array to iterate over.
 * @returns {number} Returns the sum.
 * @example
 *
 * sum([4, 2, 8, 6]) => 20
 */
function sum(array) {
    return (array != null && array.length)
        ? baseSum(array, function (value) { return value; })
        : 0;
}

module.exports = sum;
