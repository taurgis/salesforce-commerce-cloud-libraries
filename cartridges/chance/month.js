'use strict';

var testRange = require('./lib/testRange');
var initOptions = require('./lib/initOptions');
var pick = require('./lib/pickOne');
var months = require('./lib/months');

/**
 * Return a random month value.
 *
 * @param {Object} options - Possible options for month
 * @returns {string} - A random month value
 *
 * @example
 *      month(); // => 'January'
 */
module.exports = function (options) {
    var monthOptions = initOptions(options, { min: 1, max: 12 });

    testRange(monthOptions.min < 1, 'Chance: Min cannot be less than 1.');
    testRange(monthOptions.max > 12, 'Chance: Max cannot be greater than 12.');
    testRange(monthOptions.min > monthOptions.max, 'Chance: Min cannot be greater than Max.');

    var generatedMonth = pick(months.slice(monthOptions.min - 1, monthOptions.max));
    return monthOptions.raw ? generatedMonth : generatedMonth.name;
};
