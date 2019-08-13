'use strict';

var getTag = require('./.internal/getTag.js');
var nodeTypes = require('./.internal/nodeTypes.js');
var isObjectLike = require('./isObjectLike.js');

/* Node.js helper references. */
const nodeIsSet = nodeTypes && nodeTypes.isSet;

/**
 * Checks if `value` is classified as a `Set` object.
 *
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 * @example
 *
 * isSet(new Set)
 * // => true
 *
 * isSet(new WeakSet)
 * // => false
 */
const isSet = nodeIsSet
    ? (value) => nodeIsSet(value)
    : (value) => isObjectLike(value) && getTag(value) === '[object Set]';

module.exports = isSet;
