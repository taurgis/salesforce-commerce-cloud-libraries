var initOptions = require('./lib/initOptions');
var testRange = require('./lib/testRange');
var natural = require('./natural');
var capitalize = require('./lib/capitalize');
var syllable = require('./syllable');
/**
 * Return a random word value.
 *
 * @param {Object} options - Possible options for word
 * @returns {string} - A random word value
 *
 * @example
 *      word({ length: 5 }); // => 'ralve'
 */
module.exports = function word(options) {
    var wordOptions = initOptions(options);

    testRange(
        wordOptions.syllables && wordOptions.length,
        'Chance: Cannot specify both syllables AND length.'
    );

    var syllables = wordOptions.syllables || natural({ min: 1, max: 3 });
    var text = '';

    if (wordOptions.length) {
        // Either bound word by length
        do {
            text += syllable();
        } while (text.length < wordOptions.length);
        text = text.substring(0, wordOptions.length);
    } else {
        // Or by number of syllables
        for (var i = 0; i < syllables; i++) {
            text += syllable();
        }
    }

    if (wordOptions.capitalize) {
        text = capitalize(text);
    }

    return text;
};
