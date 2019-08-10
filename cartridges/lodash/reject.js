var filter = require('./filter.js');
var filterObject = require('./filterObject.js');
var negate = require('./negate.js');

/**
 * The opposite of `filter` this method returns the elements of `collection`
 * that `predicate` does **not** return truthy for.
 *
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 * @see pull, pullAll, pullAllBy, pullAllWith, pullAt, remove, filter
 * @example
 *
 * const users = [
 *   { 'user': 'barney', 'active': true },
 *   { 'user': 'fred',   'active': false }
 * ]
 *
 * reject([
 *   { 'user': 'barney', 'active': true },
 *   { 'user': 'fred',   'active': false }
 * ], ({ active }) => active)
 * // => objects for ['fred']
 */
function reject(collection, predicate) {
    const func = Array.isArray(collection) ? filter : filterObject;
    return func(collection, negate(predicate));
}

module.exports = reject;
