var toDate = require('./toDate');
var addHours = require('./addHours');

/**
 * @name serverOffSet
 * @category Hour Helpers
 * @summary Sets the current date to the timezone of the Site.
 *
 * @description
 * Sets the current date to the timezone of the Site.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|number} dirtyDate - the date to be changed
 * @returns {Date} the new date with the hours added
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Sets the correct timezone
 * var result = serverOffSet(new Date(2014, 6, 10, 23, 0))
 * //=> +/- the timezone UTC setting
 */
module.exports = function serverOffSet(dirtyDate) {
    if (arguments.length !== 1) {
        throw new TypeError(
            '1 argument required, but only ' + arguments.length + ' present'
        );
    }
    var Site = require('dw/system/Site');
    var date = toDate(dirtyDate);
    var offset = Site.getCurrent().getTimezoneOffset() / 3600000;
    return addHours(date, offset);
};
