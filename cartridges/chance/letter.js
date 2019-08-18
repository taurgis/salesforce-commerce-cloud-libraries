'use strict';

var initOptions = require('./lib/initOptions');
var character = require('./character');
/**
 * Return a random letter value.
 *
 * @param {Object} options - Possible options for letter
 * @returns {Character} - A random character value
 *
 * @example
 *      letter(({ casing: 'lower' })); // => c
 */
module.exports = function (options) {
    var letterOptions = initOptions(options, { casing: 'lower' });
    var pool = 'abcdefghijklmnopqrstuvwxyz';
    var letterFromPool = character({ pool: pool });
    if (letterOptions.casing === 'upper') {
        letterFromPool = letterFromPool.toUpperCase();
    }
    return letterFromPool;
};
