'use strict';

var baseClamp = require('./internal/baseClamp');
var baseToString = require('./internal/baseToString');
var toInteger = require('./toInteger');
var toString = require('./toString');

/**
 * Checks if `string` ends with the given target string.
 *
 * @static
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to inspect.
 * @param {string} [target] The string to search for.
 * @param {number} [position=string.length] The position to search up to.
 * @returns {boolean} Returns `true` if `string` ends with `target`,
 *  else `false`.
 * @example
 *
 * endsWith('abc', 'c'); => true
 *
 * endsWith('abc', 'b'); => false
 *
 * endsWith('abc', 'b', 2); => true
 */
function endsWith(string, target, position) {
    string = toString(string);
    target = baseToString(target);

    var length = string.length;
    position = position === undefined
        ? length
        : baseClamp(toInteger(position), 0, length);

    var end = position;
    position -= target.length;
    return position >= 0 && string.slice(position, end) == target;
}

module.exports = endsWith;
