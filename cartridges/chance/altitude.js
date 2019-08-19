'use strict';

var floating = require('./floating');
var initOptions = require('./lib/initOptions');

/**
 * Return a random altitude value.
 *
 * @param {Object} options - Possible options for altitude
 * @returns {number} - A random altitude value
 *
 * @example
 *      altitude({ fixed: 7 }) => 6897.8978386
 */
module.exports = function (options) {
    var altitudeOptions = initOptions(options, { fixed: 5, min: 0, max: 8848 });
    return floating({
        min: altitudeOptions.min,
        max: altitudeOptions.max,
        fixed: altitudeOptions.fixed
    });
};
