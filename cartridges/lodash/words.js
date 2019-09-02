'use strict';

var unicodeWords = require('./internal/unicodeWords');

var hasUnicodeWord = RegExp.prototype.test.bind(
    /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/
);


const reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g; // eslint-disable-line

/**
 * Match ASCII words
 * @param {string} string - String to match
 *
 * @returns [string] - The matches
 */
function asciiWords(string) {
    return string.match(reAsciiWord);
}
/**
 * Splits `string` into an array of its words.
 *
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to inspect.
 * @param {RegExp|string} [pattern] The pattern to match words.
 * @returns {Array} Returns the words of `string`.
 * @example
 *
 * words('fred, barney, & pebbles')
 * // => ['fred', 'barney', 'pebbles']
 *
 * words('fred, barney, & pebbles', /[^, ]+/g)
 * // => ['fred', 'barney', '&', 'pebbles']
 */
function words(string, pattern) {
    if (pattern === undefined) {
        var result = hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
        return result || [];
    }
    return string.match(pattern) || [];
}

module.exports = words;
