'use strict';

var baseProperty = require('./.internal/baseProperty.js');
var basePropertyDeep = require('./.internal/basePropertyDeep.js');
var isKey = require('./.internal/isKey.js');
var toKey = require('./.internal/toKey.js');

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * const objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ]
 *
 * map([
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ], property('a.b'))
 * // => [2, 1]
 *
 * map(sortBy(objects, property(['a', 'b'])), 'a.b')
 * // => [1, 2]
 */
function property(path) {
    return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}

module.exports = property;
