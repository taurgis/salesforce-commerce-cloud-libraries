'use strict';

var isSameUTCWeek = require('../../../../_lib/isSameUTCWeek/index');

// https://www.unicode.org/cldr/charts/32/summary/sk.html?hide#1308
var accusativeWeekdays = [
    'nedeľu',
    'pondelok',
    'utorok',
    'stredu',
    'štvrtok',
    'piatok',
    'sobotu'
];

function lastWeek(day) {
    var weekday = accusativeWeekdays[day];

    switch (day) {
        case 0: /* Sun */
        case 4: /* Wed */
        case 6: /* Sat */
            return "'minulú " + weekday + " o' p";
        default:
            return "'minulý' eeee 'o' p";
    }
}

function thisWeek(day) {
    var weekday = accusativeWeekdays[day];

    if (day === 4 /* Thu */) {
        return "'vo' eeee 'o' p";
    }
    return "'v " + weekday + " o' p";
}

function nextWeek(day) {
    var weekday = accusativeWeekdays[day];

    switch (day) {
        case 0: /* Sun */
        case 4: /* Wed */
        case 6:
            return "'budúcu' " + weekday + " 'o' p";
        default:
            return "'budúci' eeee 'o' p";
    }
}

var formatRelativeLocale = {
    lastWeek: function (date, baseDate, options) {
        var day = date.getUTCDay();
        if (isSameUTCWeek(date, baseDate, options)) {
            return thisWeek(day);
        }
        return lastWeek(day);
    },
    yesterday: "'včera o' p",
    today: "'dnes o' p",
    tomorrow: "'zajtra o' p",
    nextWeek: function (date, baseDate, options) {
        var day = date.getUTCDay();
        if (isSameUTCWeek(date, baseDate, options)) {
            return thisWeek(day);
        }
        return nextWeek(day);
    },
    other: 'P'
};

module.exports = function formatRelative(token, date, baseDate, options) {
    var format = formatRelativeLocale[token];

    if (typeof format === 'function') {
        return format(date, baseDate, options);
    }

    return format;
};
