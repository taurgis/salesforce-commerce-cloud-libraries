var initOptions = require('./lib/initOptions');
var testRange = require('./lib/testRange');
var random = require('./lib/random');

/**
 * Generates random true or false.
 *
 * @param {Object} options - Possible options foor bool
 *
 * @returns {boolean} - Returns true or false
 *
 * @example
 *
 *      bool({ likelihood: 30 }) // => true
 */
module.exports = function (options) {
    // likelihood of success (true)
    var combinedOptions = initOptions(options, { likelihood: 50 });

    // Note, we could get some minor perf optimizations by checking range
    // prior to initializing defaults, but that makes code a bit messier
    // and the check more complicated as we have to check existence of
    // the object then existence of the key before checking constraints.
    // Since the options initialization should be minor computationally,
    // decision made for code cleanliness intentionally. This is mentioned
    // here as it's the first occurrence, will not be mentioned again.
    testRange(
        combinedOptions.likelihood < 0 || combinedOptions.likelihood > 100,
        'Chance: Likelihood accepts values from 0 to 100.'
    );

    return random(options.seed) * 100 < combinedOptions.likelihood;
};
