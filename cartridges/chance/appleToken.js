'use strict';

var string = require('./string');

/**
 * Return a random Apple token value.
 *
 * @param {Object} options - Possible options for Apple token
 * @returns {string} - A random Apple token value
 *
 * @example
 *      apple_token() => 'b50edac575bfba07dd019b28b2af7189a3ddda17c806ef14a9abbfd00533f67e'
 */
module.exports = function appleToken() {
    return string({ pool: 'abcdef1234567890', length: 64 });
};
