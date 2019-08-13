'use strict';

var eq = require('./eq');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Assigns own and inherited enumerable string keyed properties of source
 * objects to the destination object for all destination properties that
 * resolve to `undefined`. Source objects are applied= require(left to right.);
 * Once a property is set, additional values of the same property are ignored.
 *
 * **Note:** This method mutates `object`.
 *
 * @since 0.1.0
 * @category Object
 * @param {Object} defaultObject The destination object.
 * @param {...Object} [defaultSources] The source objects.
 * @returns {Object} Returns `object`.
 * @see defaultsDeep
 * @example
 *
 * defaults({ 'a': 1 }, [{ 'b': 2 }, { 'a': 3 }])
 * // => { 'a': 1, 'b': 2 }
 */
function defaults(defaultObject, defaultSources) {
    var object = Object(defaultObject);
    var sources = defaultSources;
    sources.forEach(function (defaultSource) {
        if (defaultSource != null) {
            var source = Object(defaultSource);
            for (var key in source) {
                var value = object[key];
                if (value === undefined ||
            (eq(value, objectProto[key]) && !hasOwnProperty.call(object, key))) {
                    object[key] = source[key];
                }
            }
        }
    });
    return object;
}

module.exports = defaults;
