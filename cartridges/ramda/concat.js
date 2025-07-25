'use strict';

var _curry2 = require('./internal/_curry2');
var _isArray = require('./internal/_isArray');
var _isFunction = require('./internal/_isFunction');
var _isString = require('./internal/_isString');
var toString = require('./toString');

/**
 * Returns the result of concatenating the given lists or strings.
 *
 * Note: `R.concat` expects both arguments to be of the same type,
 * unlike the native `Array.prototype.concat` method. It will throw
 * an error if you `concat` an Array with a non-Array value.
 *
 * Dispatches to the `concat` method of the first argument, if present.
 * Can also concatenate two members of a [fantasy-land
 * compatible semigroup](https://github.com/fantasyland/fantasy-land#semigroup).
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a] -> [a]
 * @sig String -> String -> String
 * @param {Array|String} firstList The first list
 * @param {Array|String} secondList The second list
 * @return {Array|String} A list consisting of the elements of `firstList` followed by the elements of
 * `secondList`.
 *
 * @example
 *
 *      R.concat('ABC', 'DEF'); // 'ABCDEF'
 *      R.concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
 *      R.concat([], []); //=> []
 */
var concat = _curry2(function concat(a, b) {
    if (_isArray(a)) {
        if (_isArray(b)) {
            return a.concat(b);
        }
        throw new TypeError(toString(b) + ' is not an array');
    }
    if (_isString(a)) {
        if (_isString(b)) {
            return a + b;
        }
        throw new TypeError(toString(b) + ' is not a string');
    }
    if (a != null && _isFunction(a['fantasy-land/concat'])) {
        return a['fantasy-land/concat'](b);
    }
    if (a != null && _isFunction(a.concat)) {
        return a.concat(b);
    }
    throw new TypeError(toString(a) + ' does not have a method named "concat" or "fantasy-land/concat"');
});
module.exports = concat;
