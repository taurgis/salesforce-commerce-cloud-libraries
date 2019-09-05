'use strict';

var getTag = require('./internal/getTag');
var isObjectLike = require('./isObjectLike');
var nodeTypes = require('./internal/nodeTypes');
var isNil = require('./isNil');

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
 * isMap(new Map) => true
 *
 * isMap(new WeakMap) => false
 */
const isMap = nodeIsMap
    ? function (value) { return nodeIsMap(value); }
    : function (value) {
        var tag = getTag(value);

        if (tag === '[object JavaObject]') {
            return !isNil(value.put);
        }

        return isObjectLike(value) && (getTag(value) === '[object Map]');
    };

module.exports = isMap;
