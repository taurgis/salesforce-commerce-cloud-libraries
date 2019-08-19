'use strict';

var toInteger = require('../toInteger/index');
var toDate = require('../../toDate');

// This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376
module.exports = function setUTCISODay(dirtyDate, dirtyDay) {
    if (arguments.length < 2) {
        throw new TypeError(
            '2 arguments required, but only ' + arguments.length + ' present'
        );
    }

    var day = toInteger(dirtyDay);

    if (day % 7 === 0) {
        day -= 7;
    }

    var weekStartsOn = 1;
    var date = toDate(dirtyDate);
    var currentDay = date.getUTCDay();

    var remainder = day % 7;
    var dayIndex = (remainder + 7) % 7;

    var diff = (dayIndex < weekStartsOn ? 7 : 0) + day - currentDay;

    date.setUTCDate(date.getUTCDate() + diff);
    return date;
};
