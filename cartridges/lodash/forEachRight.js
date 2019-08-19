'use strict';

var arrayEachRight = require('./.internal/arrayEachRight');
var baseEachRight = require('./.internal/baseEachRight');

/**
 * This method is like `forEach` except that it iterates over elements of
 * `collection`= require(right to left.);
 *
 * @since 2.0.0
 * @alias eachRight
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 * @see forEach, forIn, forInRight, forOwn, forOwnRight
 * @example
 *
 * forEachRight([1, 2], value => console.log(value))
 * // => Logs `2` then `1`.
 */
function forEachRight(collection, iteratee) {
    var func = Array.isArray(collection) ? arrayEachRight : baseEachRight;
    return func(collection, iteratee);
}

module.exports = forEachRight;
