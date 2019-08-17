'use strict';

var initOptions = require('./lib/initOptions');
var pick = require('./lib/pickOne');
var lastNames = require('./lib/lastNames');

/**
 * Return a random last name value.
 *
 * @param {Object} options - Possible options for last name
 * @returns {string} - A random last name value
 *
 * @example
 *      last({ nationality: 'it' }); => 'Giovannini'
 */
module.exports = function last(options) {
    var lastOptions = initOptions(options, { nationality: '*' });

    if (lastOptions.nationality === '*') {
        var allLastNames = [];

        Object.keys(lastNames).forEach(function (key, i) {
            allLastNames = allLastNames.concat(lastNames[key]);
        });
        return pick(allLastNames);
    }

    return pick(lastNames[lastOptions.nationality.toLowerCase()]);
};
