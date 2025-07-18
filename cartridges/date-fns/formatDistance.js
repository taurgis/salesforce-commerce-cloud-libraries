'use strict';

var compareAsc = require('./compareAsc');
var differenceInMonths = require('./differenceInMonths');
var differenceInSeconds = require('./differenceInSeconds');
var defaultLocale = require('./locale/en-US/index');
var toDate = require('./toDate');
var cloneObject = require('./_lib/cloneObject/index');
var getTimezoneOffsetInMilliseconds = require('./_lib/getTimezoneOffsetInMilliseconds/index');

var MINUTES_IN_DAY = 1440;
var MINUTES_IN_ALMOST_TWO_DAYS = 2520;
var MINUTES_IN_MONTH = 43200;
var MINUTES_IN_TWO_MONTHS = 86400;

/**
 * @name formatDistance
 * @category Common Helpers
 * @summary Return the distance between the given dates in words.
 *
 * @description
 * Return the distance between the given dates in words.
 *
 * | Distance between dates                                            | Result              |
 * |-------------------------------------------------------------------|---------------------|
 * | 0 ... 30 secs                                                     | less than a minute  |
 * | 30 secs ... 1 min 30 secs                                         | 1 minute            |
 * | 1 min 30 secs ... 44 mins 30 secs                                 | [2..44] minutes     |
 * | 44 mins ... 30 secs ... 89 mins 30 secs                           | about 1 hour        |
 * | 89 mins 30 secs ... 23 hrs 59 mins 30 secs                        | about [2..24] hours |
 * | 23 hrs 59 mins 30 secs ... 41 hrs 59 mins 30 secs                 | 1 day               |
 * | 41 hrs 59 mins 30 secs ... 29 days 23 hrs 59 mins 30 secs         | [2..30] days        |
 * | 29 days 23 hrs 59 mins 30 secs ... 44 days 23 hrs 59 mins 30 secs | about 1 month       |
 * | 44 days 23 hrs 59 mins 30 secs ... 59 days 23 hrs 59 mins 30 secs | about 2 months      |
 * | 59 days 23 hrs 59 mins 30 secs ... 1 yr                           | [2..12] months      |
 * | 1 yr ... 1 yr 3 months                                            | about 1 year        |
 * | 1 yr 3 months ... 1 yr 9 month s                                  | over 1 year         |
 * | 1 yr 9 months ... 2 yrs                                           | almost 2 years      |
 * | N yrs ... N yrs 3 months                                          | about N years       |
 * | N yrs 3 months ... N yrs 9 months                                 | over N years        |
 * | N yrs 9 months ... N+1 yrs                                        | almost N+1 years    |
 *
 * With `options.includeSeconds == true`:
 * | Distance between dates | Result               |
 * |------------------------|----------------------|
 * | 0 secs ... 5 secs      | less than 5 seconds  |
 * | 5 secs ... 10 secs     | less than 10 seconds |
 * | 10 secs ... 20 secs    | less than 20 seconds |
 * | 20 secs ... 40 secs    | half a minute        |
 * | 40 secs ... 60 secs    | less than a minute   |
 * | 60 secs ... 90 secs    | 1 minute             |
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * - The function was renamed from `distanceInWords ` to `formatDistance`
 *   to make its name consistent with `format` and `formatRelative`.
 *
 * - The order of arguments is swapped to make the function
 *   consistent with `differenceIn...` functions.
 *
 *   ```javascript
 *   // Before v2.0.0
 *
 *   distanceInWords(
 *     new Date(1986, 3, 4, 10, 32, 0),
 *     new Date(1986, 3, 4, 11, 32, 0),
 *     { addSuffix: true }
 *   ) //=> 'in about 1 hour'
 *
 *   // v2.0.0 onward
 *
 *   formatDistance(
 *     new Date(1986, 3, 4, 11, 32, 0),
 *     new Date(1986, 3, 4, 10, 32, 0),
 *     { addSuffix: true }
 *   ) //=> 'in about 1 hour'
 *   ```
 *
 * @param {Date|number} dirtyDate - the date
 * @param {Date|number} dirtyBaseDate - the date to compare with
 * @param {Object} [dirtyOptions] - an object with options.
 * @param {boolean} [options.includeSeconds=false] - distances less than a minute are more detailed
 * @param {boolean} [options.addSuffix=false] - result indicates if the second date is earlier or later than the first
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @returns {string} the distance in words
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `options.locale` must contain `formatDistance` property
 *
 * @example
 * // What is the distance between 2 July 2014 and 1 January 2015?
 * var result = formatDistance(new Date(2014, 6, 2), new Date(2015, 0, 1))
 * //=> '6 months'
 *
 * @example
 * // What is the distance between 1 January 2015 00:00:15
 * // and 1 January 2015 00:00:00, including seconds?
 * var result = formatDistance(
 *   new Date(2015, 0, 1, 0, 0, 15),
 *   new Date(2015, 0, 1, 0, 0, 0),
 *   { includeSeconds: true }
 * )
 * //=> 'less than 20 seconds'
 *
 * @example
 * // What is the distance from 1 January 2016
 * // to 1 January 2015, with a suffix?
 * var result = formatDistance(new Date(2015, 0, 1), new Date(2016, 0, 1), {
 *   addSuffix: true
 * })
 * //=> 'about 1 year ago'
 *
 * @example
 * // What is the distance between 1 August 2016 and 1 January 2015 in Esperanto?
 * import { eoLocale } from 'date-fns/locale/eo'
 * var result = formatDistance(new Date(2016, 7, 1), new Date(2015, 0, 1), {
 *   locale: eoLocale
 * })
 * //=> 'pli ol 1 jaro'
 */
