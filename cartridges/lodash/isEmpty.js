'use strict';

var getTag = require('./internal/getTag.js');
var isArguments = require('./isArguments.js');
var isArrayLike = require('./isArrayLike.js');
var isBuffer = require('./isBuffer.js');
var isPrototype = require('./internal/isPrototype.js');
var isTypedArray = require('./isTypedArray.js');


/**
 * Checks if `value` is an empty object, collection, map, or set.
 *
 * Objects are considered empty if they have no own enumerable string keyed
 * properties.
 *
 * Array-like values such as `arguments` objects, arrays, buffers, strings, or
 * jQuery-like collections are considered empty if they have a `length` of `0`.
 * Similarly, maps and sets are considered empty if they have a `size` of `0`.
 *
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
 * @example
 *
 * isEmpty(null)
 * // => true
 *
 * isEmpty(true)
 * // => true
 *
 * isEmpty(1)
 * // => true
 *
 * isEmpty([1, 2, 3])
 * // => false
 *
 * isEmpty('abc')
 * // => false
 *
 * isEmpty({ 'a': 1 })
 * // => false
 */
function isEmpty(value) {
    if (value == null) {
        return true;
    }
    if (isArrayLike(value) &&
      (Array.isArray(value) || typeof value === 'string' || typeof value.splice === 'function' ||
        isBuffer(value) || isTypedArray(value) || isArguments(value))) {
        return !value.length;
    }
    const tag = getTag(value);
    if (tag === '[object Map]' || tag === '[object Set]') {
        return !value.size;
    }
    if (isPrototype(value)) {
        return !Object.keys(value).length;
    }

    for (var key in value) {
        if (value.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
}

module.exports = isEmpty;
