'use strict';

var createPadding = require('./internal/createPadding');
var stringSize = require('./internal/stringSize');
var toInteger = require('./toInteger');
var toString = require('./toString');

/**
 * Pads `string` on the right side if it's shorter than `length`. Padding
 * characters are truncated if they exceed `length`.
 *
 * @static
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to pad.
 * @param {number} [length=0] The padding length.
 * @param {string} [chars=' '] The string used as padding.
 * @returns {string} Returns the padded string.
 * @example
 *
 * padEnd('abc', 6); => 'abc   '
 *
 * padEnd('abc', 6, '_-'); => 'abc_-_'
 *
 * padEnd('abc', 3); => 'abc'
 */
function padEnd(string, length, chars) {
    string = toString(string);
    length = toInteger(length);

    var strLength = length ? stringSize(string) : 0;
    return (length && strLength < length)
        ? (string + createPadding(length - strLength, chars))
        : string;
}

module.exports = padEnd;
