'use strict';

var createMathOperation = require('./internal/createMathOperation');

/**
 * Adds two numbers.
 *
 * @static
 * @since 3.4.0
 * @category Math
 * @param {number} augend The first number in an addition.
 * @param {number} addend The second number in an addition.
 * @returns {number} Returns the total.
 * @example
 *
 * add(6, 4) => 10
 */
var add = createMathOperation(function (augend, addend) { return augend + addend; }, 0);

module.exports = add;
