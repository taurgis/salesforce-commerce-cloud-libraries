var formatDistance = require('./_lib/formatDistance/index');
var formatLong = require('./_lib/formatLong/index');
var formatRelative = require('../en-US/_lib/formatRelative/index');
var localize = require('../en-US/_lib/localize/index');
var match = require('../en-US/_lib/match/index');

/**
 * @type {Locale}
 * @category Locales
 * @summary English locale (Canada).
 * @language English
 * @iso-639-2 eng
 * @author Mark Owsiak [@markowsiak]{@link https://github.com/markowsiak}
 * @author Marco Imperatore [@mimperatore]{@link https://github.com/mimperatore}
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
