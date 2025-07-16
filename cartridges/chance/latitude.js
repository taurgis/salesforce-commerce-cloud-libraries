'use strict';

var floating = require('./floating');
var initOptions = require('./lib/initOptions');

/**
 * Return a random latitude value.
 *
 * @param {Object} options - Possible options for latitude
 * @returns {number} - A random latitude value
 *
 * @example
 *      latitude({fixed: 7}); => -29.6443133
 */
module.exports = function (options) {
    var latitudeOptions = initOptions(options, { fixed: 5, min: -90, max: 90 });
    return floating({ min: latitudeOptions.min, max: latitudeOptions.max, fixed: latitudeOptions.fixed });
};
