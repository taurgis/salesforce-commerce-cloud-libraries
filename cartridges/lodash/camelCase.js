'use strict';

var capitalize = require('./capitalize');
var createCompounder = require('./internal/createCompounder');

/**
 * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
 *
 * @static
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the camel cased string.
 * @example
 *
 * camelCase('Foo Bar'); => 'fooBar'
 *
 * camelCase('--foo-bar--'); => 'fooBar'
 *
 * camelCase('__FOO_BAR__'); => 'fooBar'
 */
var camelCase = createCompounder(function (result, word, index) {
    word = word.toLowerCase();
    return result + (index ? capitalize(word) : word);
});

module.exports = camelCase;
