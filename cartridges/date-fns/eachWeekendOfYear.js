'use strict';

var eachWeekendOfInterval = require('./eachWeekendOfInterval');
var startOfYear = require('./startOfYear');
var endOfYear = require('./endOfYear');

/**
 * @name eachWeekendOfYear
 * @category Year Helpers
 * @summary List all the Saturdays and Sundays in the year.
 *
 * @description
 * Get all the Saturdays and Sundays in the year.
 *
 * @param {Date|number} dirtyDate - the given year
 * @returns {Date[]} an array containing all the Saturdays and Sundays
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} The passed date is invalid
 *
 * @example
 * // Lists all Saturdays and Sundays in the year
 * var result = eachWeekendOfYear(new Date(2020, 1, 1))
 * //=> [
 * //   Sat Jan 03 2020 00:00:00,
 * //   Sun Jan 04 2020 00:00:00,
 * //   ...
 * //   Sun Dec 27 2020 00:00:00
 * // ]
 * ]
 */
module.exports = function eachWeekendOfYear(dirtyDate) {
    if (arguments.length < 1) {
        throw new TypeError(
            '1 arguments required, but only ' + arguments.length + ' present'
        );
    }

    var startDate = startOfYear(dirtyDate);
    if (isNaN(startDate)) throw new RangeError('The passed date is invalid');

    var endDate = endOfYear(dirtyDate);
    return eachWeekendOfInterval({ start: startDate, end: endDate });
};
