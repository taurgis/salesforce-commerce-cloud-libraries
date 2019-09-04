'use strict';

var baseGet = require('./internal/baseGet');

/**
 * The opposite of `property`s method creates a function that returns
 * the value at a given path of `object`.
 *
 * @static
 * @since 3.0.0
 * @category Util
 * @param {Object} object The object to query.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * const array = [0, 1, 2]
 * const object = { 'a': array, 'b': array, 'c': array }
 *
 * map(['a[2]', 'c[0]'], propertyOf(object)) => [2, 0]
 *
 * map([['a', '2'], ['c', '0']], propertyOf(object)) => [2, 0]
 */
function propertyOf(object) {
    return function (path) { return object == null ? undefined : baseGet(object, path); };
}

module.exports = propertyOf;
