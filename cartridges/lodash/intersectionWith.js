var map = require('./map.js');
var baseIntersection = require('./.internal/baseIntersection.js');
var castArrayLikeObject = require('./.internal/castArrayLikeObject.js');
var last = require('./last.js');

/**
 * This method is like `intersection` except that it accepts `comparator`
 * which is invoked to compare elements of `arrays`. The order and references
 * of result values are determined by the first array. The comparator is
 * invoked with two arguments: (arrVal, othVal).
 *
 * @since 4.0.0
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of intersecting values.
 * @example
 *
 * const objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]
 * const others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }]
 *
 * intersectionWith([{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }], [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }], isEqual)
 * // => [{ 'x': 1, 'y': 2 }]
 */
function intersectionWith() {
    var arrays = Array.prototype.slice.call(arguments);
    let comparator = last(arrays);
    const mapped = map(arrays, castArrayLikeObject);

    comparator = typeof comparator === 'function' ? comparator : undefined;
    if (comparator) {
        mapped.pop();
    }
    return (mapped.length && mapped[0] === arrays[0])
        ? baseIntersection(mapped, undefined, comparator)
        : [];
}

module.exports = intersectionWith;
