'use strict';

var baseConformsTo = require('./baseConformsTo.js');
var keys = require('../keys.js');

/**
 * The base implementation of `conforms` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property predicates to conform to.
 * @returns {Function} Returns the new spec function.
 */
function baseConforms(source) {
    var props = keys(source);
    return function (object) { return baseConformsTo(object, source, props); };
}

module.exports = baseConforms;
