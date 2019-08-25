'use strict';

var getSymbols = require('./getSymbols');
var keys = require('../keys');

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
    var result = keys(object);
    if (!Array.isArray(object)) {
        result.push(getSymbols(object));
    }
    return result;
}

module.exports = getAllKeys;
