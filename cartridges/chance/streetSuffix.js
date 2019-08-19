'use strict';

var initOptions = require('./lib/initOptions');
var streetSuffixes = require('./lib/streetSuffixes');
var pick = require('./lib/pickOne');

/**
 * Return a random street suffix value.
 *
 * @param {Object} options - Possible options for street suffix
 * @returns {Object} - A random street suffix value
 *
 * @example
 *      streetSuffix({country: 'us'}); => { name: 'Avenue', abbreviation: 'Ave' }
 */
module.exports = function (options) {
    var suffixOptions = initOptions(options, { country: 'us' });
    return pick(streetSuffixes[suffixOptions.country.toLowerCase()]);
};
