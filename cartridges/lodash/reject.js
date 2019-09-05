'use strict';

var arrayFilter = require('./internal/arrayFilter');
var baseFilter = require('./internal/baseFilter');
var baseIteratee = require('./internal/baseIteratee');
var isArray = require('./isArray');
var negate = require('./negate');

/**
 * The opposite of `filter`; this method returns the elements of `collection`
 * that `predicate` does **not** return truthy for.
 *
 * @static
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [predicate=identity] The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 * @see _.filter
 * @example
 *
 * var users = [
 *   { 'user': 'barney', 'age': 36, 'active': false },
 *   { 'user': 'fred',   'age': 40, 'active': true }
 * ];
 *
 * reject(users, function(o) { return !o.active; }); => objects for ['fred']
 *
 * * The `_.matches` iteratee shorthand. *
 * reject(users, { 'age': 40, 'active': true }); => objects for ['barney']
 *
 * * The `_.matchesProperty` iteratee shorthand. *
 * reject(users, ['active', false]); => objects for ['fred']
 *
 * * The `_.property` iteratee shorthand. *
 * reject(users, 'active'); => objects for ['barney']
 */
function reject(collection, predicate) {
    var func = isArray(collection) ? arrayFilter : baseFilter;
    return func(collection, negate(baseIteratee(predicate, 3)));
}

module.exports = reject;
