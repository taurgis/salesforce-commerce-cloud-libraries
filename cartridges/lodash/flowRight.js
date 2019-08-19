'use strict';

var flow = require('./flow.js');

/**
 * This method is like `flow` except that it composes a function that
 * invokes the given functions= require(right to left.);
 *
 * @since 3.0.0
 * @category Util
 * @param {Function[]} [funcs] The functions to invoke.
 * @returns {Function} Returns the new composite function.
 * @see flow
 * @example
 *
 * function square(n) {
 *   return n * n
 * }
 *
 * const addSquare = flowRight([square, add])
 * addSquare(1, 2)
 * // => 9
 */
function flowRight(funcs) {
    return flow(funcs.reverse());
}

module.exports = flowRight;
