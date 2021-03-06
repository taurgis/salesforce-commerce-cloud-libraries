'use strict';

var baseIteratee = require('./internal/baseIteratee');
var negate = require('./negate');
var pickBy = require('./pickBy');

/**
 * The opposite of `pickBy`; this method creates an object composed of
 * the own and inherited enumerable string keyed properties of `object` that
 * `predicate` doesn't return truthy for. The predicate is invoked with two
 * arguments: (value, key).
 *
 * @static
 * @since 4.0.0
 * @category Object
 * @param {Object} object The source object.
 * @param {Function} [predicate=identity] The function invoked per property.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * omitBy(object, isNumber); => { 'b': '2' }
 */
function omitBy(object, predicate) {
    return pickBy(object, negate(baseIteratee(predicate)));
}

module.exports = omitBy;
