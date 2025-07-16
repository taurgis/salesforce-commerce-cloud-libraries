'use strict';

var initOptions = require('./lib/initOptions');
var pick = require('./lib/pickOne');
var suffixes = require('./lib/suffixes');

/**
 * Return a random suffix value.
 *
 * @param {Object} options - Possible options for suffix
 * @returns {string} - A random suffix value
 *
 * @example
 *      suffix({ full: true }); => 'Juris Doctor'
 */
module.exports = function (options) {
    var suffixOptions = initOptions(options);

    return suffixOptions.full
        ? pick(suffixes).name
        : pick(suffixes).abbreviation;
};
