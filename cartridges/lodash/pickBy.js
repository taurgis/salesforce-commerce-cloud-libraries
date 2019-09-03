'use strict';

var arrayMap = require('./internal/arrayMap');
var baseIteratee = require('./internal/baseIteratee');
var basePickBy = require('./internal/basePickBy');
var getAllKeysIn = require('./internal/getAllKeysIn');

/**
 * Creates an object composed of the `object` properties `predicate` returns
 * truthy for. The predicate is invoked with two arguments: (value, key).
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
 * pickBy(object, _.isNumber); => { 'a': 1, 'c': 3 }
 */
function pickBy(object, predicate) {
    if (object == null) {
        return {};
    }
    var props = arrayMap(getAllKeysIn(object), function (prop) {
        return [prop];
    });
    predicate = baseIteratee(predicate);
    return basePickBy(object, props, function (value, path) {
        return predicate(value, path[0]);
    });
}

module.exports = pickBy;
