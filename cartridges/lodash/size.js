'use strict';

var getTag = require('./internal/getTag');
var isArrayLike = require('./isArrayLike');
var isString = require('./isString');
var stringSize = require('./internal/stringSize');

/** `Object#toString` result references. */
const mapTag = '[object Map]';
const setTag = '[object Set]';

/**
 * Gets the size of `collection` by returning its length for array-like
 * values or the number of own enumerable string keyed properties for objects.
 *
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object|string} collection The collection to inspect.
 * @returns {number} Returns the collection size.
 * @example
 *
 * size([1, 2, 3]) => 3
 *
 * size({ 'a': 1, 'b': 2 }) => 2
 *
 * size('pebbles') => 7
 */
function size(collection) {
    if (collection == null) {
        return 0;
    }
    if (isArrayLike(collection)) {
        return isString(collection) ? stringSize(collection) : collection.length;
    }
    const tag = getTag(collection);
    if (tag === mapTag || tag === setTag) {
        return collection.size;
    }
    return Object.keys(collection).length;
}

module.exports = size;
