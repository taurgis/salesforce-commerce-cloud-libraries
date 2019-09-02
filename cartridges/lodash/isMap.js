'use strict';

var getTag = require('./internal/getTag.js');
var isObjectLike = require('./isObjectLike.js');
var nodeTypes = require('./internal/nodeTypes.js');

/* Node.js helper references. */
const nodeIsMap = nodeTypes && nodeTypes.isMap;

/**
 * Checks if `value` is classified as a `Map` object.
 *
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 * @example
 *
 * isMap(new Map)
 * // => true
 *
 * isMap(new WeakMap)
 * // => false
 */
const isMap = nodeIsMap
    ? (value) => nodeIsMap(value)
    : (value) => isObjectLike(value) && getTag(value) === '[object Map]';

module.exports = isMap;
