'use strict';

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff'
var rsComboMarksRange = '\\u0300-\\u036f'
var reComboHalfMarksRange = '\\ufe20-\\ufe2f'
var rsComboSymbolsRange = '\\u20d0-\\u20ff'
var rsComboMarksExtendedRange = '\\u1ab0-\\u1aff'
var rsComboMarksSupplementRange = '\\u1dc0-\\u1dff'
var rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange + rsComboMarksExtendedRange + rsComboMarksSupplementRange
var rsVarRange = '\\ufe0e\\ufe0f'

/** Used to compose unicode capture groups. */
var rsAstral = '[' + rsAstralRange + ']';
var rsCombo = '[' + rsComboRange + ']';
var rsFitz = '\\ud83c[\\udffb-\\udfff]';
var rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')';
var rsNonAstral = '[^' + rsAstralRange + ']';
var rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}'
var rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]'
var rsZWJ = '\\u200d'

/** Used to compose unicode regexes. */
var reOptMod = rsModifier + '?';
var rsOptVar = '[' + rsVarRange + ']?';
var rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod +')*';
var rsSeq = rsOptVar + reOptMod + rsOptJoin;
var rsNonAstralCombo = rsNonAstral + rsCombo + '?';
var rsSymbol = '(?:' + [rsNonAstralCombo, rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g')

/**
 * Gets the size of a Unicode `string`.
 *
 * @private
 * @param {string} string The string inspect.
 * @returns {number} Returns the string size.
 */
function unicodeSize(string) {
  let result = reUnicode.lastIndex = 0
  while (reUnicode.test(string)) {
    ++result
  }
  return result
}

module.exports = unicodeSize;
