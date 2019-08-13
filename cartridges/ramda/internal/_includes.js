'use strict';

var _indexOf = require('./_indexOf');


module.exports = function _includes(a, list) {
    return _indexOf(list, a, 0) >= 0;
};
