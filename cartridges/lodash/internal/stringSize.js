'use strict';

var asciiSize = require('./asciiSize.js');
var hasUnicode = require('./hasUnicode.js');
var unicodeSize = require('./unicodeSize.js');

/**
 * Gets the number of symbols in `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the string size.
 */
function stringSize(string) {
    return hasUnicode(string) ? unicodeSize(string) : asciiSize(string);
}

module.exports = stringSize;
