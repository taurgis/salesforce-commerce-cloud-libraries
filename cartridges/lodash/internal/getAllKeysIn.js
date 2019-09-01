'use strict';

/**
 * Creates an array of own and inherited enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeysIn(object) {
    var result = [];
    for (var key in object) {
        result.push(key);
    }

    return result;
}

module.exports = getAllKeysIn;
