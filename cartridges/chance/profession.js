'use strict';

var initOptions = require('./lib/initOptions');
var pick = require('./lib/pickOne');
var professions = require('./lib/professions');

/**
 * Return a random profession value.
 *
 * @param {Object} options - Possible options for profession
 * @returns {string} - A random profession value
 *
 * @example
 *      profession({rank: true}) => 'Junior Supply Chain Director'
 */
module.exports = function (options) {
    var professionOptions = initOptions(options);
    if (professionOptions.rank) {
        return pick(['Apprentice ', 'Junior ', 'Senior ', 'Lead ']) + pick(professions);
    }
    return pick(professions);
};
