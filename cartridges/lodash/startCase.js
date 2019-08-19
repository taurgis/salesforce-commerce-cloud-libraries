'use strict';

var upperFirst = require('./upperFirst.js');
var words = require('./words.js');

/**
 * Converts `string` to
 * [start case](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage).
 *
 * @since 3.1.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the start cased string.
 * @see camelCase, lowerCase, kebabCase, snakeCase, upperCase, upperFirst
 * @example
 *
 * startCase('--foo-bar--')
 * // => 'Foo Bar'
 *
 * startCase('fooBar')
 * // => 'Foo Bar'
 *
 * startCase('__FOO_BAR__')
 * // => 'FOO BAR'
 */
const startCase = function (string) {
    return words(string.replace(/['\u2019]/g, '')).reduce(function (result, word, index) {
        return result + (index ? ' ' : '') + upperFirst(word);
    }, '');
};

module.exports = startCase;
