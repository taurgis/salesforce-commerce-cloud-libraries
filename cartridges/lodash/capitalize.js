var upperFirst = require('./upperFirst');

/**
 * Converts the first character of `string` to upper case and the remaining
 * to lower case.
 *
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to capitalize.
 * @returns {string} Returns the capitalized string.
 * @example
 *
 * capitalize('FRED')
 * // => 'Fred'
 */
var capitalize = function (string) { return upperFirst(string.toLowerCase()); };


module.exports = capitalize;
