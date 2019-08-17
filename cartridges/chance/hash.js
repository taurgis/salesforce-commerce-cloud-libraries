'use strict';

var initOptions = require('./lib/initOptions');
var string = require('./string');

var NUMBERS = '0123456789';
var HEX_POOL = NUMBERS + 'abcdef';

/**
 * Return a random hash value.
 *
 * @param {Object} options - Possible options for hash
 * @returns {string} - A random hash value
 *
 * @example
 *      hash({casing: 'upper'}) => '3F2EB3FB85D88984C1EC4F46A3DBE740B5E0E56E'
 */
module.exports = function hash(options) {
    var hashOptions = initOptions(options, { length: 40, casing: 'lower' });
    var pool = hashOptions.casing === 'upper' ? HEX_POOL.toUpperCase() : HEX_POOL;
    return string({ pool: pool, length: hashOptions.length });
};
