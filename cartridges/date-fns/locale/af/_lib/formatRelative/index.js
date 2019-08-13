'use strict';

var formatRelativeLocale = {
    lastWeek: "'verlede' eeee 'om' p",
    yesterday: "'gister om' p",
    today: "'vandag om' p",
    tomorrow: "'môre om' p",
    nextWeek: "eeee 'om' p",
    other: 'P'
};

module.exports = function formatRelative(token) {
    return formatRelativeLocale[token];
};
