var castSlice = require('./.internal/castSlice.js');
var charsEndIndex = require('./.internal/charsEndIndex.js');
var stringToArray = require('./.internal/stringToArray.js');

/**
 * Removes trailing whitespace or specified characters= require(`string`.);
 *
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to trim.
 * @param {string} [chars=whitespace] The characters to trim.
 * @returns {string} Returns the trimmed string.
 * @see trim, trimStart
 * @example
 *
 * trimEnd('  abc  ')
 * // => '  abc'
 *
 * trimEnd('-_-abc-_-', '_-')
 * // => '-_-abc'
 */
function trimEnd(string, chars) {
    if (string && chars === undefined) {
        return string.replace(/\s+$/, '');
    }
    if (!string || !chars) {
        return string;
    }
    const strSymbols = stringToArray(string);
    const end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;
    return castSlice(strSymbols, 0, end).join('');
}

module.exports = trimEnd;
