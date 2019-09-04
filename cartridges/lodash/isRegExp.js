'use strict';

var getTag = require('./internal/getTag');
var isObjectLike = require('./isObjectLike');
var nodeTypes = require('./internal/nodeTypes');

/* Node.js helper references. */
const nodeIsRegExp = nodeTypes && nodeTypes.isRegExp;

/**
 * Checks if `value` is classified as a `RegExp` object.
 *
 * @static
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
 * @example
 *
 * isRegExp(/abc/) => true
 *
 * isRegExp('/abc/') => false
 */
const isRegExp = nodeIsRegExp
    ? function (value) { return nodeIsRegExp(value); }
    : function (value) { return isObjectLike(value) && getTag(value) === '[object RegExp]'; };

module.exports = isRegExp;
