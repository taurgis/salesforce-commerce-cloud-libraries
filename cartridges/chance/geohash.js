'use strict';

var initOptions = require('./lib/initOptions');
var string = require('./string');

/**
 * Return a random geohash value.
 *
 * @param {Object} options - Possible options for geohash
 * @returns {string} - A random geohash value
 *
 * @example
 *      geohash({ length: 5 }) => 'dr0kr'
 */
module.exports = function (options) {
    var geoHashOptions = initOptions(options, { length: 7 });
    return string({ length: geoHashOptions.length, pool: '0123456789bcdefghjkmnpqrstuvwxyz' });
};
