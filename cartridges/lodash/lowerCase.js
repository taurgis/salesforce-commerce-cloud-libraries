'use strict';

var createCompounder = require('./internal/createCompounder');

/**
 * Converts `string`, as space separated words, to lower case.
 *
 * @static
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the lower cased string.
 * @example
 *
 * lowerCase('--Foo-Bar--'); => 'foo bar'
 *
 * lowerCase('fooBar'); => 'foo bar'
 *
 * lowerCase('__FOO_BAR__'); => 'foo bar'
 */
var lowerCase = createCompounder(function (result, word, index) {
    return result + (index ? ' ' : '') + word.toLowerCase();
});

module.exports = lowerCase;
