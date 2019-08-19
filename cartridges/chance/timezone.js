'use strict';

var pick = require('./lib/pickOne');
var timezones = require('./lib/timezones');

/**
 * Return a random timezone value.
 *
 * @returns {Object} - A random timezone value
 *
 * @example
 *      hammertime(); => 2273327300317
 */
module.exports = function () {
    return pick(timezones);
};
