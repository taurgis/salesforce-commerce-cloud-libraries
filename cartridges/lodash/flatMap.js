'use strict';

var baseFlatten = require('./internal/baseFlatten');
var map = require('./map');

/**
 * Creates a flattened array of values by running each element in `collection`
 * thru `iteratee` and flattening the mapped results. The iteratee is invoked
 * with three arguments: (value, index|key, collection).
 *
 * @since 4.0.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new flattened array.
 * @see flatMapDeep, flatMapDepth, flatten, flattenDeep, flattenDepth, map, mapKeys, mapValues
 * @example
 *
 * function duplicate(n) {
 *   return [n, n]
 * }
 *
 * flatMap([1, 2], function duplicate(n) {
 *   return [n, n]
 * })
 * // => [1, 1, 2, 2]
 */
function flatMap(collection, iteratee) {
    return baseFlatten(map(collection, iteratee), 1);
}

module.exports = flatMap;
