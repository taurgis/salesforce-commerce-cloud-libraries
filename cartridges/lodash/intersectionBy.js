'use strict';

var arrayMap = require('./internal/arrayMap');
var baseIntersection = require('./internal/baseIntersection');
var baseIteratee = require('./internal/baseIteratee');
var baseRest = require('./internal/baseRest');
var castArrayLikeObject = require('./internal/castArrayLikeObject');
var last = require('./last');

/**
 * This method is like `intersection` except that it accepts `iteratee`
 * which is invoked for each element of each `arrays` to generate the criterion
 * by which they're compared. The order and references of result values are
 * determined by the first array. The iteratee is invoked with one argument:
 * (value).
 *
 * @static
 * @since 4.0.0
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @param {Function} [iteratee=identity] The iteratee invoked per element.
 * @returns {Array} Returns the new array of intersecting values.
 * @example
 *
 * intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor); => [2.1]
 *
 * * The `_.property` iteratee shorthand. *
 * intersectionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x'); => [{ 'x': 1 }]
 */
var intersectionBy = baseRest(function (arrays) {
    var iteratee = last(arrays);
    var mapped = arrayMap(arrays, castArrayLikeObject);

    if (iteratee === last(mapped)) {
        iteratee = undefined;
    } else {
        mapped.pop();
    }
    return (mapped.length && mapped[0] === arrays[0])
        ? baseIntersection(mapped, baseIteratee(iteratee, 2))
        : [];
});

module.exports = intersectionBy;
