'use strict';

var buildMatchFn = require('../../../_lib/buildMatchFn/index');
var buildParseFn = require('../../../_lib/buildParseFn/index');
var buildMatchPatternFn = require('../../../_lib/buildMatchPatternFn/index');
var parseDecimal = require('../../../_lib/parseDecimal/index');

var matchOrdinalNumbersPattern = /^(\d+)(th|st|nd|rd)?/i;

var matchWeekdaysPatterns = {
    narrow: /^(su|mo|tu|we|th|fr|sa)/i,
    short: /^(sun|mon|tue|wed|thu|fri|sat)/i,
    long: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
};

var parseWeekdayPatterns = {
    any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
};

var matchMonthsPatterns = {
    short: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
    long: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
};

var parseMonthPatterns = {
    any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
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
