'use strict';

var initOptions = require('./lib/initOptions');
var word = require('./word');
var capitalize = require('./lib/capitalize');
var streetSuffix = require('./streetSuffix');

/**
 * Return a random street value.
 *
 * @param {Object} options - Possible options for street
 * @returns {string} - A random street value
 *
 * @example
 *      street({syllables: 8}); => 'Teniefitinusewjircor Junction'
 */
module.exports = function (options) {
    var streetOptions = initOptions(options, { country: 'us', syllables: 2 });
    var street;

    switch (streetOptions.country.toLowerCase()) {
        case 'us':
            street = word({ syllables: streetOptions.syllables });
            street = capitalize(street);
            street += ' ';
            street += options.short_suffix ?
                streetSuffix(streetOptions).abbreviation :
                streetSuffix(streetOptions).name;
            break;
        case 'it':
            street = word({ syllables: options.syllables });
            street = capitalize(street);
            street = (options.short_suffix ?
                streetSuffix(streetOptions).abbreviation :
                streetSuffix(streetOptions).name) + ' ' + street;
            break;
        default:
            break;
    }
    return street;
};
