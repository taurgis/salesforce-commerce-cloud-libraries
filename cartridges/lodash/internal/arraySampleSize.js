'use strict';

var baseClamp = require('./baseClamp');
var copyArray = require('./copyArray');
var shuffleSelf = require('./shuffleSelf');

/**
 * A specialized version of `_.sampleSize` for arrays.
 *
 * @private
 * @param {Array} array The array to sample.
 * @param {number} n The number of elements to sample.
 * @returns {Array} Returns the random elements.
 */
function arraySampleSize(array, n) {
    return shuffleSelf(copyArray(array), baseClamp(n, 0, array.length));
}

module.exports = arraySampleSize;
