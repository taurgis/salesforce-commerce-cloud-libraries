'use strict';

var createPadding = require('./internal/createPadding');
var stringSize = require('./internal/stringSize');
var toInteger = require('./toInteger');
var toString = require('./toString');

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeCeil = Math.ceil;
var nativeFloor = Math.floor;

/**
 * Pads `string` on the left and right sides if it's shorter than `length`.
 * Padding characters are truncated if they can't be evenly divided by `length`.
 *
 * @static
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to pad.
 * @param {number} [length=0] The padding length.
 * @param {string} [chars=' '] The string used as padding.
 * @returns {string} Returns the padded string.
 * @example
 *
 * pad('abc', 8); => '  abc   '
 *
 * pad('abc', 8, '_-'); => '_-abc_-_'
 *
 * pad('abc', 3); => 'abc'
 */
function pad(string, length, chars) {
    string = toString(string);
    length = toInteger(length);

    var strLength = length ? stringSize(string) : 0;
    if (!length || strLength >= length) {
        return string;
    }
    var mid = (length - strLength) / 2;
    return (
        createPadding(nativeFloor(mid), chars)
        + string
        + createPadding(nativeCeil(mid), chars)
    );
}

module.exports = pad;
