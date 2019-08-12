var initOptions = require('./lib/initOptions');
var testRange = require('./lib/testRange');
var integer = require('./integer');

var MAX_INT = Number(9007199254740992);

/**
 * Return a random natural value.
 *
 * @param {Object} options - Possible options for natural
 * @returns {number} - A random natural value
 *
 * @example
 *      natural({ min: 1, max: 20 }); // => 20
 */
module.exports = function natural(options) {
    var naturalOptions = initOptions(options, { min: 0, max: MAX_INT });
    if (typeof naturalOptions.numerals === 'number') {
        testRange(options.numerals < 1, 'Chance: Numerals cannot be less than one.');
        naturalOptions.min = Math.pow(10, options.numerals - 1);
        naturalOptions.max = Math.pow(10, options.numerals) - 1;
    }
    testRange(naturalOptions.min < 0, 'Chance: Min cannot be less than zero.');

    if (naturalOptions.exclude) {
        testRange(!Array.isArray(naturalOptions.exclude), 'Chance: exclude must be an array.');

        naturalOptions.exclude.forEach(function (exclusion) {
            testRange(!Number.isInteger(exclusion), 'Chance: exclude must be numbers.');
        });

        let random = options.min + natural({ max: naturalOptions.max - naturalOptions.min - naturalOptions.exclude.length });
        options.exclude.sort().forEach(function (exclusionKeySort) {
            if (random < exclusionKeySort) {
                return;
            }
            random++;
        });
        return random;
    }
    return integer(naturalOptions);
};
