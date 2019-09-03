'use strict';

var arrayReduceRight = require('./internal/arrayReduceRight');
var baseEachRight = require('./internal/baseEachRight');
var baseIteratee = require('./internal/baseIteratee');
var baseReduce = require('./internal/baseReduce');
var isArray = require('./isArray');

/**
 * This method is like `_.reduce` except that it iterates over elements of
 * `collection` from right to left.
 *
 * @static
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=identity] The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @returns {*} Returns the accumulated value.
 * @see _.reduce
 * @example
 *
 * var array = [[0, 1], [2, 3], [4, 5]];
 *
 * reduceRight(array, function(flattened, other) {
 *   return flattened.concat(other);
 * }, []); => [4, 5, 2, 3, 0, 1]
 */
function reduceRight(collection, iteratee, accumulator) {
    var func = isArray(collection) ? arrayReduceRight : baseReduce;
    var initAccum = arguments.length < 3;

    return func(collection, baseIteratee(iteratee, 4), accumulator, initAccum, baseEachRight);
}

module.exports = reduceRight;
