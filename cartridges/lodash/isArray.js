'use strict';

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * isArray([1, 2, 3]); => true
 *
 * isArray(document.body.children); => false
 *
 * isArray('abc'); => false
 *
 * isArray(_.noop); => false
 */
var isArray = Array.isArray;

module.exports = isArray;
