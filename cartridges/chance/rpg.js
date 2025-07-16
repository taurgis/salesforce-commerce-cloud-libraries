'use strict';

var initOptions = require('./lib/initOptions');
var natural = require('./natural');

/**
 * Return a random rpg value.
 *
 * @param {string} thrown - The thrown value
 * @param {Object} options - Possible options for rpg
 * @returns {[integer]} - A random rpg value
 *
 * @example
 *      rpg('5d6'); => [3, 1, 2, 5, 2]
 */
module.exports = function (thrown, options) {
    var rpgOptions = initOptions(options);

    if (!thrown) {
        throw new RangeError('Chance: A type of die roll must be included');
    } else {
        var bits = thrown.toLowerCase().split('d');
        var rolls = [];

        if (bits.length !== 2 || !parseInt(bits[0], 10) || !parseInt(bits[1], 10)) {
            throw new Error('Chance: Invalid format provided. Please provide #d# where the first # is the number of dice to roll, the second # is the max of each die');
        }
        for (var i = bits[0]; i > 0; i--) {
            rolls[i - 1] = natural({ min: 1, max: bits[1] });
        }
        return (typeof rpgOptions.sum !== 'undefined' && rpgOptions.sum) ? rolls.reduce(function (p, c) { return p + c; }) : rolls;
    }
};
