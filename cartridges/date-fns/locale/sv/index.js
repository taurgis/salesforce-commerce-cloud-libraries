var formatDistance = require('./_lib/formatDistance/index');
var formatLong = require('./_lib/formatLong/index');
var formatRelative = require('./_lib/formatRelative/index');
var localize = require('./_lib/localize/index');
var match = require('./_lib/match/index');

/**
 * @type {Locale}
 * @category Locales
 * @summary Swedish locale.
 * @language Swedish
 * @iso-639-2 swe
 * @author Johannes Ulén [@ejulen]{@link https://github.com/ejulen}
 * @author Alexander Nanberg [@alexandernanberg]{@link https://github.com/alexandernanberg}
 * @author Henrik Andersson [@limelights]{@link https://github.com/limelights}
 */
var locale = {
    formatDistance: formatDistance,
    formatLong: formatLong,
    formatRelative: formatRelative,
    localize: localize,
    match: match,
    options: {
        weekStartsOn: 1 /* Monday */,
        firstWeekContainsDate: 4
    }
};

module.exports = locale;
