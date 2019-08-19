'use strict';

var formatRelativeLocale = {
    lastWeek: "'την προηγούμενη' eeee 'στις' p",
    yesterday: "'χθες στις' p",
    today: "'σήμερα στις' p",
    tomorrow: "'αύριο στις' p",
    nextWeek: "eeee 'στις' p",
    other: 'P'
};

module.exports = function formatRelative(token, _date, _baseDate, _options) {
    return formatRelativeLocale[token];
};
