'use strict';

var map = require('./map');
var baseIntersection = require('./internal/baseIntersection');
var castArrayLikeObject = require('./internal/castArrayLikeObject');

/**
 * Creates an array of unique values that are included in all given arrays
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons. The order and references of result values are
 * determined by the first array.
 *
 * @static
 * @since 0.1.0
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @returns {Array} Returns the new array of intersecting values.
 * @example
 *
 * intersection([2, 1], [2, 3]) => [2]
 */
function intersection() {
    var arrays = Array.prototype.slice.call(arguments);
    const mapped = map(arrays, castArrayLikeObject);
    return (mapped.length && mapped[0] === arrays[0])
        ? baseIntersection(mapped)
        : [];
}

module.exports = intersection;
