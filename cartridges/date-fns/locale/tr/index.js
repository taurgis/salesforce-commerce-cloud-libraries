var formatDistance = require('./_lib/formatDistance/index');
var formatLong = require('./_lib/formatLong/index');
var formatRelative = require('./_lib/formatRelative/index');
var localize = require('./_lib/localize/index');
var match = require('./_lib/match/index');

/**
 * @type {Locale}
 * @category Locales
 * @summary Turkish locale.
 * @language Turkish
 * @iso-639-2 tur
 * @author Alpcan Aydın [@alpcanaydin]{@link https://github.com/alpcanaydin}
 * @author Berkay Sargın [@berkaey]{@link https://github.com/berkaey}
 * @author Ismail Demirbilek [@dbtek]{@link https://github.com/dbtek}
 * @author İsmail Kayar [@ikayar]{@link https://github.com/ikayar}
 *
 *
 */
var locale = {
    formatDistance: formatDistance,
    formatLong: formatLong,
    formatRelative: formatRelative,
    localize: localize,
    match: match,
    options: {
        weekStartsOn: 1 /* Monday */,
        firstWeekContainsDate: 1
    }
};

module.exports = locale;
