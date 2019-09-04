'use strict';

var createAggregator = require('./internal/createAggregator');

/**
 * Creates an array of elements split into two groups, the first of which
 * contains elements `predicate` returns truthy for, the second of which
 * contains elements `predicate` returns falsey for. The predicate is
 * invoked with one argument: (value).
 *
 * @static
 * @since 3.0.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [predicate=identity] The function invoked per iteration.
 * @returns {Array} Returns the array of grouped elements.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'age': 36, 'active': false },
 *   { 'user': 'fred',    'age': 40, 'active': true },
 *   { 'user': 'pebbles', 'age': 1,  'active': false }
 * ];
 *
 * partition(users, function(o) { return o.active; }); => objects for [['fred'], ['barney', 'pebbles']]
 *
 * * The `matches` iteratee shorthand. *
 * partition(users, { 'age': 1, 'active': false }); => objects for [['pebbles'], ['barney', 'fred']]
 *
 * * The `matchesProperty` iteratee shorthand. *
 * partition(users, ['active', false]); => objects for [['barney', 'pebbles'], ['fred']]
 *
 * * The `property` iteratee shorthand. *
 * partition(users, 'active'); => objects for [['fred'], ['barney', 'pebbles']]
 */
var partition = createAggregator(function (result, value, key) {
    result[key ? 0 : 1].push(value);
}, function () { return [[], []]; });

module.exports = partition;
