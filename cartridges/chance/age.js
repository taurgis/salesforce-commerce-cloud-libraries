'use strict';

var initOptions = require('./lib/initOptions');
var natural = require('./natural');

/**
 * Return a random age value.
 *
 * @param {Object} options - Possible options for age
 * @returns {integer} - A random age value
 *
 * @example
 *      age({ type: 'child' }); // => 9
 */
module.exports = function age(options) {
    var ageOptions = initOptions(options);
    var ageRange;

    switch (ageOptions.type) {
        case 'child':
            ageRange = { min: 0, max: 12 };
            break;
        case 'teen':
            ageRange = { min: 13, max: 19 };
            break;
        case 'adult':
            ageRange = { min: 18, max: 65 };
            break;
        case 'senior':
            ageRange = { min: 65, max: 100 };
            break;
        case 'all':
            ageRange = { min: 0, max: 100 };
            break;
        default:
            ageRange = { min: 18, max: 65 };
            break;
    }

    return natural(ageRange);
};
