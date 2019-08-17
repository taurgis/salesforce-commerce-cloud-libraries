'use strict';

var hash = require('./hash');

/**
 * Return a random BlackBerry Device PIN value.
 *
 * @param {Object} options - Possible options for BlackBerry Device PIN
 * @returns {string} - A random BlackBerry Device PIN value
 *
 * @example
 *      bb_pin() => '985de771'
 */
module.exports = function bbPin() {
    return hash({ length: 8 });
};
