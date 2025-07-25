'use strict';

var getTimezoneOffsetInMilliseconds = require('./_lib/getTimezoneOffsetInMilliseconds/index');
var compareAsc = require('./compareAsc');
var toDate = require('./toDate');
var differenceInSeconds = require('./differenceInSeconds');
var cloneObject = require('./_lib/cloneObject/index');
var defaultLocale = require('./locale/en-US/index');

var MINUTES_IN_DAY = 1440;
var MINUTES_IN_MONTH = 43200;
var MINUTES_IN_YEAR = 525600;

/**
 * @name formatDistanceStrict
 * @category Common Helpers
 * @summary Return the distance between the given dates in words.
 *
 * @description
 * Return the distance between the given dates in words, using strict units.
 * This is like `formatDistance`, but does not use helpers like 'almost', 'over',
 * 'less than' and the like.
 *
 * | Distance between dates | Result              |
 * |------------------------|---------------------|
 * | 0 ... 59 secs          | [0..59] seconds     |
 * | 1 ... 59 mins          | [1..59] minutes     |
 * | 1 ... 23 hrs           | [1..23] hours       |
 * | 1 ... 29 days          | [1..29] days        |
 * | 1 ... 11 months        | [1..11] months      |
 * | 1 ... N years          | [1..N]  years       |
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * - The function was renamed from `distanceInWordsStrict` to `formatDistanceStrict`
 *   to make its name consistent with `format` and `formatRelative`.
 *
 * - The order of arguments is swapped to make the function
 *   consistent with `differenceIn...` functions.
 *
 *   ```javascript
 *   // Before v2.0.0
 *
 *   distanceInWordsStrict(
 *     new Date(2015, 0, 2),
 *     new Date(2014, 6, 2)
 *   ) //=> '6 months'
 *
 *   // v2.0.0 onward
 *
 *   formatDistanceStrict(
 *     new Date(2014, 6, 2),
 *     new Date(2015, 0, 2)
 *   ) //=> '6 months'
 *   ```
 *
 * - `partialMethod` option is renamed to `roundingMethod`.
 *
 *   ```javascript
 *   // Before v2.0.0
 *
 *   distanceInWordsStrict(
 *     new Date(1986, 3, 4, 10, 32, 0),
 *     new Date(1986, 3, 4, 10, 33, 1),
 *     { partialMethod: 'ceil' }
 *   ) //=> '2 minutes'
 *
 *   // v2.0.0 onward
 *
 *   formatDistanceStrict(
 *     new Date(1986, 3, 4, 10, 33, 1),
 *     new Date(1986, 3, 4, 10, 32, 0),
 *     { roundingMethod: 'ceil' }
 *   ) //=> '2 minutes'
 *   ```
 *
 * - If `roundingMethod` is not specified, it now defaults to `round` instead of `floor`.
 *
 * - `unit` option now accepts one of the strings:
 *   'second', 'minute', 'hour', 'day', 'month' or 'year' instead of 's', 'm', 'h', 'd', 'M' or 'Y'
 *
 *   ```javascript
 *   // Before v2.0.0
 *
 *   distanceInWordsStrict(
 *     new Date(1986, 3, 4, 10, 32, 0),
 *     new Date(1986, 3, 4, 10, 33, 1),
 *     { unit: 'm' }
 *   )
 *
 *   // v2.0.0 onward
 *
 *   formatDistanceStrict(
 *     new Date(1986, 3, 4, 10, 33, 1),
 *     new Date(1986, 3, 4, 10, 32, 0),
 *     { unit: 'minute' }
 *   )
 *   ```
 *
 * @param {Date|number} dirtyDate - the date
 * @param {Date|number} dirtyBaseDate - the date to compare with
 * @param {Object} [dirtyOptions] - an object with options.
 * @param {boolean} [options.addSuffix=false] - result indicates if the second date is earlier or later than the first
 * @param {'second'|'minute'|'hour'|'day'|'month'|'year'} [options.unit] - if specified, will force a unit
 * @param {'floor'|'ceil'|'round'} [options.roundingMethod='round'] - which way to round partial units
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @returns {string} the distance in words
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `options.roundingMethod` must be 'floor', 'ceil' or 'round'
 * @throws {RangeError} `options.unit` must be 'second', 'minute', 'hour', 'day', 'month' or 'year'
 * @throws {RangeError} `options.locale` must contain `formatDistance` property
 *
 * @example
 * // What is the distance between 2 July 2014 and 1 January 2015?
 * var result = formatDistanceStrict(new Date(2014, 6, 2), new Date(2015, 0, 2))
 * //=> '6 months'
 *
 * @example
 * // What is the distance between 1 January 2015 00:00:15
 * // and 1 January 2015 00:00:00?
 * var result = formatDistanceStrict(
 *   new Date(2015, 0, 1, 0, 0, 15),
 *   new Date(2015, 0, 1, 0, 0, 0)
 * )
 * //=> '15 seconds'
 *
 * @example
 * // What is the distance from 1 January 2016
 * // to 1 January 2015, with a suffix?
 * var result = formatDistanceStrict(new Date(2015, 0, 1), new Date(2016, 0, 1), {
 *   addSuffix: true
 * })
 * //=> '1 year ago'
 *
 * @example
 * // What is the distance from 1 January 2016
 * // to 1 January 2015, in minutes?
 * var result = formatDistanceStrict(new Date(2016, 0, 1), new Date(2015, 0, 1), {
 *   unit: 'minute'
 * })
 * //=> '525600 minutes'
 *
 * @example
 * // What is the distance from 1 January 2015
 * // to 28 January 2015, in months, rounded up?
 * var result = formatDistanceStrict(new Date(2015, 0, 28), new Date(2015, 0, 1), {
 *   unit: 'month',
 *   roundingMethod: 'ceil'
 * })
 * //=> '1 month'
 *
 * @example
 * // What is the distance between 1 August 2016 and 1 January 2015 in Esperanto?
 * import { eoLocale } from 'date-fns/locale/eo'
 * var result = formatDistanceStrict(new Date(2016, 7, 1), new Date(2015, 0, 1), {
 *   locale: eoLocale
 * })
 * //=> '1 jaro'
 */
