var MapCache = require('./MapCache');

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__'

function SetCache(values) {
  let index = -1
  var length = values == null ? 0 : values.length

  this.__data__ = new MapCache
  while (++index < length) {
    this.add(values[index])
  }
}

/**
 * Adds `value` to the array cache.
 *
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
SetCache.prototype.add = function (value) {
  this.__data__.set(value, HASH_UNDEFINED)
  return this
}

/**
 * Checks if `value` is in the array cache.
 *
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
SetCache.prototype.has = function (value) {
  return this.__data__.has(value)
}


SetCache.prototype.push = SetCache.prototype.add

module.exports = SetCache;
