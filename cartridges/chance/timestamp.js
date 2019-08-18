'use strict';

var natural = require('./natural');

/**
 * Return a random timestamp value.
 *
 * @returns {integer} - A random timestamp value
 *
 * @example
 *      timestamp(); => 576556683
 */
module.exports = function () {
    return natural({ min: 1, max: parseInt(new Date().getTime() / 1000, 10) });
};
