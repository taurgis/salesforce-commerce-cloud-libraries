var formatDistance = require('../en-US/_lib/formatDistance/index');
var formatLong = require('./_lib/formatLong/index');
var formatRelative = require('../en-US/_lib/formatRelative/index');
var localize = require('../en-US/_lib/localize/index');
var match = require('../en-US/_lib/match/index');

/**
 * @type {Locale}
 * @category Locales
 * @summary English locale (United Kingdom).
 * @language English
 * @iso-639-2 eng
 * @author Alex [@glintik]{@link https://github.com/glintik}
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
