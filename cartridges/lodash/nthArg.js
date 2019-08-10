var nth = require('./nth.js');

/**
 * Creates a function that gets the argument at index `n`. If `n` is negative,
 * the nth argument= require(the end is returned.);
 *
 * @since 4.0.0
 * @category Util
 * @param {number} [n=0] The index of the argument to return.
 * @returns {Function} Returns the new pass-thru function.
 * @example
 *
 * const func = nthArg(1)
 * func('a', 'b', 'c', 'd')
 * // => 'b'
 *
 * const func = nthArg(-2)
 * func('a', 'b', 'c', 'd')
 * // => 'c'
 */
function nthArg(n) {
    return function (args) { return nth(args, n); };
}

module.exports = nthArg;
