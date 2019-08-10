var castSlice = require('./.internal/castSlice.js');
var charsStartIndex = require('./.internal/charsStartIndex.js');
var stringToArray = require('./.internal/stringToArray.js');

/**
 * Removes leading whitespace or specified characters= require(`string`.);
 *
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to trim.
 * @param {string} [chars=whitespace] The characters to trim.
 * @returns {string} Returns the trimmed string.
 * @see trim, trimEnd
 * @example
 *
 * trimStart('  abc  ')
 * // => 'abc  '
 *
 * trimStart('-_-abc-_-', '_-')
 * // => 'abc-_-'
 */
function trimStart(string, chars) {
    if (string && chars === undefined) {
        return string.replace(/^\s+/, '');
    }
    if (!string || !chars) {
        return string;
    }
    const strSymbols = stringToArray(string);
    const start = charsStartIndex(strSymbols, stringToArray(chars));
    return castSlice(strSymbols, start).join('');
}

module.exports = trimStart;
