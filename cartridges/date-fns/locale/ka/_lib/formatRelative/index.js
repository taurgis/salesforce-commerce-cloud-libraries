'use strict';

var formatRelativeLocale = {
    lastWeek: "'წინა' eeee LT'-ზე'",
    yesterday: "'გუშინ' LT'-ზე'",
    today: "'დღეს' LT'-ზე'",
    tomorrow: "'ხვალ' LT'-ზე'",
    nextWeek: "'შემდეგი' eeee LT'-ზე'",
    other: 'L'
};

module.exports = function formatRelative(token, _date, _baseDate, _options) {
    return formatRelativeLocale[token];
};
