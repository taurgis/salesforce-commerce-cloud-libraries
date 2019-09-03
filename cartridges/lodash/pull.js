'use strict';

var pullAll = require('./pullAll.js');

/**
 * Removes all given values= require(`array` using);
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * **Note:** Unlike `without`, this method mutates `array`. Use `remove`
 * to remove elements= require(an array by predicate.);
 *
 * @since 2.0.0
 * @category Array
 * @param {Array} array The array to modify.
 * @param {...*} [values] The values to remove.
 * @returns {Array} Returns `array`.
 * @see pullAll, pullAllBy, pullAllWith, pullAt, remove, reject
 * @example
 *
 * const array = ['a', 'b', 'c', 'a', 'b', 'c']
 *
 * pull(['a', 'b', 'c', 'a', 'b', 'c'], 'a', 'c')
 * console.log(array) => ['b', 'b']
 */
function pull(array) {
    var values = Array.prototype.slice.call(arguments);
    values.shift();
    return pullAll(array, values);
}

module.exports = pull;
