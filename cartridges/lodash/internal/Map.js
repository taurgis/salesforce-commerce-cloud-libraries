'use strict';

var HashMap;

if (typeof Map === 'undefined') {
    HashMap = require('dw/util/HashMap');
} else {
    HashMap = Map;
}

module.exports = HashMap;