module.exports = function formatDistanceStrict(
    dirtyDate,
    dirtyBaseDate,
    dirtyOptions
) {
    if (arguments.length < 2) {
        throw new TypeError(
            '2 arguments required, but only ' + arguments.length + ' present'
        );
    }

    var options = dirtyOptions || {};
    var locale = options.locale || defaultLocale;

    if (!locale.formatDistance) {
        throw new RangeError('locale must contain localize.formatDistance property');
    }

    var comparison = compareAsc(dirtyDate, dirtyBaseDate);

    if (isNaN(comparison)) {
        throw new RangeError('Invalid time value');
    }

    var localizeOptions = cloneObject(options);
    localizeOptions.addSuffix = Boolean(options.addSuffix);
    localizeOptions.comparison = comparison;

    var dateLeft;
    var dateRight;
    if (comparison > 0) {
        dateLeft = toDate(dirtyBaseDate);
        dateRight = toDate(dirtyDate);
    } else {
        dateLeft = toDate(dirtyDate);
        dateRight = toDate(dirtyBaseDate);
    }

    var roundingMethod = options.roundingMethod == null ? 'round' : String(options.roundingMethod);
    var roundingMethodFn;

    if (roundingMethod === 'floor') {
        roundingMethodFn = Math.floor;
    } else if (roundingMethod === 'ceil') {
        roundingMethodFn = Math.ceil;
    } else if (roundingMethod === 'round') {
        roundingMethodFn = Math.round;
    } else {
        throw new RangeError("roundingMethod must be 'floor', 'ceil' or 'round'");
    }

    var seconds = differenceInSeconds(dateRight, dateLeft);
    var offsetInSeconds = (getTimezoneOffsetInMilliseconds(dateRight)
      - getTimezoneOffsetInMilliseconds(dateLeft))
    / 1000;
    var minutes = roundingMethodFn((seconds - offsetInSeconds) / 60);

    var unit;
    if (options.unit == null) {
        if (minutes < 1) {
            unit = 'second';
        } else if (minutes < 60) {
            unit = 'minute';
        } else if (minutes < MINUTES_IN_DAY) {
            unit = 'hour';
        } else if (minutes < MINUTES_IN_MONTH) {
            unit = 'day';
        } else if (minutes < MINUTES_IN_YEAR) {
            unit = 'month';
        } else {
            unit = 'year';
        }
    } else {
        unit = String(options.unit);
    }

    // 0 up to 60 seconds
    if (unit === 'second') {
        return locale.formatDistance('xSeconds', seconds, localizeOptions);

    // 1 up to 60 mins
    } if (unit === 'minute') {
        return locale.formatDistance('xMinutes', minutes, localizeOptions);

    // 1 up to 24 hours
    } if (unit === 'hour') {
        var hours = roundingMethodFn(minutes / 60);
        return locale.formatDistance('xHours', hours, localizeOptions);

    // 1 up to 30 days
    } if (unit === 'day') {
        var days = roundingMethodFn(minutes / MINUTES_IN_DAY);
        return locale.formatDistance('xDays', days, localizeOptions);

    // 1 up to 12 months
    } if (unit === 'month') {
        var months = roundingMethodFn(minutes / MINUTES_IN_MONTH);
        return locale.formatDistance('xMonths', months, localizeOptions);

    // 1 year up to max Date
    } if (unit === 'year') {
        var years = roundingMethodFn(minutes / MINUTES_IN_YEAR);
        return locale.formatDistance('xYears', years, localizeOptions);
    }

    throw new RangeError(
        "unit must be 'second', 'minute', 'hour', 'day', 'month' or 'year'"
    );
};
