'use strict';

var getDate = require('./getDate');
var getDay = require('./getDay');
var startOfMonth = require('./startOfMonth');
var toInteger = require('./_lib/toInteger/index');

/**
 * @name getWeekOfMonth
 * @category Week Helpers
 * @summary Get the week of the month of the given date.
 *
 * @description
 * Get the week of the month of the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|number} date - the given date
 * @param {Object} [dirtyOptions] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {number} the week of month
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 *
 * @example
 * // Which week of the month is 9 November 2017?
 * var result = getWeekOfMonth(new Date(2017, 10, 9))
 * //=> 2
 */
module.exports = function getWeekOfMonth(date, dirtyOptions) {
    if (arguments.length < 1) {
        throw new TypeError(
            '1 argument required, but only ' + arguments.length + ' present'
        );
    }

    var options = dirtyOptions || {};
    var locale = options.locale;
    var localeWeekStartsOn = locale && locale.options && locale.options.weekStartsOn;
    var defaultWeekStartsOn = localeWeekStartsOn == null ? 0 : toInteger(localeWeekStartsOn);
    var weekStartsOn = options.weekStartsOn == null
        ? defaultWeekStartsOn
        : toInteger(options.weekStartsOn);

    // Test if weekStartsOn is between 0 and 6 _and_ is not NaN
    if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
        throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
    }

    var startWeekDay = getDay(startOfMonth(date));
    var currentWeekDay = getDay(date);

    var startWeekDayWithOptions = startWeekDay < weekStartsOn ? 7 - weekStartsOn : startWeekDay;
    var diff = startWeekDayWithOptions > currentWeekDay ? 7 - weekStartsOn : 0;

    return Math.ceil((getDate(date) + diff) / 7);
};
