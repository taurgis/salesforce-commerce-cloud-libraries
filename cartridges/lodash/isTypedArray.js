var getTag = require('./.internal/getTag');
var nodeTypes = require('./.internal/nodeTypes');
var isObjectLike = require('./isObjectLike');

/** Used to match `toStringTag` values of typed arrays. */
var reTypedTag = /^\[object (?:Float(?:32|64)|(?:Int|Uint)(?:8|16|32)|Uint8Clamped)Array\]$/;

/* Node.js helper references. */
var nodeIsTypedArray = nodeTypes && nodeTypes.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * isTypedArray(new Uint8Array)
 * // => true
 *
 * isTypedArray([])
 * // => false
 */
var isTypedArray = nodeIsTypedArray
    ? function (value) { return nodeIsTypedArray(value); }
    : function (value) { return isObjectLike(value) && reTypedTag.test(getTag(value)); };

module.exports = isTypedArray;
