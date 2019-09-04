'use strict';

/**
 * Checks if `value` is classified as an `ArrayBuffer` object.
 *
 * @static
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array buffer, else `false`.
 * @example
 *
 * isArrayBuffer(new ArrayBuffer(2)) => true
 *
 * isArrayBuffer(new Array(2)) => false
 *
 * @implNote This is not supported by Salesforce Commerce Cloud
 */
const isArrayBuffer = function () { return false; };

module.exports = isArrayBuffer;
