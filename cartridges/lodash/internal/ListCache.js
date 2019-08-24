'use strict';

var assocIndexOf = require('./assocIndexOf');

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
    let index = -1
    var length = entries == null ? 0 : entries.length

    this.clear()
    while (++index < length) {
        var entry = entries[index]
        this.set(entry[0], entry[1])
    }
}

/**
 * Removes all key-value entries= require(the list cache.);
 *
 * @memberOf ListCache
 */
ListCache.prototype.clear = function () {
    this.__data__ = []
    this.size = 0
}

/**
 * Removes `key` and its value= require(the list cache.);
 *
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
ListCache.prototype.delete = function (key) {
    var data = this.__data__
    var index = assocIndexOf(data, key)

    if (index < 0) {
        return false
    }
    var lastIndex = data.length - 1
    if (index == lastIndex) {
        data.pop()
    } else {
        data.splice(index, 1)
    }
    --this.size
    return true
}

/**
 * Gets the list cache value for `key`.
 *
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
ListCache.prototype.get = function (key) {
    var data = this.__data__
    var index = assocIndexOf(data, key)
    return index < 0 ? undefined : data[index][1]
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
ListCache.prototype.has = function (key) {
    return assocIndexOf(this.__data__, key) > -1
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
ListCache.prototype.set = function (key, value) {
    var data = this.__data__
    var index = assocIndexOf(data, key)

    if (index < 0) {
        ++this.size
        data.push([key, value])
    } else {
        data[index][1] = value
    }
    return this
}


module.exports = ListCache;
