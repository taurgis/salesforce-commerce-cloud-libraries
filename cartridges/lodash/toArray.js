var copyArray = require('./.internal/copyArray.js');
var getTag = require('./.internal/getTag.js');
var isArrayLike = require('./isArrayLike.js');
var isString = require('./isString.js');
var iteratorToArray = require('./.internal/iteratorToArray.js');
var mapToArray = require('./.internal/mapToArray.js');
var setToArray = require('./.internal/setToArray.js');
var stringToArray = require('./.internal/stringToArray.js');
var values = require('./values.js');

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
 * toArray({ 'a': 1, 'b': 2 })
 * // => [1, 2]
 *
 * toArray('abc')
 * // => ['a', 'b', 'c']
 *
 * toArray(1)
 * // => []
 *
 * toArray(null)
 * // => []
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
