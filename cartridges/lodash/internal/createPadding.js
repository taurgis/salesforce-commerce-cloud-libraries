'use strict';

var repeat = require('../repeat.js');
var baseToString = require('./baseToString.js');
var castSlice = require('./castSlice.js');
var hasUnicode = require('./hasUnicode.js');
var stringSize = require('./stringSize.js');
var stringToArray = require('./stringToArray.js');

/**
 * Creates the padding for `string` based on `length`. The `chars` string
 * is truncated if the number of characters exceeds `length`.
 *
 * @private
 * @param {number} length The padding length.
 * @param {string} [chars=' '] The string used as padding.
 * @returns {string} Returns the padding for `string`.
 */
function createPadding(length, chars) {
    chars = chars === undefined ? ' ' : baseToString(chars);

    var charsLength = chars.length;
    if (charsLength < 2) {
        return charsLength ? repeat(chars, length) : chars;
    }
    var result = repeat(chars, Math.ceil(length / stringSize(chars)));
    return hasUnicode(chars)
        ? castSlice(stringToArray(result), 0, length).join('')
        : result.slice(0, length);
}

module.exports = createPadding;
