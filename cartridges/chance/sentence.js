var initOptions = require('./lib/initOptions');
var n = require('./lib/n');
var natural = require('./natural');
var word = require('./word');
var capitalize = require('./lib/capitalize');

/**
 * Return a random sentence value.
 *
 * @param {Object} options - Possible options for sentence
 * @returns {string} - A random sentence value
 *
 * @example
 *      sentence({ words: 5 }); // => 'Waddik jeasmov cakgilta ficub up.'
 */
module.exports = function sentence(options) {
    var sentenceOptions = initOptions(options);

    var words = sentenceOptions.words || natural({ min: 12, max: 18 });
    var punctuation = sentenceOptions.punctuation;
    var text;
    var wordArray = n(word, words);

    text = wordArray.join(' ');

    // Capitalize first letter of sentence
    text = capitalize(text);

    // Make sure punctuation has a usable value
    if (punctuation !== false && !/^[\.\?;!:]$/.test(punctuation)) {
        punctuation = '.';
    }

    // Add punctuation mark
    if (punctuation) {
        text += punctuation;
    }

    return text;
};
