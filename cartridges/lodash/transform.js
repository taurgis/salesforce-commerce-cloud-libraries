'use strict';

var arrayEach = require('./internal/arrayEach');
var baseCreate = require('./internal/baseCreate');
var baseForOwn = require('./internal/baseForOwn');
var baseIteratee = require('./internal/baseIteratee');
var getPrototype = require('./internal/getPrototype');
var isArray = require('./isArray');
var isBuffer = require('./isBuffer');
var isFunction = require('./isFunction');
var isObject = require('./isObject');
var isTypedArray = require('./isTypedArray');

/**
 * An alternative to `_.reduce`; this method transforms `object` to a new
 * `accumulator` object which is the result of running each of its own
 * enumerable string keyed properties thru `iteratee`, with each invocation
 * potentially mutating the `accumulator` object. If `accumulator` is not
 * provided, a new object with the same `[[Prototype]]` will be used. The
 * iteratee is invoked with four arguments: (accumulator, value, key, object).
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @static
 * @since 1.3.0
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @param {*} [accumulator] The custom accumulator value.
 * @returns {*} Returns the accumulated value.
 * @example
 *
 * transform([2, 3, 4], function(result, n) {
 *   result.push(n *= n);
 *   return n % 2 == 0;
 * }, []); => [4, 9]
 *
 * transform({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
 *   (result[value] || (result[value] = [])).push(key);
 * }, {}); => { '1': ['a', 'c'], '2': ['b'] }
 */
function transform(object, iteratee, accumulator) {
    var isArr = isArray(object);
    var isArrLike = isArr || isBuffer(object) || isTypedArray(object);

    iteratee = baseIteratee(iteratee, 4);
    if (accumulator == null) {
        var Ctor = object && object.constructor;
        if (isArrLike) {
            accumulator = isArr ? new Ctor() : [];
        } else if (isObject(object)) {
            accumulator = isFunction(Ctor) ? baseCreate(getPrototype(object)) : {};
        } else {
            accumulator = {};
        }
    }
    (isArrLike ? arrayEach : baseForOwn)(object, function (value, index, object) {
        return iteratee(accumulator, value, index, object);
    });
    return accumulator;
}

module.exports = transform;
