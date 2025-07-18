'use strict';

var baseIsArguments = require('./internal/baseIsArguments');
var isObjectLike = require('./isObjectLike');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * isArguments(function() { return arguments; }()); => true
 *
 * isArguments([1, 2, 3]); => false
 */
var isArguments = baseIsArguments(function () { return arguments; }()) ? baseIsArguments : function (value) {
    return isObjectLike(value) && hasOwnProperty.call(value, 'callee')
    && !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;
