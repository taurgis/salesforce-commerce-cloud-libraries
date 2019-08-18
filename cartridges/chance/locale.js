'use strict';

var initOptions = require('./lib/initOptions');
var pick = require('./lib/pickOne');
var regions = require('./lib/regions');
var languages = require('./lib/languages');

/**
 * Return a random locale value.
 *
 * @param {Object} options - Possible options for locale
 * @returns {string} - A random locale value
 *
 * @example
 *      locale({region: true}); => 'es-EA'
 */
module.exports = function (options) {
    var localeOptions = initOptions(options);
    if (localeOptions.region) {
        return pick(regions);
    }

    return pick(languages);
};
