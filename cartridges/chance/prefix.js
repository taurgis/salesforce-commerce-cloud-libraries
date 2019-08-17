'use strict';

var initOptions = require('./lib/initOptions');
var pick = require('./lib/pickOne');
var prefixes = require('./lib/prefixes');

/**
 * Return a random prefix value.
 *
 * @param {Object} options - Possible options for prefix
 * @returns {string} - A random prefix value
 *
 * @example
 *      prefix({ full: true }); => 'Mister'
 */
module.exports = function prefix(options) {
    var prefixOptions = initOptions(options, { gender: 'all' });
    return prefixOptions.full ?
        pick(prefixes(prefixOptions.gender)).name :
        pick(prefixes(prefixOptions.gender)).abbreviation;
};
