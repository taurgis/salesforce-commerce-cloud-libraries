'use strict';

var castPath = require('./castPath');
var isArguments = require('../isArguments');
var isArray = require('../isArray');
var isIndex = require('./isIndex');
var isLength = require('../isLength');
var toKey = require('./toKey');

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
    path = castPath(path, object);

    var index = -1;
    var length = path.length;
    var result = false;

    while (++index < length) {
        var key = toKey(path[index]);
        if (!(result = object != null && hasFunc(object, key))) {
            break;
        }
        object = object[key];
    }
    if (result || ++index != length) {
        return result;
    }
    length = object == null ? 0 : object.length;
    return !!length && isLength(length) && isIndex(key, length) && // eslint-disable-line
        (isArray(object) || isArguments(object));
}

module.exports = hasPath;
