var formatDistance = require('./_lib/formatDistance/index');
var formatLong = require('./_lib/formatLong/index');
var formatRelative = require('./_lib/formatRelative/index');
var localize = require('./_lib/localize/index');
var match = require('./_lib/match/index');

/**
 * @type {Locale}
 * @category Locales
 * @summary Arabic locale (Modern Standard Arabic ).
 * @language Modern Standard Arabic (Algeria) [ar-dz]
 * @iso-639-2 ara
 * @author Badreddine Boumaza [@badre429]{@link https://github.com/badre429}
 * @author Ahmed ElShahat [@elshahat]{@link https://github.com/elshahat}
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
