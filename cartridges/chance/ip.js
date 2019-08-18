'use strict';

var natural = require('./natural');

/**
 * Return a random IP Address value.
 *
 * @returns {string} - A random IP Address value
 *
 * @example
 *      ip() => '153.208.102.234'
 */
module.exports = function () {
    // Todo: This could return some reserved IPs. See http://vq.io/137dgYy
    // this should probably be updated to account for that rare as it may be
    return natural({ min: 1, max: 254 }) + '.' +
               natural({ max: 255 }) + '.' +
               natural({ max: 255 }) + '.' +
               natural({ min: 1, max: 254 });
};
