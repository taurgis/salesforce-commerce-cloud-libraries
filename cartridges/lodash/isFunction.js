'use strict';

var getTag = require('./internal/getTag');
var isObject = require('./isObject');

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * isFunction(_) => true
 *
 * isFunction(/abc/) => false
 */
function isFunction(value) {
    if (!isObject(value)) {
        return false;
    }
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 9 which returns 'object' for typed arrays and other constructors.
    const tag = getTag(value);
    return tag === '[object Function]' || tag === '[object AsyncFunction]'
    || tag === '[object GeneratorFunction]' || tag === '[object Proxy]' || tag.indexOf('function') === 0;
}

module.exports = isFunction;
