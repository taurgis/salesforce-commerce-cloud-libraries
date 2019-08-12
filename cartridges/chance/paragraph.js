var initOptions = require('./lib/initOptions');
var natural = require('./natural');
var n = require('./lib/n');
var sentence = require('./sentence');

/**
 * Return a random paragraph value.
 *
 * @param {Object} options - Possible options for paragraph
 * @returns {string} - A random paragraph value
 *
 * @example
 *      paragraph({ sentences: 1 }) // => 'Idefeulo foc omoemowa wahteze liv juvde puguprof epehuji upuga zige odfe igo sit pilamhul oto ukurecef.'
 */
module.exports = function paragraph(options) {
    var paragraphOptions = initOptions(options);

    var sentences = paragraphOptions.sentences || natural({ min: 3, max: 7 });
    var sentenceArray = n(sentence, sentences);

    return sentenceArray.join(' ');
};
