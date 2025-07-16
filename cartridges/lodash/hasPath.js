'use strict';

var castPath = require('./internal/castPath');
var isArguments = require('./isArguments');
var isIndex = require('./internal/isIndex');
var isLength = require('./isLength');
var toKey = require('./internal/toKey');

/**
 * Checks if `path` is a direct property of `object`.
 *
 * @static
 * @since 5.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @see has, hasIn, hasPathIn
 * @example
 *
 * const object = { 'a': { 'b': 2 } }
 * const other = create({ 'a': create({ 'b': 2 }) })
 *
 * hasPath({ 'a': { 'b': 2 } }, 'a.b') => true
 *
 * hasPath(object, ['a', 'b']) => true
 */
function hasPath(object, path) {
    path = castPath(path, object);

    let index = -1;
    let { length } = path;
    let result = false;
    let key;

    while (++index < length) {
        key = toKey(path[index]);
        if (!(result = object != null && object.hasOwnProperty(key))) {
            break;
        }
        object = object[key];
    }
    if (result || ++index != length) {
        return result;
    }
    length = object == null ? 0 : object.length;
    return !!length && isLength(length) && isIndex(key, length)
    && (Array.isArray(object) || isArguments(object));
}

module.exports = hasPath;
