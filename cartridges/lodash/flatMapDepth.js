'use strict';

var baseFlatten = require('./internal/baseFlatten');
var map = require('./map');
var toInteger = require('./toInteger');

/**
 * This method is like `flatMap` except that it recursively flattens the
 * mapped results up to `depth` times.
 *
 * @static
 * @since 4.7.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=identity] The function invoked per iteration.
 * @param {number} [depth=1] The maximum recursion depth.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * function duplicate(n) {
 *   return [[[n, n]]];
 * }
 *
 * flatMapDepth([1, 2], duplicate, 2); => [[1, 1], [2, 2]]
 */
function flatMapDepth(collection, iteratee, depth) {
    depth = depth === undefined ? 1 : toInteger(depth);
    return baseFlatten(map(collection, iteratee), depth);
}

module.exports = flatMapDepth;
