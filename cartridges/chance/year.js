'use strict';

var initOptions = require('./lib/initOptions');
var natural = require('./natural');

/**
 * Return a random year value.
 *
 * @param {Object} options - Possible options for year
 * @returns {integer} - A random year value
 *
 * @example
 *      year({min: 1900, max: 2100}); // => 2042
 */
module.exports = function (options) {
    // Default to current year as min if none specified
    var yearOptions = initOptions(options, { min: new Date().getFullYear() });

    // Default to one century after current year as max if none specified
    yearOptions.max = (typeof yearOptions.max !== 'undefined') ? yearOptions.max : yearOptions.min + 100;

    return natural(yearOptions).toString();
};
