'use strict';

var minute = require('./minute');

/**
 * Return a random second value.
 *
 * @param {Object} options - Possible options for second
 * @returns {integer} - A random second value
 *
 * @example
 *      second(); // => 19
 */
module.exports = function (options) {
    return minute(options);
};
