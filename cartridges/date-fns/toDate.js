'use strict';

/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If the argument is none of the above, the function returns Invalid Date.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 *
 * @param {Date|number} argument - the value to convert
 * @returns {Date} the parsed date in the local time zone
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Clone the date:
 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert the timestamp to date:
 * const result = toDate(1392098430000)
 * //=> Tue Feb 11 2014 11:30:30
 */
module.exports = function toDate(argument) {
    if (arguments.length < 1) {
        throw new TypeError(
            '1 argument required, but only ' + arguments.length + ' present'
        );
    }

    const argStr = Object.prototype.toString.call(argument);

    // Clone the date
    if (
        argument instanceof Date
    || (typeof argument === 'object' && argStr === '[object Date]')
    ) {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
        return new Date(argument.getTime());
    } if (typeof argument === 'number' || argStr === '[object Number]') {
        return new Date(argument);
    }
    if (
        (typeof argument === 'string' || argStr === '[object String]')
      && typeof console !== 'undefined'
    ) {
        // eslint-disable-next-line no-console
        console.warn(
            "Starting with v2.0.0-beta.1 date-fns doesn't accept strings as arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"
        );
        // eslint-disable-next-line no-console
        console.warn(new Error().stack);
    }
    return new Date(NaN);
};
