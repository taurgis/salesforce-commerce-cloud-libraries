'use strict';

var formatRelativeLocale = {
    lastWeek: "eeee 'שעבר בשעה' p",
    yesterday: "'אתמול בשעה' p",
    today: "'היום בשעה' p",
    tomorrow: "'מחר בשעה' p",
    nextWeek: "eeee 'בשעה' p",
    other: 'P'
};

module.exports = function formatRelative(token, _date, _baseDate, _options) {
    return formatRelativeLocale[token];
};
