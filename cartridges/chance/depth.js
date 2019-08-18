'use strict';

var initOptions = require('./lib/initOptions');
var floating = require('./floating');


/**
 * Return a random depth value.
 *
 * @param {Object} options - Possible options for depth
 * @returns {number} - A random depth value
 *
 * @example
 *      depth({ min: -1000 }) => -718.41976
 */
module.exports = function (options) {
    var depthOptions = initOptions(options, { fixed: 5, min: -10994, max: 0 });
    return floating({
        min: depthOptions.min,
        max: depthOptions.max,
        fixed: depthOptions.fixed
    });
};
