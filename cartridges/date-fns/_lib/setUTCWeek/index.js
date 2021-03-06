'use strict';

var toInteger = require('../toInteger/index');
var toDate = require('../../toDate');
var getUTCWeek = require('../getUTCWeek/index');

// This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376
module.exports = function setUTCWeek(dirtyDate, dirtyWeek, options) {
    if (arguments.length < 2) {
        throw new TypeError(
            '2 arguments required, but only ' + arguments.length + ' present'
        );
    }

    var date = toDate(dirtyDate);
    var week = toInteger(dirtyWeek);
    var diff = getUTCWeek(date, options) - week;
    date.setUTCDate(date.getUTCDate() - diff * 7);
    return date;
};
