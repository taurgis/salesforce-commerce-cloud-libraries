'use strict';

var initOptions = require('./lib/initOptions');
var age = require('./age');
var date = require('./date');

/**
 * Return a random birthday value.
 *
 * @param {Object} options - Possible options for birthday
 * @returns {date} - A random birthday value
 *
 * @example
 *      birthday({ type: 'child' }); // => Sat Sep 08 2001 00:00:00 GMT-0400 (EDT)
 */
module.exports = function (options) {
    var generatedAge = age(options);
    var currentYear = new Date().getFullYear();
    var birthdayOptions;
    if (options && options.type) {
        var min = new Date();
        var max = new Date();
        min.setFullYear(currentYear - generatedAge - 1);
        max.setFullYear(currentYear - generatedAge);

        birthdayOptions = initOptions(options, {
            min: min,
            max: max
        });
    } else {
        birthdayOptions = initOptions(options, {
            year: currentYear - generatedAge
        });
    }

    return date(birthdayOptions);
};
