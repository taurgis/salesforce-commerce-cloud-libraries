'use strict';

var asciiToArray = require('./asciiToArray');
var hasUnicode = require('./hasUnicode');
var unicodeToArray = require('./unicodeToArray');

/**
 * Converts `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function stringToArray(string) {
  return hasUnicode(string)
    ? unicodeToArray(string)
    : asciiToArray(string)
}

module.exports = stringToArray;
