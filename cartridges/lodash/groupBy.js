var baseAssignValue = require('./.internal/baseAssignValue.js');
var reduce = require('./reduce.js');

/** Used to check objects for own properties. */


/**
 * Creates an object composed of keys generated= require(the results of running);
 * each element of `collection` thru `iteratee`. The order of grouped values
 * is determined by the order they occur in `collection`. The corresponding
 * value of each key is an array of elements responsible for generating the
 * key. The iteratee is invoked with one argument: (value).
 *
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The iteratee to transform keys.
 * @returns {Object} Returns the composed aggregate object.
 * @example
 *
 * groupBy([6.1, 4.2, 6.3], Math.floor)
 * // => { '4': [4.2], '6': [6.1, 6.3] }
 */
function groupBy(collection, iteratee) {
    return reduce(collection, function (result, value, key) {
        key = iteratee(value);
        if (result.hasOwnProperty(key)) {
            result[key].push(value);
        } else {
            baseAssignValue(result, key, [value]);
        }
        return result;
    }, {});
}

module.exports = groupBy;
