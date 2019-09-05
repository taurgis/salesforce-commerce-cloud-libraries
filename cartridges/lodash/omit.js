'use strict';

var arrayMap = require('./internal/arrayMap');
var baseClone = require('./internal/baseClone');
var baseUnset = require('./internal/baseUnset');
var castPath = require('./internal/castPath');
var copyObject = require('./internal/copyObject');
var customOmitClone = require('./internal/customOmitClone');
var flatRest = require('./internal/flatRest');
var getAllKeysIn = require('./internal/getAllKeysIn');

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1;
var CLONE_FLAT_FLAG = 2;
var CLONE_SYMBOLS_FLAG = 4;

/**
 * The opposite of `_.pick`; this method creates an object composed of the
 * own and inherited enumerable property paths of `object` that are not omitted.
 *
 * **Note:** This method is considerably slower than `_.pick`.
 *
 * @static
 * @since 0.1.0
 * @category Object
 * @param {Object} object The source object.
 * @param {...(string|string[])} [paths] The property paths to omit.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * omit(object, ['a', 'c']); => { 'b': '2' }
 */
var omit = flatRest(function (object, paths) {
    var result = {};
    if (object == null) {
        return result;
    }
    var isDeep = false;
    paths = arrayMap(paths, function (path) {
        path = castPath(path, object);
        isDeep || (isDeep = path.length > 1);
        return path;
    });
    copyObject(object, getAllKeysIn(object), result);
    if (isDeep) {
        result = baseClone(result, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
    }
    var length = paths.length;
    while (length--) {
        baseUnset(result, paths[length]);
    }
    return result;
});

module.exports = omit;
