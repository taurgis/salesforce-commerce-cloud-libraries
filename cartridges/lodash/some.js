'use strict';

var isFunction = require('./isFunction');
var isArray = require('./isArray');

/**
 * Checks if `predicate` returns truthy for **any** element of `array`.
 * Iteration is stopped once `predicate` returns truthy. The predicate is
 * invoked with three arguments: (value, index, array).
 *
 * @static
 * @since 5.0.0
 * @category Array
 * @param {Array} array The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 * @example
 *
 * some([null, 0, 'yes', false], Boolean) => true
 */
function some(array, predicate) {
    let index = -1;
    var length = array == null ? 0 : array.length;

    while (++index < length) {
        if (isFunction(predicate) && predicate(array[index], index, array)) {
            return true;
        } else if (isArray(predicate) && predicate.length === 2) {
            if (array[index][predicate[0]] === predicate[1]) {
                return true;
            }
        }
    }
    return false;
}

module.exports = some;
