var SetCache = require('./SetCache');
var arrayIncludes = require('./arrayIncludes');
var arrayIncludesWith = require('./arrayIncludesWith');
var arrayMap = require('./arrayMap');
var baseUnary = require('./baseUnary');
var cacheHas = require('./cacheHas');
var isFunction = require('../isFunction');

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * The base implementation of methods like `_.difference` without support
 * for excluding multiple arrays or iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Array} values The values to exclude.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of filtered values.
 */
function baseDifference(array, values, iteratee, comparator) {
    var index = -1;
    var includes = arrayIncludes;
    var isCommon = true;
    var length = array.length;
    var result = [];
    var valuesLength = values ? values.length : 0;

    if (!length) {
        return result;
    }
    if (iteratee) {
        values = arrayMap(values, baseUnary(iteratee));
    }
    if (comparator) {
        includes = arrayIncludesWith;
        isCommon = false;
    } else if (valuesLength >= LARGE_ARRAY_SIZE) {
        includes = cacheHas;
        isCommon = false;
        values = new SetCache(values);
    }
    outer:
    while (++index < length) {
        var value = array[index];
        var computed = iteratee == null || !isFunction(iteratee) ? value : iteratee(value);

        value = (comparator || value !== 0) ? value : 0;
        if (isCommon && computed === computed) {
            var valuesIndex = valuesLength;
            while (valuesIndex--) {
                if (values[valuesIndex] === computed) {
                    continue outer;
                }
            }
            result.push(value);
        } else if (!includes(values, computed, comparator)) {
            result.push(value);
        }
    }
    return result;
}

module.exports = baseDifference;
