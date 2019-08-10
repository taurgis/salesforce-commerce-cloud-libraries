var eachWeekendOfInterval = require('./eachWeekendOfInterval');
var startOfMonth = require('./startOfMonth');
var endOfMonth = require('./endOfMonth');

/**
 * @name eachWeekendOfMonth
 * @category Month Helpers
 * @summary List all the Saturdays and Sundays in the given month.
 *
 * @description
 * Get all the Saturdays and Sundays in the given month.
 *
 * @param {Date|number} dirtyDate - the given month
 * @returns {Date[]} an array containing all the Saturdays and Sundays
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} The passed date is invalid
 *
 * @example
 * // Lists all Saturdays and Sundays in the given month
 * var result = eachWeekendOfMonth(new Date(2022, 1, 1))
 * //=> [
 * //   Sat Feb 05 2022 00:00:00,
 * //   Sun Feb 06 2022 00:00:00,
 * //   Sat Feb 12 2022 00:00:00,
 * //   Sun Feb 13 2022 00:00:00,
 * //   Sat Feb 19 2022 00:00:00,
 * //   Sun Feb 20 2022 00:00:00,
 * //   Sat Feb 26 2022 00:00:00,
 * //   Sun Feb 27 2022 00:00:00
 * // ]
 */
module.exports = function eachWeekendOfMonth(dirtyDate) {
    if (arguments.length < 1) {
        throw new TypeError(
            '1 arguments required, but only ' + arguments.length + ' present'
        );
    }

    var startDate = startOfMonth(dirtyDate);
    if (isNaN(startDate)) throw new RangeError('The passed date is invalid');

    var endDate = endOfMonth(dirtyDate);
    return eachWeekendOfInterval({ start: startDate, end: endDate });
};
