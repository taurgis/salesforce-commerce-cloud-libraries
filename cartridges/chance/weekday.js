'use strict';

var initOptions = require('./lib/initOptions');
var pickOne = require('./lib/pickOne');

/**
 * Return a random weekday value.
 *
 * @param {Object} options - Possible options for weekday
 * @returns {string} - A random weekday value
 *
 * @example
 *      weekday(); => 'Tuesday'
 */
module.exports = function (options) {
    var weekdayOptions = initOptions(options, { weekday_only: false });
    var weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    if (!weekdayOptions.weekday_only) {
        weekdays.push('Saturday');
        weekdays.push('Sunday');
    }
    return pickOne(weekdays);
};
