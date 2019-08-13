'use strict';

var startOfQuarter = require('./startOfQuarter');

/**
 * @name isSameQuarter
 * @category Quarter Helpers
 * @summary Are the given dates in the same year quarter?
 *
 * @description
 * Are the given dates in the same year quarter?
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 *  @param {Date|number} dirtyDateLeft - the first date to check
 * @param {Date|number} dirtyDateRight - the second date to check
 * @returns {boolean} the dates are in the same quarter
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Are 1 January 2014 and 8 March 2014 in the same quarter?
 * var result = isSameQuarter(new Date(2014, 0, 1), new Date(2014, 2, 8))
 * //=> true
 */
module.exports = function isSameQuarter(dirtyDateLeft, dirtyDateRight) {
    if (arguments.length < 2) {
        throw new TypeError(
            '2 arguments required, but only ' + arguments.length + ' present'
        );
    }

    var dateLeftStartOfQuarter = startOfQuarter(dirtyDateLeft);
    var dateRightStartOfQuarter = startOfQuarter(dirtyDateRight);

    return dateLeftStartOfQuarter.getTime() === dateRightStartOfQuarter.getTime();
};
