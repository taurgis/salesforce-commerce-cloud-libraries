'use strict';

var baseToString = require('./internal/baseToString');
var castSlice = require('./internal/castSlice');
var charsStartIndex = require('./internal/charsStartIndex');
var stringToArray = require('./internal/stringToArray');
var toString = require('./toString');

/** Used to match leading and trailing whitespace. */
var reTrimStart = /^\s+/;

/**
 * Removes leading whitespace or specified characters from `string`.
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
 * trimStart('  abc  '); => 'abc  '
 *
 * trimStart('-_-abc-_-', '_-'); => 'abc-_-'
 */
function trimStart(string, chars, guard) {
    string = toString(string);
    if (string && (guard || chars === undefined)) {
        return string.replace(reTrimStart, '');
    }
    if (!string || !(chars = baseToString(chars))) {
        return string;
    }
    var strSymbols = stringToArray(string);
    var start = charsStartIndex(strSymbols, stringToArray(chars));

    return castSlice(strSymbols, start).join('');
}

module.exports = trimStart;
