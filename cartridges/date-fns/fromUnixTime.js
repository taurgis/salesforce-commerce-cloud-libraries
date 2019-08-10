var toDate = require('./toDate');
var toInteger = require('./_lib/toInteger/index');

/**
 * @name fromUnixTime
 * @category Timestamp Helpers
 * @summary Create a date from a Unix timestamp.
 *
 * @description
 * Create a date from a Unix timestamp.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {number} dirtyUnixTime - the given Unix timestamp
 * @returns {Date} the date
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Create the date 29 February 2012 11:45:05:
 * var result = fromUnixTime(1330515905)
 * //=> Wed Feb 29 2012 11:45:05
 */
module.exports = function fromUnixTime(dirtyUnixTime) {
    if (arguments.length < 1) {
        throw new TypeError(
            '1 argument required, but only ' + arguments.length + ' present'
        );
    }

    var unixTime = toInteger(dirtyUnixTime);

    return toDate(unixTime * 1000);
};
