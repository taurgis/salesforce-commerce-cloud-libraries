'use strict';

var floating = require('./floating');
var initOptions = require('./lib/initOptions');

/**
 * Return a random longitude value.
 *
 * @param {Object} options - Possible options for longitude
 * @returns {number} - A random longitude value
 *
 * @example
 *      longitude({fixed: 7}); => 51.4549925
 */
module.exports = function (options) {
    var longitudeOptions = initOptions(options, { fixed: 5, min: -180, max: 180 });
    return floating({ min: longitudeOptions.min, max: longitudeOptions.max, fixed: longitudeOptions.fixed });
};
