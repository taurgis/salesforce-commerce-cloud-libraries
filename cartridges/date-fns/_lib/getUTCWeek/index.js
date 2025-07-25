'use strict';

var toDate = require('../../toDate');
var startOfUTCWeek = require('../startOfUTCWeek/index');
var startOfUTCWeekYear = require('../startOfUTCWeekYear/index');

var MILLISECONDS_IN_WEEK = 604800000;

// This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376
module.exports = function getUTCWeek(dirtyDate, options) {
    if (arguments.length < 1) {
        throw new TypeError(
            '1 argument required, but only ' + arguments.length + ' present'
        );
    }

    var date = toDate(dirtyDate);
    var diff = startOfUTCWeek(date, options).getTime()
    - startOfUTCWeekYear(date, options).getTime();

    // Round the number of days to the nearest integer
    // because the number of milliseconds in a week is not constant
    // (e.g. it's different in the week of the daylight saving time clock shift)
    return Math.round(diff / MILLISECONDS_IN_WEEK) + 1;
};
