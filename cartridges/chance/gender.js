'use strict';

var initOptions = require('./lib/initOptions');
var pick = require('./lib/pickOne');

/**
 * Return a random gender value.
 *
 * @param {Object} options - Possible options for gender
 * @returns {string} - A random gender value
 *
 * @example
 *      gender(); => 'Female'
 */
module.exports = function (options) {
    var genderOptions = initOptions(options, { extraGenders: [] });
    return pick(['Male', 'Female'].concat(genderOptions.extraGenders));
};
