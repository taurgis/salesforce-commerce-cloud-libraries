var formatDistance = require('./_lib/formatDistance/index');
var formatLong = require('./_lib/formatLong/index');
var formatRelative = require('./_lib/formatRelative/index');
var localize = require('./_lib/localize/index');
var match = require('./_lib/match/index');

/**
 * @type {Locale}
 * @category Locales
 * @summary Hebrew locale.
 * @language Hebrew
 * @iso-639-2 heb
 * @author Nir Lahad [@nirlah]{@link https://github.com/nirlah}
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
