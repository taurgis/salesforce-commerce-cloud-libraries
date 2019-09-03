'use strict';

var isArray = require('./isArray');
var arrayLikeKeys = require('./internal/arrayLikeKeys');

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 *
 * @static
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * keysIn(new Foo); => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
    const result = [];

    if (isArray(object)) {
        return arrayLikeKeys(object);
    }

    for (var key in object) {
        result.push(key);
    }
    return result;
}

module.exports = keysIn;

