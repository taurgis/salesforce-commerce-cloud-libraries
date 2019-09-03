'use strict';

var baseFlatten = require('./internal/baseFlatten.js');
var baseUniq = require('./internal/baseUniq.js');
var isArrayLikeObject = require('./isArrayLikeObject.js');
var last = require('./last.js');

/**
 * This method is like `union` except that it accepts `comparator` which
 * is invoked to compare elements of `arrays`. Result values are chosen from
 * the first array in which the value occurs. The comparator is invoked
 * with two arguments: (arrVal, othVal).
 *
 * @since 4.0.0
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of combined values.
 * @see difference, union, unionBy, without, xor, xorBy
 * @example
 *
 * const objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]
 * const others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }]
 *
 * unionWith(objects, others, isEqual) => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
 */
function unionWith() {
    var arrays = Array.prototype.slice.call(arguments);
    let comparator = last(arrays);
    comparator = typeof comparator === 'function' ? comparator : undefined;
    return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), undefined, comparator);
}

module.exports = unionWith;
