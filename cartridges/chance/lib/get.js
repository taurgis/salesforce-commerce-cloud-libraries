'use strict';

var copyObject = require('./copyObject');
var data = require('./data');

module.exports = function (name) {
    return copyObject(data[name]);
};
