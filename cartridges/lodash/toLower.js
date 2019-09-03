'use strict';

var toString = require('./toString');

/**
 * Converts `string`, as a whole, to lower case just like
 * [String#toLowerCase](https://mdn.io/toLowerCase).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the lower cased string.
 * @example
 *
 * toLower('--Foo-Bar--');
 * // => '--foo-bar--'
 *
 * toLower('fooBar');
 * // => 'foobar'
 *
 * toLower('__FOO_BAR__');
 * // => '__foo_bar__'
 */
function toLower(value) {
    return toString(value).toLowerCase();
}

module.exports = toLower;
