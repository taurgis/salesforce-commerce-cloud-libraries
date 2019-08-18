'use strict';

var initOptions = require('./lib/initOptions');
var pick = require('./lib/pickOne');
var countries = require('./lib/countries');

/**
 * Return a random country value.
 *
 * @param {Object} options - Possible options for country
 * @returns {string} - A random country value
 *
 * @example
 *      country({ full: true }); => 'Venezuela'
 */
module.exports = function (options) {
    var countryOptions = initOptions(options);
    var country = pick(countries);
    return countryOptions.raw ? country : (countryOptions.full ? country.name : country.abbreviation); // eslint-disable-line
};
