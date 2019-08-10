var map = require('./map.js');
var baseIntersection = require('./.internal/baseIntersection.js');
var castArrayLikeObject = require('./.internal/castArrayLikeObject.js');
var last = require('./last.js');

/**
 * This method is like `intersection` except that it accepts `iteratee`
 * which is invoked for each element of each `arrays` to generate the criterion
 * by which they're compared. The order and references of result values are
 * determined by the first array. The iteratee is invoked with one argument:
 * (value).
 *
 * @since 4.0.0
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @param {Function} iteratee The iteratee invoked per element.
 * @returns {Array} Returns the new array of intersecting values.
 * @example
 *
 * intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor)
 * // => [2.1]
 */
function intersectionBy() {
    var arrays = Array.prototype.slice.call(arguments);

    let iteratee = last(arrays);
    const mapped = map(arrays, castArrayLikeObject);

    if (iteratee === last(mapped)) {
        iteratee = undefined;
    } else {
        mapped.pop();
    }
    return (mapped.length && mapped[0] === arrays[0])
        ? baseIntersection(mapped, iteratee)
        : [];
}

module.exports = intersectionBy;
