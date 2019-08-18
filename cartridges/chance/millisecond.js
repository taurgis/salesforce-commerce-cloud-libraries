'use strict';

var natural = require('./natural');

/**
 * Return a random millisecond value.
 *
 * @param {Object} options - Possible options for millisecond
 * @returns {integer} - A random millisecond value
 *
 * @example
 *      millisecond(); // => 735
 */
module.exports = function () {
    return natural({ max: 999 });
};
