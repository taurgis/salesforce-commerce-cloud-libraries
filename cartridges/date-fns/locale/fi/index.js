var formatDistance = require('./_lib/formatDistance/index');
var formatLong = require('./_lib/formatLong/index');
var formatRelative = require('./_lib/formatRelative/index');
var localize = require('./_lib/localize/index');
var match = require('./_lib/match/index');

/**
 * @type {Locale}
 * @category Locales
 * @summary Finnish locale.
 * @language Finnish
 * @iso-639-2 fin
 * @author Pyry-Samuli Lahti [@Pyppe]{@link https://github.com/Pyppe}
 * @author Edo Rivai [@mikolajgrzyb]{@link https://github.com/mikolajgrzyb}
 * @author Samu Juvonen [@sjuvonen]{@link https://github.com/sjuvonen}
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
