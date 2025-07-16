'use strict';

var baseToString = require('./internal/baseToString');
var castSlice = require('./internal/castSlice');
var charsEndIndex = require('./internal/charsEndIndex');
var charsStartIndex = require('./internal/charsStartIndex');
var stringToArray = require('./internal/stringToArray');
var toString = require('./toString');

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/**
 * Removes leading and trailing whitespace or specified characters from `string`.
 *
 * @static
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to trim.
 * @param {string} [chars=whitespace] The characters to trim.
 * @param {Object} [guard] Enables use as an iteratee for methods like `map`.
 * @returns {string} Returns the trimmed string.
 * @example
 *
 * trim('  abc  '); => 'abc'
 *
 * trim('-_-abc-_-', '_-'); => 'abc'
 *
 * map(['  foo  ', '  bar  '], trim); => ['foo', 'bar']
 */
function trim(string, chars, guard) {
    string = toString(string);
    if (string && (guard || chars === undefined)) {
        return string.replace(reTrim, '');
    }
    if (!string || !(chars = baseToString(chars))) {
        return string;
    }
    var strSymbols = stringToArray(string);
    var chrSymbols = stringToArray(chars);
    var start = charsStartIndex(strSymbols, chrSymbols);
    var end = charsEndIndex(strSymbols, chrSymbols) + 1;

    return castSlice(strSymbols, start, end).join('');
}

module.exports = trim;
