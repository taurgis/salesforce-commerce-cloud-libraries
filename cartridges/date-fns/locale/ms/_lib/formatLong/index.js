'use strict';

var buildFormatLongFn = require('../../../_lib/buildFormatLongFn/index');

var formatLong = buildFormatLongFn({
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd, D MMMM YYYY HH:mm'
});

module.exports = formatLong;
