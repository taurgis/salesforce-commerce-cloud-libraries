'use strict';

var createMathOperation = require('./.internal/createMathOperation');

/**
 * Divide two numbers.
 *
 * @since 4.7.0
 * @category Math
 * @param {number} dividend The first number in a division.
 * @param {number} divisor The second number in a division.
 * @returns {number} Returns the quotient.
 * @example
 *
 * divide(6, 4)
 * // => 1.5
 */
var divide = createMathOperation(function (dividend, divisor) { return dividend / divisor; }, 1);

module.exports = divide;
