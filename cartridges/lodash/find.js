'use strict';

var createFind = require('./internal/createFind');
var findIndex = require('./findIndex');

/**
 * Iterates over elements of `collection`, returning the first element
 * `predicate` returns truthy for. The predicate is invoked with three
 * arguments: (value, index|key, collection).
 *
 * @static
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to inspect.
 * @param {Function} [predicate=identity] The function invoked per iteration.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {*} Returns the matched element, else `undefined`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'age': 36, 'active': true },
 *   { 'user': 'fred',    'age': 40, 'active': false },
 *   { 'user': 'pebbles', 'age': 1,  'active': true }
 * ];
 *
 * find(users, function(o) { return o.age < 40; }); => object for 'barney'
 *
 * // The `_.matches` iteratee shorthand.
 * find(users, { 'age': 1, 'active': true }); => object for 'pebbles'
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * find(users, ['active', false]); => object for 'fred'
 *
 * // The `_.property` iteratee shorthand.
 * find(users, 'active'); => object for 'barney'
 */
var find = createFind(findIndex);

module.exports = find;
