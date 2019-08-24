'use strict';

var baseGet = require('./baseGet.js');
var baseSet = require('./baseSet.js');
var castPath = require('./castPath.js');

/**
 * The base implementation of `pickBy`.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} paths The property paths to pick.
 * @param {Function} predicate The function invoked per property.
 * @returns {Object} Returns the new object.
 */
function basePickBy(object, paths, predicate) {
    let index = -1;
    var length = paths.length;
    var result = {};

    while (++index < length) {
        var path = paths[index];
        var value = baseGet(object, path);
        if (predicate(value, path)) {
            baseSet(result, castPath(path, object), value);
        }
    }
    return result;
}

module.exports = basePickBy;
