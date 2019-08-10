var formatDistance = require('./_lib/formatDistance/index');
var formatLong = require('./_lib/formatLong/index');
var formatRelative = require('./_lib/formatRelative/index');
var localize = require('./_lib/localize/index');
var match = require('./_lib/match/index');

/**
 * @type {Locale}
 * @category Locales
 * @summary Romanian locale.
 * @language Romanian
 * @iso-639-2 ron
 * @author Sergiu Munteanu [@jsergiu]{@link https://github.com/jsergiu}
 * @author Adrian Ocneanu [@aocneanu]{@link https://github.com/aocneanu}
 * @author Mihai Ocneanu [@gandesc]{@link https://github.com/gandesc}
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
