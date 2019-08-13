'use strict';

var initOptions = require('./lib/initOptions');
var testRange = require('./lib/testRange');
var natural = require('./natural');
var character = require('./character');
var n = require('./lib/n');

/**
 * Return a random string value.
 *
 * @param {Object} options - Possible options for string
 * @returns {string} - A random string value
 *
 * @example
 *      string({ pool: 'abcde' }); // => 'cccdeeabedebb'
 */
module.exports = function string(options) {
    var stringOptions = initOptions(options, { length: natural({ min: 5, max: 20 }) });
    testRange(stringOptions.length < 0, 'Chance: Length cannot be less than zero.');
    var length = stringOptions.length;
    var text = n(character, length, stringOptions);

    return text.join('');
};
