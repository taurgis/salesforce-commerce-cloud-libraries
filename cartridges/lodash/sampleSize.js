'use strict';

var arraySampleSize = require('./internal/arraySampleSize');
var baseSampleSize = require('./internal/baseSampleSize');
var isArray = require('./isArray');
var isIterateeCall = require('./internal/isIterateeCall');
var toInteger = require('./toInteger');

/**
 * Gets `n` random elements at unique keys from `collection` up to the
 * size of `collection`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Collection
 * @param {Array|Object} collection The collection to sample.
 * @param {number} [n=1] The number of elements to sample.
 * @param {Object} [guard] Enables use as an iteratee for methods like `map`.
 * @returns {Array} Returns the random elements.
 * @example
 *
 * sampleSize([1, 2, 3], 2);
 * // => [3, 1]
 *
 * sampleSize([1, 2, 3], 4);
 * // => [2, 3, 1]
 */
function sampleSize(collection, n, guard) {
    if ((guard ? isIterateeCall(collection, n, guard) : n === undefined)) {
        n = 1;
    } else {
        n = toInteger(n);
    }

    var func = isArray(collection) ? arraySampleSize : baseSampleSize;
    return func(collection, n);
}

module.exports = sampleSize;
