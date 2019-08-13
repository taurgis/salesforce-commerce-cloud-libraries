'use strict';

var formatDistance = require('./_lib/formatDistance/index');
var formatLong = require('./_lib/formatLong/index');
var formatRelative = require('./_lib/formatRelative/index');
var localize = require('./_lib/localize/index');
var match = require('./_lib/match/index');

/**
 * @type {Locale}
 * @category Locales
 * @summary Czech locale.
 * @language Czech
 * @iso-639-2 ces
 * @author David Rus [@davidrus]{@link https://github.com/davidrus}
 * @author Pavel Hrách [@SilenY]{@link https://github.com/SilenY}
 * @author Jozef Bíroš [@JozefBiros]{@link https://github.com/JozefBiros}
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
