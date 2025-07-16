'use strict';

var castPath = require('./castPath');
var last = require('../last');
var parent = require('./parent');
var toKey = require('./toKey');

/**
 * The base implementation of `_.unset`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The property path to unset.
 * @returns {boolean} Returns `true` if the property is deleted, else `false`.
 */
function baseUnset(object, path) {
    path = castPath(path, object);
    object = parent(object, path);
    try {
        return object == null || delete object[toKey(last(path))];
    } catch (e) {
        // DO NOTHING
    }

    return false;
}

module.exports = baseUnset;
