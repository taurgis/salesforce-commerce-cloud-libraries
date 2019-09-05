'use strict';

var asciiSize = require('./asciiSize');
var hasUnicode = require('./hasUnicode');
var unicodeSize = require('./unicodeSize');

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
