'use strict';

var initOptions = require('./lib/initOptions');
var monthGenerator = require('./month');

/**
 * Return a random expiry month value.
 *
 * @param {Object} options - Possible options for expiry month
 * @returns {string} - A random expiry month value
 *
 * @example
 *      exp_month(); => '01'
 */
module.exports = function (options) {
    var expOptions = initOptions(options);
    var month;
    var monthInt;
    // Date object months are 0 indexed
    var curMonth = new Date().getMonth() + 1;

    if (expOptions.future && (curMonth !== 12)) {
        do {
            month = monthGenerator({ raw: true }).numeric;
            monthInt = parseInt(month, 10);
        } while (monthInt <= curMonth);
    } else {
        month = monthGenerator({ raw: true }).numeric;
    }

    return month;
};
