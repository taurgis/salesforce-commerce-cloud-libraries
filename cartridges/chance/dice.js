'use strict';

var natural = require('./natural');

/**
 * Return a random dice value.
 *
 * @param {Integer} range - Range for the dice
 * @returns {integer} - A random dice value
 *
 * @example
 *      dice(20); => 13
 */
module.exports = function (range) {
    var diceOptions = { min: 1, max: range || 6 };

    return natural(diceOptions);
};
