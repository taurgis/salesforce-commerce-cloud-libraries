'use strict';

var createCompounder = require('./internal/createCompounder');

/**
 * Converts `string`, as space separated words, to upper case.
 *
 * @static
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the upper cased string.
 * @example
 *
 * upperCase('--foo-bar'); => 'FOO BAR'
 *
 * upperCase('fooBar'); => 'FOO BAR'
 *
 * upperCase('__foo_bar__'); => 'FOO BAR'
 */
var upperCase = createCompounder(function (result, word, index) {
    return result + (index ? ' ' : '') + word.toUpperCase();
});

module.exports = upperCase;
