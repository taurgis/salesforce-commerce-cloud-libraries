'use strict';

var hash = require('./hash');

/**
 * Return a random BlackBerry Device PIN value.
 *
 * @returns {string} - A random BlackBerry Device PIN value
 *
 * @example
 *      bb_pin() => '985de771'
 */
module.exports = function () {
    return hash({ length: 8 });
};
