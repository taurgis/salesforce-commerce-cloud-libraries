var toDate = require('./toDate');

/**
 * @name differenceInCalendarMonths
 * @category Month Helpers
 * @summary Get the number of calendar months between the given dates.
 *
 * @description
 * Get the number of calendar months between the given dates.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|number} dirtyDateLeft - the later date
 * @param {Date|number} dirtyDateRight - the earlier date
 * @returns {number} the number of calendar months
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many calendar months are between 31 January 2014 and 1 September 2014?
 * var result = differenceInCalendarMonths(
 *   new Date(2014, 8, 1),
 *   new Date(2014, 0, 31)
 * )
 * //=> 8
 */
module.exports = function differenceInCalendarMonths(
    dirtyDateLeft,
    dirtyDateRight
) {
    if (arguments.length < 2) {
        throw new TypeError(
            '2 arguments required, but only ' + arguments.length + ' present'
        );
    }

    var dateLeft = toDate(dirtyDateLeft);
    var dateRight = toDate(dirtyDateRight);

    var yearDiff = dateLeft.getFullYear() - dateRight.getFullYear();
    var monthDiff = dateLeft.getMonth() - dateRight.getMonth();

    return yearDiff * 12 + monthDiff;
};
