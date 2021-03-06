'use strict';

var baseIteratee = require('./internal/baseIteratee');
var baseUniq = require('./internal/baseUniq');

/**
 * This method is like `uniq` except that it accepts `iteratee` which is
 * invoked for each element in `array` to generate the criterion by which
 * uniqueness is computed. The order of result values is determined by the
 * order they occur in the array. The iteratee is invoked with one argument:
 * (value).
 *
 * @static
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee=identity] The iteratee invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 * @example
 *
 * uniqBy([2.1, 1.2, 2.3], Math.floor); => [2.1, 1.2]
 *
 * * The `property` iteratee shorthand. *
 * uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x'); => [{ 'x': 1 }, { 'x': 2 }]
 */
function uniqBy(array, iteratee) {
    return (array && array.length) ? baseUniq(array, baseIteratee(iteratee, 2)) : [];
}

module.exports = uniqBy;
