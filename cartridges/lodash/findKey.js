'use strict';

var baseFindKey = require('./internal/baseFindKey');
var baseForOwn = require('./internal/baseForOwn');
var baseIteratee = require('./internal/baseIteratee');

/**
 * This method is like `_.find` except that it returns the key of the first
 * element `predicate` returns truthy for instead of the element itself.
 *
 * @static
 * @since 1.1.0
 * @category Object
 * @param {Object} object The object to inspect.
 * @param {Function} [predicate=identity] The function invoked per iteration.
 * @returns {string|undefined} Returns the key of the matched element,
 *  else `undefined`.
 * @example
 *
 * var users = {
 *   'barney':  { 'age': 36, 'active': true },
 *   'fred':    { 'age': 40, 'active': false },
 *   'pebbles': { 'age': 1,  'active': true }
 * };
 *
 * findKey(users, function(o) { return o.age < 40; }); => 'barney' (iteration order is not guaranteed)
 *
 * // The `_.matches` iteratee shorthand.
 * findKey(users, { 'age': 1, 'active': true }); => 'pebbles'
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * findKey(users, ['active', false]); => 'fred'
 *
 * // The `_.property` iteratee shorthand.
 * findKey(users, 'active'); => 'barney'
 */
function findKey(object, predicate) {
    return baseFindKey(object, baseIteratee(predicate, 3), baseForOwn);
}

module.exports = findKey;
