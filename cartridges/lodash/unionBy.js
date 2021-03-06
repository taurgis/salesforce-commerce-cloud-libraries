'use strict';

var baseFlatten = require('./internal/baseFlatten');
var baseIteratee = require('./internal/baseIteratee');
var baseRest = require('./internal/baseRest');
var baseUniq = require('./internal/baseUniq');
var isArrayLikeObject = require('./isArrayLikeObject');
var last = require('./last');

/**
 * This method is like `_.union` except that it accepts `iteratee` which is
 * invoked for each element of each `arrays` to generate the criterion by
 * which uniqueness is computed. Result values are chosen from the first
 * array in which the value occurs. The iteratee is invoked with one argument:
 * (value).
 *
 * @static
 * @since 4.0.0
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @param {Function} [iteratee=identity] The iteratee invoked per element.
 * @returns {Array} Returns the new array of combined values.
 * @example
 *
 * unionBy([2.1], [1.2, 2.3], Math.floor); => [2.1, 1.2]
 *
 * * The `property` iteratee shorthand. *
 * unionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x'); => [{ 'x': 1 }, { 'x': 2 }]
 */
var unionBy = baseRest(function (arrays) {
    var iteratee = last(arrays);
    if (isArrayLikeObject(iteratee)) {
        iteratee = undefined;
    }
    return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), baseIteratee(iteratee, 2));
});

module.exports = unionBy;
