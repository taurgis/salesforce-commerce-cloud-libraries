var upperFirst = require('./upperFirst.js');
var words = require('./words');

/**
 * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
 *
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the camel cased string.
 * @see lowerCase, kebabCase, snakeCase, startCase, upperCase, upperFirst
 * @example
 *
 * camelCase('Foo Bar')
 * // => 'fooBar'
 *
 * camelCase('--foo-bar--')
 * // => 'fooBar'
 *
 * camelCase('__FOO_BAR__')
 * // => 'fooBar'
 */
var camelCase = function (string) {
    return words(string.replace(/['\u2019]/g, '')).reduce(function (reduceResult, reduceWord, index) {
        var word = reduceWord;
        var result = index === 1 ? reduceResult.toLowerCase() : reduceResult;
        word = word.toLowerCase();
        return result + (index > 0 ? upperFirst(word) : word);
    });
};

module.exports = camelCase;
