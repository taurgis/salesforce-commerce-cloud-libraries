'use strict';

var initOptions = require('./lib/initOptions');
var integer = require('./integer');
var natural = require('./natural');
var month = require('./month');
var year = require('./year');
var hour = require('./hour');
var minute = require('./minute');
var second = require('./second');
var millisecond = require('./millisecond');
var months = require('./lib/months');

/**
 * Return a random date value.
 *
 * @param {Object} options - Possible options for date
 * @returns {date} - A random date value
 *
 * @example
 *      date({string: true}); // => "5/27/2078"
 */
module.exports = function (options) {
    var dateString;
    var dateObject;
    var dateOptions;
    // If interval is specified we ignore preset
    if (options && (options.min || options.max)) {
        dateOptions = initOptions(options, {
            american: true,
            string: false
        });
        var min = typeof dateOptions.min !== 'undefined' ? dateOptions.min.getTime() : 1;
        // 100,000,000 days measured relative to midnight at the beginning of 01 January, 1970 UTC. http://es5.github.io/#x15.9.1.1
        var max = typeof dateOptions.max !== 'undefined' ? dateOptions.max.getTime() : 8640000000000000;

        dateObject = new Date(integer({ min: min, max: max }));
    } else {
        var m = month({ raw: true });
        var daysInMonth = m.days;

        if (options && options.month) {
            // Mod 12 to allow months outside range of 0-11 (not encouraged, but also not prevented).
            daysInMonth = months[((options.month % 12) + 12) % 12].days;
        }

        dateOptions = initOptions(options, {
            year: parseInt(year(), 10),
            // Necessary to subtract 1 because Date() 0-indexes month but not day or year
            // for some reason.
            month: m.numeric - 1,
            day: natural({ min: 1, max: daysInMonth }),
            hour: hour({ twentyfour: true }),
            minute: minute(),
            second: second(),
            millisecond: millisecond(),
            american: true,
            string: false
        });

        dateObject = new Date(dateOptions.year, dateOptions.month, dateOptions.day, dateOptions.hour, dateOptions.minute, dateOptions.second, dateOptions.millisecond);
    }

    if (options.american) {
        // Adding 1 to the month is necessary because Date() 0-indexes
        // months but not day for some odd reason.
        dateString = (dateObject.getMonth() + 1) + '/' + dateObject.getDate() + '/' + dateObject.getFullYear();
    } else {
        dateString = dateObject.getDate() + '/' + (dateObject.getMonth() + 1) + '/' + dateObject.getFullYear();
    }

    return options.string ? dateString : dateObject;
};
