'use strict';

var arraySome = require('./internal/arraySome');
var createOver = require('./internal/createOver');

/**
 * Creates a function that checks if **any** of the `predicates` return
 * truthy when invoked with the arguments it receives.
 *
 * @static
 * @since 4.0.0
 * @category Util
 * @param {...(Function|Function[])} [predicates=[_.identity]]
 *  The predicates to check.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var func = overSome([Boolean, isFinite]);
 *
 * func('1'); => true
 *
 * func(null); => true
 *
 * func(NaN); => false
 */
var overSome = createOver(arraySome);

module.exports = overSome;
