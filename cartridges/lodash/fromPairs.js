'use strict';

/**
 * The inverse of `_.toPairs`; this method returns an object composed
 * from key-value `pairs`.
 *
 * @static
 * @since 4.0.0
 * @category Array
 * @param {Array} pairs The key-value pairs.
 * @returns {Object} Returns the new object.
 * @example
 *
 * fromPairs([['a', 1], ['b', 2]]); => { 'a': 1, 'b': 2 }
 */
function fromPairs(pairs) {
    var index = -1;
    var length = pairs == null ? 0 : pairs.length;
    var result = {};

    while (++index < length) {
        var pair = pairs[index];
        result[pair[0]] = pair[1];
    }
    return result;
}

module.exports = fromPairs;
