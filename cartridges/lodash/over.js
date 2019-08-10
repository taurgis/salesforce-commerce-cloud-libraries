var map = require('./map.js');

/**
 * Creates a function that invokes `iteratees` with the arguments it receives
 * and returns their results.
 *
 * @since 4.0.0
 * @category Util
 * @param {Function[]} [iteratees=[identity]]
 *  The iteratees to invoke.
 * @returns {Function} Returns the new function.
 * @example
 *
 * const func = over([Math.max, Math.min])
 *
 * func(1, 2, 3, 4)
 * // => [4, 1]
 */
function over(iteratees) {
    return function () {
        var args = Array.prototype.slice.call(arguments);
        return map(iteratees, function (iteratee) { return iteratee.apply(this, args); });
    };
}

module.exports = over;
