var baseEach = require('./baseEach.js');
var baseSortBy = require('./baseSortBy.js');
var compareMultiple = require('./compareMultiple.js');
var isArrayLike = require('../isArrayLike')

/**
 * The base implementation of `orderBy` without param guards.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
 * @param {string[]} orders The sort orders of `iteratees`.
 * @returns {Array} Returns the new sorted array.
 */
function baseOrderBy(collection, iteratees, orders) {
    let criteriaIndex = -1
    let eachIndex = -1
    iteratees = iteratees.length ? iteratees : [function (value) { return value; }]

    var result = isArrayLike(collection) ? new Array(collection.length) : []

    baseEach(collection, function(value) {
        var criteria = iteratees.map(function (iteratee) { return iteratee(value); })
        result[++eachIndex] = { 'criteria': criteria, 'index': ++criteriaIndex, 'value': value }
    });

    return baseSortBy(result, function (object, other) { return compareMultiple(object, other, orders); })
}

module.exports = baseOrderBy;
