'use strict';

var bool = require('./bool');

/**
 * Return a random am/pm value.
 *
 * @returns {string} - A random am/pm value
 *
 * @example
 *      ampm(); => 'am'
 */
module.exports = function () {
    return bool() ? 'am' : 'pm';
};
