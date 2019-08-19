'use strict';

var word = require('./word');

/**
 * Return a random Twitter handle value.
 *
 * @returns {string} - A random Twitter handle value
 *
 * @example
 *      twitter() => "@guspejani"
 */
module.exports = function () {
    return '@' + word();
};
