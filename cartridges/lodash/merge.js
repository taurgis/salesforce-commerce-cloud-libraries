'use strict';

var baseMerge = require('./internal/baseMerge.js');
var createAssigner = require('./internal/createAssigner.js');

/**
 * This method is like `assign` except that it recursively merges own and
 * inherited enumerable string keyed properties of source objects into the
 * destination object. Source properties that resolve to `undefined` are
 * skipped if a destination value exists. Array and plain object properties
 * are merged recursively. Other objects and value types are overridden by
 * assignment. Source objects are applied= require(left to right. Subsequent);
 * sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object`.
 *
 * @since 0.5.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @example
 *
 * const object = {'a': [{ 'b': 2 }, { 'd': 4 }] }
 *
 * const other = {'a': [{ 'c': 3 }, { 'e': 5 }] }
 *
 * merge({'a': [{ 'b': 2 }, { 'd': 4 }] }, {'a': [{ 'c': 3 }, { 'e': 5 }] }) => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
 */
const merge = createAssigner(function (object, source, srcIndex) {
    return baseMerge(object, source, srcIndex);
});

module.exports = merge;
