'use strict';

var date = require('./date');

/**
 * Return a random hammertime value.
 *
 * @param {Object} options - Possible options for hammertime
 * @returns {integer} - A random hammertime value
 *
 * @example
 *      hammertime(); => 2273327300317
 */
module.exports = function (options) {
    return date(options).getTime();
};
