'use strict';

var formatRelativeLocale = {
    lastWeek: "eeee'ที่แล้วเวลา' p",
    yesterday: "'เมื่อวานนี้เวลา' p",
    today: "'วันนี้เวลา' p",
    tomorrow: "'พรุ่งนี้เวลา' p",
    nextWeek: "eeee 'เวลา' p",
    other: 'P'
};

module.exports = function formatRelative(token, _date, _baseDate, _options) {
    return formatRelativeLocale[token];
};