module.exports = function formatDistance(dirtyDate, dirtyBaseDate, dirtyOptions) {
    if (arguments.length < 2) {
        throw new TypeError(
            '2 arguments required, but only ' + arguments.length + ' present'
        );
    }

    var options = dirtyOptions || {};
    var locale = options.locale || defaultLocale;

    if (!locale.formatDistance) {
        throw new RangeError('locale must contain formatDistance property');
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

    var seconds = differenceInSeconds(dateRight, dateLeft);
    var offsetInSeconds = (getTimezoneOffsetInMilliseconds(dateRight)
      - getTimezoneOffsetInMilliseconds(dateLeft))
    / 1000;
    var minutes = Math.round((seconds - offsetInSeconds) / 60);
    var months;

    // 0 up to 2 mins
    if (minutes < 2) {
        if (options.includeSeconds) {
            if (seconds < 5) {
                return locale.formatDistance('lessThanXSeconds', 5, localizeOptions);
            } if (seconds < 10) {
                return locale.formatDistance('lessThanXSeconds', 10, localizeOptions);
            } if (seconds < 20) {
                return locale.formatDistance('lessThanXSeconds', 20, localizeOptions);
            } if (seconds < 40) {
                return locale.formatDistance('halfAMinute', null, localizeOptions);
            } if (seconds < 60) {
                return locale.formatDistance('lessThanXMinutes', 1, localizeOptions);
            }
            return locale.formatDistance('xMinutes', 1, localizeOptions);
        }
        if (minutes === 0) {
            return locale.formatDistance('lessThanXMinutes', 1, localizeOptions);
        }
        return locale.formatDistance('xMinutes', minutes, localizeOptions);

    // 2 mins up to 0.75 hrs
    } if (minutes < 45) {
        return locale.formatDistance('xMinutes', minutes, localizeOptions);

    // 0.75 hrs up to 1.5 hrs
    } if (minutes < 90) {
        return locale.formatDistance('aboutXHours', 1, localizeOptions);

    // 1.5 hrs up to 24 hrs
    } if (minutes < MINUTES_IN_DAY) {
        var hours = Math.round(minutes / 60);
        return locale.formatDistance('aboutXHours', hours, localizeOptions);

    // 1 day up to 1.75 days
    } if (minutes < MINUTES_IN_ALMOST_TWO_DAYS) {
        return locale.formatDistance('xDays', 1, localizeOptions);

    // 1.75 days up to 30 days
    } if (minutes < MINUTES_IN_MONTH) {
        var days = Math.round(minutes / MINUTES_IN_DAY);
        return locale.formatDistance('xDays', days, localizeOptions);

    // 1 month up to 2 months
    } if (minutes < MINUTES_IN_TWO_MONTHS) {
        months = Math.round(minutes / MINUTES_IN_MONTH);
        return locale.formatDistance('aboutXMonths', months, localizeOptions);
    }

    months = differenceInMonths(dateRight, dateLeft);

    // 2 months up to 12 months
    if (months < 12) {
        var nearestMonth = Math.round(minutes / MINUTES_IN_MONTH);
        return locale.formatDistance('xMonths', nearestMonth, localizeOptions);

    // 1 year up to max Date
    }
    var monthsSinceStartOfYear = months % 12;
    var years = Math.floor(months / 12);

    // N years up to 1 years 3 months
    if (monthsSinceStartOfYear < 3) {
        return locale.formatDistance('aboutXYears', years, localizeOptions);

        // N years 3 months up to N years 9 months
    } if (monthsSinceStartOfYear < 9) {
        return locale.formatDistance('overXYears', years, localizeOptions);

        // N years 9 months up to N year 12 months
    }
    return locale.formatDistance('almostXYears', years + 1, localizeOptions);
};
