var buildMatchFn = require('../../../_lib/buildMatchFn/index');
var buildParseFn = require('../../../_lib/buildParseFn/index');
var buildMatchPatternFn = require('../../../_lib/buildMatchPatternFn/index');
var parseDecimal = require('../../../_lib/parseDecimal/index');
var matchOrdinalNumbersPattern = /^(\d+)(e|er|ère|ème|ième)?/i;

var matchWeekdaysPatterns = {
    narrow: /^(di|lu|ma|me|je|ve|sa)/i,
    short: /^(dim|lun|mar|mer|jeu|ven|sam)/i,
    long: /^(dimanche|lundi|mardi|mercredi|jeudi|vendredi|samedi)/i
};

var parseWeekdayPatterns = {
    any: [/^d/i, /^l/i, /^ma/i, /^me/i, /^j/i, /^v/i, /^s/i]
};

var matchMonthsPatterns = {
    short: /^(jan|fév|mar|avr|mai|juin|juil|aoû|sep|oct|nov|déc)/i,
    long: /^('janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre')/i
};

var parseMonthPatterns = {
    any: [/^ja/i, /^f/i, /^mar/i, /^av/i, /^mai$/i, /^juin/i, /^juil/i, /^ao/i, /^s/i, /^o/i, /^n/i, /^d/i]
};

var matchTimesOfDayPatterns = {
    short: /^(am|pm)/i,
    long: /^([ap]\.?\s?m\.?)/i
};

var parseTimeOfDayPatterns = {
    any: [/^a/i, /^p/i]
};

var match = {
    ordinalNumbers: buildMatchPatternFn(matchOrdinalNumbersPattern),
    ordinalNumber: parseDecimal,
    weekdays: buildMatchFn(matchWeekdaysPatterns, 'long'),
    weekday: buildParseFn(parseWeekdayPatterns, 'any'),
    months: buildMatchFn(matchMonthsPatterns, 'long'),
    month: buildParseFn(parseMonthPatterns, 'any'),
    timesOfDay: buildMatchFn(matchTimesOfDayPatterns, 'long'),
    timeOfDay: buildParseFn(parseTimeOfDayPatterns, 'any')
};

module.exports = match;
