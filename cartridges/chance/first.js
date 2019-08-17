'use strict';

var initOptions = require('./lib/initOptions');
var pick = require('./lib/pickOne');
var firstNames = require('./lib/firstNames');
var gender = require('./gender');

/**
 * Return a random first name value.
 *
 * @param {Object} options - Possible options for first name
 * @returns {string} - A random first name value
 *
 * @example
 *      first({ gender: "female" }); => 'Emma'
 */
module.exports = function string(options) {
    var firstOptions = initOptions(options, { gender: gender(), nationality: 'en' });

    return pick(firstNames[firstOptions.gender.toLowerCase()][firstOptions.nationality.toLowerCase()]);
};
