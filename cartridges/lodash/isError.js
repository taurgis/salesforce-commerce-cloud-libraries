var getTag = require('./.internal/getTag');
var isObjectLike = require('./isObjectLike');
var isPlainObject = require('./isPlainObject');

/**
 * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
 * `SyntaxError`, `TypeError`, or `URIError` object.
 *
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an error object, else `false`.
 * @example
 *
 * isError(new Error)
 * // => true
 *
 * isError(Error)
 * // => false
 */
function isError(value) {
    if (!isObjectLike(value)) {
        return false;
    }
    var tag = getTag(value);
    return tag === '[object Error]' || tag === '[object DOMException]' ||
    (typeof value.message === 'string' && typeof value.name === 'string' && !isPlainObject(value));
}

module.exports = isError;
