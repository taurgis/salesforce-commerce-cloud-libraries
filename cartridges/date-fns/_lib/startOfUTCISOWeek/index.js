'use strict';

var toDate = require('../../toDate');

// This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376
module.exports = function startOfUTCISOWeek(dirtyDate) {
    if (arguments.length < 1) {
        throw new TypeError(
            '1 argument required, but only ' + arguments.length + ' present'
        );
    }

    var weekStartsOn = 1;

    var date = toDate(dirtyDate);
    var day = date.getUTCDay();
    var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;

    date.setUTCDate(date.getUTCDate() - diff);
    date.setUTCHours(0, 0, 0, 0);
    return date;
};
