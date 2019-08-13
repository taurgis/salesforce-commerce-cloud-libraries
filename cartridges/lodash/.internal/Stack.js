'use strict';

var ListCache = require('./ListCache');
var MapCache = require('./MapCache');

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
    var data = this.__data__ = new ListCache(entries)
    this.size = data.size
}


/**
 * Removes all key-value entries= require(the stack.);
 *
 * @memberOf Stack
 */
Stack.prototype.clear = function () {
    this.__data__ = new ListCache
    this.size = 0
}

/**
 * Removes `key` and its value= require(the stack.);
 *
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
Stack.prototype.delete = function (key) {
    var data = this.__data__
    var result = data['delete'](key)

    this.size = data.size
    return result
}

/**
 * Gets the stack value for `key`.
 *
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
Stack.prototype.get = function (key) {
    return this.__data__.get(key)
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
Stack.prototype.has = function (key) {
    return this.__data__.has(key)
}

/**
 * Sets the stack `key` to `value`.
 *
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
Stack.prototype.set = function (key, value) {
    let data = this.__data__
    if (data instanceof ListCache) {
        var pairs = data.__data__
        if (pairs.length < LARGE_ARRAY_SIZE - 1) {
            pairs.push([key, value])
            this.size = ++data.size
            return this
        }
        data = this.__data__ = new MapCache(pairs)
    }
    data.set(key, value)
    this.size = data.size
    return this
}


module.exports = Stack;
