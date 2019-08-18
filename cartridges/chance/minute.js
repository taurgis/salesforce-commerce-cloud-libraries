'use strict';

var initOptions = require('./lib/initOptions');
var natural = require('./natural');
var testRange = require('./lib/testRange');

/**
 * Return a random minute value.
 *
 * @param {Object} options - Possible options for minute
 * @returns {integer} - A random minute value
 *
 * @example
 *      minute(); // => 35
 */
module.exports = function (options) {
    var minuteOptions = initOptions(options, { min: 0, max: 59 });

    testRange(minuteOptions.min < 0, 'Chance: Min cannot be less than 0.');
    testRange(minuteOptions.max > 59, 'Chance: Max cannot be greater than 59.');
    testRange(minuteOptions.min > minuteOptions.max, 'Chance: Min cannot be greater than Max.');

    return natural({ min: minuteOptions.min, max: minuteOptions.max });
};
