var initOptions = require('./lib/initOptions');
var natural = require('./natural');
var NUMBERS = '0123456789';
var CHARS_LOWER = 'abcdefghijklmnopqrstuvwxyz';
var CHARS_UPPER = CHARS_LOWER.toUpperCase();

/**
 * Return a random character value.
 *
 * @param {Object} options - Possible options for character
 * @returns {Character} - A random character value
 *
 * @example
 *      character(({ casing: 'lower' })); // => 'c'
 */
module.exports = function character(options) {
    var characterOptions = initOptions(options);

    var symbols = '!@#$%^&*()[]';
    var letters; var
        pool;

    if (characterOptions.casing === 'lower') {
        letters = CHARS_LOWER;
    } else if (characterOptions.casing === 'upper') {
        letters = CHARS_UPPER;
    } else {
        letters = CHARS_LOWER + CHARS_UPPER;
    }

    if (characterOptions.pool) {
        pool = characterOptions.pool;
    } else {
        pool = '';
        if (characterOptions.alpha) {
            pool += letters;
        }
        if (characterOptions.numeric) {
            pool += NUMBERS;
        }
        if (characterOptions.symbols) {
            pool += symbols;
        }
        if (!pool) {
            pool = letters + NUMBERS + symbols;
        }
    }

    return pool.charAt(natural({ max: (pool.length - 1) }));
};
