'use strict';

var formatRelativeLocale = {
    lastWeek: "'sidste' eeee 'kl.' p",
    yesterday: "'i går kl.' p",
    today: "'i dag kl.' p",
    tomorrow: "'i morgen kl.' p",
    nextWeek: "'på' eeee 'kl.' p",
    other: 'P'
};

module.exports = function formatRelative(token, _date, _baseDate, _options) {
    return formatRelativeLocale[token];
};
