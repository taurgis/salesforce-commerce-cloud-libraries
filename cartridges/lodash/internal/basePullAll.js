'use strict';

var map = require('../map');
var baseIndexOf = require('./baseIndexOf');
var baseIndexOfWith = require('./baseIndexOfWith');
var copyArray = require('./copyArray');

/**
 * The base implementation of `pullAllBy`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to remove.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns `array`.
 */
function basePullAll(array, values, iteratee, comparator) {
    var indexOf = comparator ? baseIndexOfWith : baseIndexOf;
    var length = values.length;

    let index = -1;
    let seen = array;

    if (array === values) {
        values = copyArray(values);
    }
    if (iteratee) {
        seen = map(array, function (value) { return iteratee(value); });
    }
    while (++index < length) {
        let fromIndex = 0;
        var value = values[index];
        var computed = iteratee ? iteratee(value) : value;

        while ((fromIndex = indexOf(seen, computed, fromIndex, comparator)) > -1) {
            if (seen !== array) {
                seen.splice(fromIndex, 1);
            }
            array.splice(fromIndex, 1);
        }
    }
    return array;
}

module.exports = basePullAll;
