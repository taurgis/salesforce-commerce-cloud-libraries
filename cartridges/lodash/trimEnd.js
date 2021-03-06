'use strict';

var baseToString = require('./internal/baseToString');
var castSlice = require('./internal/castSlice');
var charsEndIndex = require('./internal/charsEndIndex');
var stringToArray = require('./internal/stringToArray');
var toString = require('./toString');

/** Used to match leading and trailing whitespace. */
var reTrimEnd = /\s+$/;

/**
 * Removes trailing whitespace or specified characters from `string`.
 *
 * @static
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to trim.
 * @param {string} [chars=whitespace] The characters to trim.
 * @param {Object} [guard] Enables use as an iteratee for methods like `map`.
 * @returns {string} Returns the trimmed string.
 * @example
 *
 * trimEnd('  abc  '); => '  abc'
 *
 * trimEnd('-_-abc-_-', '_-'); => '-_-abc'
 */
function trimEnd(string, chars, guard) {
    string = toString(string);
    if (string && (guard || chars === undefined)) {
        return string.replace(reTrimEnd, '');
    }
    if (!string || !(chars = baseToString(chars))) {
        return string;
    }
    var strSymbols = stringToArray(string);
    var end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;

    return castSlice(strSymbols, 0, end).join('');
}

module.exports = trimEnd;
