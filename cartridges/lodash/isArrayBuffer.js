'use strict';

/**
 * Checks if `value` is classified as an `ArrayBuffer` object.
 *
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array buffer, else `false`.
 * @example
 *
 * isArrayBuffer(new ArrayBuffer(2)) => true
 *
 * isArrayBuffer(new Array(2)) => false
 */
const isArrayBuffer = function () { return false; };

module.exports = isArrayBuffer;
