'use strict';

var getTag = require('./internal/getTag.js');
var isObjectLike = require('./isObjectLike.js');

/**
 * Checks if `value` is classified as a `WeakMap` object.
 *
 * @static
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a weak map, else `false`.
 * @example
 *
 * isWeakMap(new WeakMap) => true
 *
 * isWeakMap(new Map) => false
 *
 * @implNote This is not supported by Salesforce Commerce Cloud
 */
function isWeakMap(value) {
    return isObjectLike(value) && getTag(value) == '[object WeakMap]';
}

module.exports = isWeakMap;
