'use strict';

var baseClone = require('./internal/baseClone');
var baseIteratee = require('./internal/baseIteratee');

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1;

/**
 * Creates a function that invokes `func` with the arguments of the created
 * function. If `func` is a property name, the created function returns the
 * property value for a given element. If `func` is an array or object, the
 * created function returns `true` for elements that contain the equivalent
 * source properties, otherwise it returns `false`.
 *
 * @static
 * @since 4.0.0
 * @category Util
 * @param {*} [func=identity] The value to convert to a callback.
 * @returns {Function} Returns the callback.
 * @example
 *
 * var users = [
 *   { 'user': 'barney', 'age': 36, 'active': true },
 *   { 'user': 'fred',   'age': 40, 'active': false }
 * ];
 *
 * * The `matches` iteratee shorthand. *
 * filter(users, iteratee({ 'user': 'barney', 'active': true })); => [{ 'user': 'barney', 'age': 36, 'active': true }]
 *
 * * The `matchesProperty` iteratee shorthand. *
 * filter(users, iteratee(['user', 'fred'])); => [{ 'user': 'fred', 'age': 40 }]
 *
 * * The `property` iteratee shorthand. *
 * map(users, iteratee('user')); => ['barney', 'fred']
 *
 * * Create custom iteratee shorthands. *
 * iteratee = wrap(iteratee, function(iteratee, func) {
 *   return !isRegExp(func) ? iteratee(func) : function(string) {
 *     return func.test(string);
 *   };
 * });
 *
 * filter(['abc', 'def'], /ef/); => ['def']
 */
function iteratee(func) {
    return baseIteratee(typeof func == 'function' ? func : baseClone(func, CLONE_DEEP_FLAG));
}

module.exports = iteratee;
