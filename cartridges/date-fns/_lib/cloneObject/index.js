'use strict';

var assign = require('../assign/index');

module.exports = function cloneObject(dirtyObject) {
    return assign({}, dirtyObject);
};
