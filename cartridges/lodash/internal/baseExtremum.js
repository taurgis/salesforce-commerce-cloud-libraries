'use strict';

var isSymbol = require('../isSymbol');

/**
 * The base implementation of methods like `_.max` and `_.min` which accepts a
 * `comparator` to determine the extremum value.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The iteratee invoked per iteration.
 * @param {Function} comparator The comparator used to compare values.
 * @returns {*} Returns the extremum value.
 */
function baseExtremum(array, iteratee, comparator) {
    var index = -1;
    var length = array.length;

    while (++index < length) {
        var value = array[index];
        var current = iteratee(value);

        if (current != null && (computed === undefined // eslint-disable-line
            ? (current === current && !isSymbol(current))
            : comparator(current, computed) // eslint-disable-line
        )) {
            var computed = current;
            var result = value;
        }
    }
    return result; // eslint-disable-line
}

module.exports = baseExtremum;
