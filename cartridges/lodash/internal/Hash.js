'use strict';

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * The Hash class
 * @param {[object]} entries - The entries
 */
function Hash(entries) {
    let index = -1;
    var length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
    }
}

/**
 * Removes all key-value entries= require(the hash.);
 *
 * @memberOf Hash
 */
Hash.prototype.clear = function () {
    this.__data__ = Object.create(null);
    this.size = 0;
};

/**
 * Removes `key` and its value= require(the hash.);
 *
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
Hash.prototype.delete = function (key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
};

/**
 * Gets the hash value for `key`.
 *
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
Hash.prototype.get = function (key) {
    var data = this.__data__;
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
};

/**
 * Checks if a hash value for `key` exists.
 *
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
Hash.prototype.has = function (key) {
    var data = this.__data__;
    return data[key] !== undefined;
};

/**
 * Sets the hash `key` to `value`.
 *
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
Hash.prototype.set = function (key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = value === undefined ? HASH_UNDEFINED : value;
    return this;
};

module.exports = Hash;
