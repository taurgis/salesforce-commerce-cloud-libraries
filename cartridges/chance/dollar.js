'use strict';

var initOptions = require('./lib/initOptions');
var floating = require('./floating');

/**
 * Return a random dollar value.
 *
 * @param {Object} options - Possible options for dollar
 * @returns {string} - A random dollar value
 *
 * @example
 *      dollar({max: 20}); => "$15.23"
 */
module.exports = function (options) {
    // By default, a somewhat more sane max for dollar than all available numbers
    var dollarOptions = initOptions(options, { max: 10000, min: 0 });

    var dollar = floating({ min: dollarOptions.min, max: dollarOptions.max, fixed: 2 }).toString();
    var cents = dollar.split('.')[1];

    if (cents === undefined) {
        dollar += '.00';
    } else if (cents.length < 2) {
        dollar += '0';
    }

    if (dollar < 0) {
        return '-$' + dollar.replace('-', '');
    }
    return '$' + dollar;
};
