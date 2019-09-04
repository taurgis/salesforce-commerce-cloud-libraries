'use strict';

var copyArray = require('./internal/copyArray');
var getTag = require('./internal/getTag');
var isArrayLike = require('./isArrayLike');
var isString = require('./isString');
var iteratorToArray = require('./internal/iteratorToArray');
var mapToArray = require('./internal/mapToArray');
var setToArray = require('./internal/setToArray');
var stringToArray = require('./internal/stringToArray');
var values = require('./values');

/** `Object#toString` result references. */
const mapTag = '[object Map]';
const setTag = '[object Set]';

/** Built-in value references. */
const symIterator = false;

/**
 * Converts `value` to an array.
 *
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Array} Returns the converted array.
 * @example
 *
 * toArray({ 'a': 1, 'b': 2 }) => [1, 2]
 *
 * toArray('abc') => ['a', 'b', 'c']
 *
 * toArray(1) => []
 *
 * toArray(null) => []
 */
function toArray(value) {
    if (!value) {
        return [];
    }
    if (isArrayLike(value)) {
        return isString(value) ? stringToArray(value) : copyArray(value);
    }
    if (symIterator && value[symIterator]) {
        return iteratorToArray(value[symIterator]());
    }
    const tag = getTag(value);
    const func = tag === mapTag ? mapToArray : (tag === setTag ? setToArray : values);

    return func(value);
}

module.exports = toArray;
