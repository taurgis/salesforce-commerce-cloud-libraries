var words = require('./words.js');

const reQuotes = /['\u2019]/g;

/**
 * Converts `string`, as space separated words, to lower case.
 *
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the lower cased string.
 * @see camelCase, kebabCase, snakeCase, startCase, upperCase, upperFirst
 * @example
 *
 * lowerCase('--Foo-Bar--')
 * // => 'foo bar'
 *
 * lowerCase('fooBar')
 * // => 'foo bar'
 *
 * lowerCase('__FOO_BAR__')
 * // => 'foo bar'
 */
const lowerCase = function (string) {
    return words(string.replace(reQuotes, '')).reduce(function (result, word, index) {
        return result + (index ? ' ' : '') + word.toLowerCase();
    }, '');
};

module.exports = lowerCase;
