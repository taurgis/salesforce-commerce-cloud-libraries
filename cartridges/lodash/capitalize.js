'use strict';

var toString = require('./toString');
var upperFirst = require('./upperFirst');

/**
 * Converts the first character of `string` to upper case and the remaining
 * to lower case.
 *
 * @static
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to capitalize.
 * @returns {string} Returns the capitalized string.
 * @example
 *
 * capitalize('FRED'); => 'Fred'
 */
function capitalize(string) {
    return upperFirst(toString(string).toLowerCase());
}

module.exports = capitalize;

