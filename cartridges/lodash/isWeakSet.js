'use strict';

var getTag = require('./internal/getTag');
var isObjectLike = require('./isObjectLike');

/**
 * Checks if `value` is classified as a `WeakSet` object.
 *
 * @static
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a weak set, else `false`.
 * @example
 *
 * isWeakSet(new WeakSet) => true
 *
 * isWeakSet(new Set) => false
 *
 * @implNote This is not supported by Salesforce Commerce Cloud
 */
function isWeakSet(value) {
    return isObjectLike(value) && getTag(value) == '[object WeakSet]';
}

module.exports = isWeakSet;
