'use strict';

var initOptions = require('./lib/initOptions');
var natural = require('./natural');
var testRange = require('./lib/testRange');

/**
 * Return a random hour value.
 *
 * @param {Object} options - Possible options for hour
 * @returns {integer} - A random hour value
 *
 * @example
 *      hour({twentyfour: true}); // => 21
 */
module.exports = function (options) {
    var hourOptions = initOptions(options, {
        min: options && options.twentyfour ? 0 : 1,
        max: options && options.twentyfour ? 23 : 12
    });

    testRange(hourOptions.min < 0, 'Chance: Min cannot be less than 0.');
    testRange(hourOptions.twentyfour && hourOptions.max > 23, 'Chance: Max cannot be greater than 23 for twentyfour option.');
    testRange(!hourOptions.twentyfour && hourOptions.max > 12, 'Chance: Max cannot be greater than 12.');
    testRange(hourOptions.min > hourOptions.max, 'Chance: Min cannot be greater than Max.');

    return natural({ min: hourOptions.min, max: hourOptions.max });
};
