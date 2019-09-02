'use strict';

/**
 * The base implementation of `conformsTo` which accepts `props` to check.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property predicates to conform to.
 * @returns {boolean} Returns `true` if `object` conforms, else `false`.
 */
function baseConformsTo(object, source, props) {
    let length = props.length;
    if (object == null) {
        return !length;
    }
    object = Object(object);
    while (length--) {
        var key = props[length];
        var predicate = source[key];
        var value = object[key];

        if ((value === undefined && !(key in object)) || !predicate(value)) {
            return false;
        }
    }
    return true;
}

module.exports = baseConformsTo;
