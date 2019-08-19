'use strict';

var initOptions = require('./lib/initOptions');
var expYear = require('./exp_year');
var expMonth = require('./exp_month');

/**
 * Return a random expiry value.
 *
 * @param {Object} options - Possible options for expiry
 * @returns {string} - A random expiry value
 *
 * @example
 *      exp(); => '10/2020'
 */
module.exports = function (options) {
    var expOptions = initOptions(options);
    var exp = {};

    exp.year = expYear();

    // If the year is this year, need to ensure month is greater than the
    // current month or this expiration will not be valid
    if (exp.year === (new Date().getFullYear()).toString()) {
        exp.month = expMonth({ future: true });
    } else {
        exp.month = expMonth();
    }

    return expOptions.raw ? exp : exp.month + '/' + exp.year;
};
