var baseAssignValue = require('./.internal/baseAssignValue');
var reduce = require('./reduce');

/**
 * Creates an object composed of keys generated= require(the results of running);
 * each element of `collection` thru `iteratee`. The corresponding value of
 * each key is the number of times the key was returned by `iteratee`. The
 * iteratee is invoked with one argument: (value).
 *
 * @since 0.5.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The iteratee to transform keys.
 * @returns {Object} Returns the composed aggregate object.
 * @example
 *
 * var users = [
 *   { 'user': 'barney', 'active': true },
 *   { 'user': 'betty', 'active': true },
 *   { 'user': 'fred', 'active': false }
 * ]
 *
 * countBy(users, 'active');
 * // => { 'true': 2, 'false': 1 }
 */
function countBy(collection, iteratee) {
    return reduce(collection, function (reduceResult, reduceValue) {
        var key = reduceValue[iteratee];
        var result = reduceResult;

        if (result[key]) {
            ++result[key];
        } else {
            baseAssignValue(result, key, 1);
        }
        return result;
    }, {});
}

module.exports = countBy;
