'use strict';

var MAX_INT = Number(9007199254740992);
var MIN_INT = -MAX_INT;

var testRange = require('./lib/testRange');
var random = require('./lib/random');
var initOptions = require('./lib/initOptions');

/**
 * Return a random integer value.
 *
 * @param {Object} options - Possible options for integer
 * @returns {integer} - A random integer value
 *
 * @example
 *      integer({ min: -20, max: 20 }); // => 10
 */
module.exports = function (options) {
    // 9007199254740992 (2^53) is the max integer number in JavaScript
    // See: http://vq.io/132sa2j
    var integerOtions = initOptions(options, { min: MIN_INT, max: MAX_INT });
    testRange(integerOtions.min > integerOtions.max, 'Chance: Min cannot be greater than Max.');

    return Math.floor(random() * (integerOtions.max - integerOtions.min + 1) + integerOtions.min);
};
