'use strict';

var isStrictComparable = require('./isStrictComparable.js');
var keys = require('../keys.js');

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
    var result = keys(object);
    let length = result.length;

    while (length--) {
        var key = result[length];
        var value = object[key];
        result[length] = [key, value, isStrictComparable(value)];
    }
    return result;
}

module.exports = getMatchData;
