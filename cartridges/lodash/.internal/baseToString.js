var isSymbol = require('../isSymbol');

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0

/** Used to convert symbols to primitives and strings. */
var symbolToString = function(value) {
  return value.toString();
}

/**
 * The base implementation of `toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value
  }
  if (Array.isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return value.map(baseToString).toString()
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : ''
  }
  var result = value.toString()
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result
}

module.exports = baseToString;
