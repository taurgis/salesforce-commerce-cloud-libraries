'use strict';

var differenceInMilliseconds = require('./differenceInMilliseconds');

var MILLISECONDS_IN_MINUTE = 60000;

/**
 * @name differenceInMinutes
 * @category Minute Helpers
 * @summary Get the number of minutes between the given dates.
 *
 * @description
 * Get the number of minutes between the given dates.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|number} dirtyDateLeft - the later date
 * @param {Date|number} dirtyDateRight - the earlier date
 * @returns {number} the number of minutes
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many minutes are between 2 July 2014 12:07:59 and 2 July 2014 12:20:00?
 * var result = differenceInMinutes(
 *   new Date(2014, 6, 2, 12, 20, 0),
 *   new Date(2014, 6, 2, 12, 7, 59)
 * )
 * //=> 12
 */
module.exports = function differenceInMinutes(dirtyDateLeft, dirtyDateRight) {
    if (arguments.length < 2) {
        throw new TypeError(
            '2 arguments required, but only ' + arguments.length + ' present'
        );
    }

    var diff = differenceInMilliseconds(dirtyDateLeft, dirtyDateRight)
    / MILLISECONDS_IN_MINUTE;
    return diff > 0 ? Math.floor(diff) : Math.ceil(diff);
};
