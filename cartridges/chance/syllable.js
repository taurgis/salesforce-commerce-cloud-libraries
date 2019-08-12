var initOptions = require('./lib/initOptions');
var natural = require('./natural');
var capitalize = require('./lib/capitalize');
var character = require('./character');

/**
 * Return a random sylable value.
 *
 * @param {Object} options - Possible options for sylable
 * @returns {string} - A random sylable value
 *
 * @example
 *     syllable(); // => 'fop'
 */
module.exports = function syllable(options) {
    var syllableOptions = initOptions(options);

    var length = syllableOptions.length || natural({ min: 2, max: 3 });
    var consonants = 'bcdfghjklmnprstvwz'; // consonants except hard to speak ones
    var vowels = 'aeiou'; // vowels
    var all = consonants + vowels; // all
    var text = '';
    var chr;

    // I'm sure there's a more elegant way to do this, but this works
    // decently well.
    for (var i = 0; i < length; i++) {
        if (i === 0) {
            // First character can be anything
            chr = character({ pool: all });
        } else if (consonants.indexOf(chr) === -1) {
            // Last character was a vowel, now we want a consonant
            chr = character({ pool: consonants });
        } else {
            // Last character was a consonant, now we want a vowel
            chr = character({ pool: vowels });
        }

        text += chr;
    }

    if (syllableOptions.capitalize) {
        text = capitalize(text);
    }

    return text;
};
