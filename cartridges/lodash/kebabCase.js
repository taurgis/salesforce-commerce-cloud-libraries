'use strict';

var createCompounder = require('./internal/createCompounder');

/**
 * Converts `string` to
 * [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
 *
 * @static
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the kebab cased string.
 * @example
 *
 * kebabCase('Foo Bar'); => 'foo-bar'
 *
 * kebabCase('fooBar'); => 'foo-bar'
 *
 * kebabCase('__FOO_BAR__'); => 'foo-bar'
 */
var kebabCase = createCompounder(function (result, word, index) {
    return result + (index ? '-' : '') + word.toLowerCase();
});

module.exports = kebabCase;
