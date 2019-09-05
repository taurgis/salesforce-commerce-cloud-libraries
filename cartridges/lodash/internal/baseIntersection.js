'use strict';

var SetCache = require('./SetCache');
var arrayIncludes = require('./arrayIncludes');
var arrayIncludesWith = require('./arrayIncludesWith');
var map = require('../map');
var cacheHas = require('./cacheHas');

/**
 * The base implementation of methods like `intersection` that accepts an
 * array of arrays to inspect.
 *
 * @private
 * @param {Array} arrays The arrays to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of shared values.
 */
function baseIntersection(arrays, iteratee, comparator) {
    var includes = comparator ? arrayIncludesWith : arrayIncludes;
    var length = arrays[0].length;
    var othLength = arrays.length;
    var caches = new Array(othLength);
    var result = [];

    let array;
    let maxLength = Infinity;
    let othIndex = othLength;

    while (othIndex--) {
        array = arrays[othIndex];
        if (othIndex && iteratee) {
            array = map(array, function (value) { return iteratee(value); });
        }
        maxLength = Math.min(array.length, maxLength);
        caches[othIndex] = !comparator && (iteratee || (length >= 120 && array.length >= 120))
            ? new SetCache(othIndex && array)
            : undefined;
    }
    array = arrays[0];

    let index = -1;
    var seen = caches[0];

    outer:
    while (++index < length && result.length < maxLength) {
        let value = array[index];
        var computed = iteratee ? iteratee(value) : value;

        value = (comparator || value !== 0) ? value : 0;
        if (!(seen
            ? cacheHas(seen, computed)
            : includes(result, computed, comparator)
        )) {
            othIndex = othLength;
            while (--othIndex) {
                var cache = caches[othIndex];
                if (!(cache
                    ? cacheHas(cache, computed)
                    : includes(arrays[othIndex], computed, comparator))
                ) {
                    continue outer;
                }
            }
            if (seen) {
                seen.push(computed);
            }
            result.push(value);
        }
    }
    return result;
}

module.exports = baseIntersection;
