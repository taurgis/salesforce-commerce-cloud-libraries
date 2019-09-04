'use strict';


var Hash = require('./Hash');
var HashMap;

if (typeof Map === 'undefined') {
    HashMap = require('dw/util/HashMap');
} else {
    HashMap = Map;
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
    var type = typeof value;
    return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
        ? (value !== '__proto__')
        : (value === null);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData({ __data__ }, key) {
    var data = __data__;
    return isKeyable(key)
        ? data[typeof key == 'string' ? 'string' : 'hash']
        : data.map;
}
/**
 * The constructor of the MapCache
 * @param {[object]} entries - Items to add to the cache
 */
function MapCache(entries) {
    let index = -1;
    var length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
    }
}

/**
 * Removes all key-value entries= require(the map.);
 *
 * @memberOf MapCache
 */
MapCache.prototype.clear = function () {
    this.size = 0;
    this.__data__ = {
        hash: new Hash(),
        map: new HashMap(),
        string: new Hash()
    };
};

/**
 * Removes `key` and its value= require(the map.);
 *
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
MapCache.prototype.delete = function (key) {
    var result = getMapData(this, key).delete(key);
    this.size -= result ? 1 : 0;
    return result;
};

/**
 * Gets the map value for `key`.
 *
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
MapCache.prototype.get = function (key) {
    return getMapData(this, key).get(key);
};

/**
 * Checks if a map value for `key` exists.
 *
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
MapCache.prototype.has = function (key) {
    var map = getMapData(this, key);
    if (map.has) {
        return map.has(key);
    } else if (map.containsKey) {
        return map.containsKey(key);
    }
};

/**
 * Sets the map `key` to `value`.
 *
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
MapCache.prototype.set = function (key, value) {
    var map = getMapData(this, key);
    var size = map.size;

    if (map.set) {
        map.set(key, value);
    } else if (map.put) {
        map.put(key, value);
    }

    this.size += map.size == size ? 0 : 1;
    return this;
};


module.exports = MapCache;
