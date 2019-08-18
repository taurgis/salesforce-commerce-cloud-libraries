'use strict';

var natural = require('./natural');

/**
 * Return a random Klout value.
 *
 * @returns {integer} - A random Klout value
 *
 * @example
 *      klout() => 21
 */
module.exports = function () {
    return natural({ min: 1, max: 99 });
};
