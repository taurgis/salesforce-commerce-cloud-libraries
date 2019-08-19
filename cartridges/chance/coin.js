'use strict';

var bool = require('./bool');

/**
 * Return a random coin value.
 *
 * @returns {string} - A random coin value
 *
 * @example
 *      coin(); => 'tails'
 */
module.exports = function () {
    return bool() ? 'heads' : 'tails';
};
