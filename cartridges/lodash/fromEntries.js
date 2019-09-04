'use strict';

/**
 * The inverse of `entries`is method returns an object composed
 *= require(key-value `pairs`.);
 *
 * @static
 * @since 4.0.0
 * @category Array
 * @param {Array} pairs The key-value pairs.
 * @returns {Object} Returns the new object.
 * @example
 *
 * fromEntries([['a', 1], ['b', 2]]) => { 'a': 1, 'b': 2 }
 */
function fromEntries(pairs) {
    const result = {};
    if (pairs == null) {
        return result;
    }
    for (var pairKey in pairs) {
        var pair = pairs[pairKey];
        result[pair[0]] = pair[1];
    }
    return result;
}

module.exports = fromEntries;
