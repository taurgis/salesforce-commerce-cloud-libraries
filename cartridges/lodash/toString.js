'use strict';

var baseToString = require('./internal/baseToString');

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * toString(null); => ''
 *
 * toString(-0); => '-0'
 *
 * toString([1, 2, 3]); => '1,2,3'
 */
function toString(value) {
    return value == null ? '' : baseToString(value);
}

module.exports = toString;
