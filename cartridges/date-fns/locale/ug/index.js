var formatDistance = require('./_lib/formatDistance/index');
var formatLong = require('./_lib/formatLong/index');
var formatRelative = require('./_lib/formatRelative/index');
var localize = require('./_lib/localize/index');
var match = require('./_lib/match/index');

/**
 * @type {Locale}
 * @category Locales
 * @summary Uighur locale
 * @language Uighur
 * @iso-639-2 uig
 * @author Abduwaly M. [@abduwaly]{@link https://github.com/abduwaly}
 */
var locale = {
    formatDistance: formatDistance,
    formatLong: formatLong,
    formatRelative: formatRelative,
    localize: localize,
    match: match,
    options: {
        weekStartsOn: 0 /* Sunday */,
        firstWeekContainsDate: 1
    }
};

module.exports = locale;
