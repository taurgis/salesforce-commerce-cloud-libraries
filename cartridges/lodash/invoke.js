'use strict';

var castPath = require('./internal/castPath.js');
var last = require('./last.js');
var parent = require('./internal/parent.js');
var toKey = require('./internal/toKey.js');

/**
 * Invokes the method at `path` of `object`.
 *
 * @since 4.0.0
 * @category Object
 * @param {Object} invokeObject The object to query.
 * @param {Array|string} invokePath The path of the method to invoke.
 * @param {Array} [invokeArgs] The arguments to invoke the method with.
 * @returns {*} Returns the result of the invoked method.
 * @example
 *
 * const object = { 'a': [{ 'b': { 'c': [1, 2, 3, 4] } }] }
 *
 * invoke({ 'a': [{ 'b': { 'c': [1, 2, 3, 4] } }] }, 'a[0].b.c.slice', [1, 3])
 * // => [2, 3]
 */
function invoke(invokeObject, invokePath, invokeArgs) {
    var path = castPath(invokePath, invokeObject);
    var object = parent(invokeObject, path);
    const func = object == null ? object : object[toKey(last(path))];
    return func == null ? undefined : func.apply(object, invokeArgs);
}

module.exports = invoke;
