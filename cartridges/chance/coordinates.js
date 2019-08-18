'use strict';

var latitude = require('./latitude');
var longitude = require('./longitude');

/**
 * Return a random coordinate value.
 *
 * @param {Object} options - Possible options for coordinate
 * @returns {string} - A random coordinate value
 *
 * @example
 *      coordinates({fixed: 2}); => "-49.16, 68.81"
 */
module.exports = function (options) {
    return latitude(options) + ', ' + longitude(options);
};
