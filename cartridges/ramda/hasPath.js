'use strict';

var _curry2 = require('./internal/_curry2');
var _has = require('./internal/_has');

var isNil = require('./isNil');

/**
 * Returns whether or not a path exists in an object. Only the object's
 * own properties are checked.
 *
 * @func
 * @memberOf R
 * @since v0.26.0
 * @category Object
 * @typedefn Idx = String | Int
 * @sig [Idx] -> {a} -> Boolean
 * @param {Array} path The path to use.
 * @param {Object} obj The object to check the path in.
 * @return {Boolean} Whether the path exists.
 * @see R.has
 * @example
 *
 *      R.hasPath(['a', 'b'], {a: {b: 2}});         // => true
 *      R.hasPath(['a', 'b'], {a: {b: undefined}}); // => true
 *      R.hasPath(['a', 'b'], {a: {c: 2}});         // => false
 *      R.hasPath(['a', 'b'], {});                  // => false
 */
var hasPath = _curry2(function hasPath(_path, obj) {
    if (_path.length === 0 || isNil(obj)) {
        return false;
    }
    var val = obj;
    var idx = 0;
    while (idx < _path.length) {
        if (!isNil(val) && _has(_path[idx], val)) {
            val = val[_path[idx]];
            idx += 1;
        } else {
            return false;
        }
    }
    return true;
});
module.exports = hasPath;
