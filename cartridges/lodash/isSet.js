'use strict';

var getTag = require('./internal/getTag.js');
var nodeTypes = require('./internal/nodeTypes.js');
var isObjectLike = require('./isObjectLike.js');
var isNil = require('./isNil');

/* Node.js helper references. */
const nodeIsSet = nodeTypes && nodeTypes.isSet;

/**
 * Checks if `value` is classified as a `Set` object.
 *
 * @static
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 * @example
 *
 * isSet(new Set) => true
 *
 * isSet(new WeakSet) => false
 */
const isSet = nodeIsSet
    ? function (value) { return nodeIsSet(value); }
    : function (value) {
        var tag = getTag(value);

        if (tag === '[object JavaObject]') {
            return !isNil(value.add) && !isNil(value.retainAll);
        }
        return isObjectLike(value) && getTag(value) === '[object Set]';
    };

module.exports = isSet;
