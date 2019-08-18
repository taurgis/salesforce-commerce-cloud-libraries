'use strict';

var dollar = require('./dollar');

/**
 * Return a random euro value.
 *
 * @param {Object} options - Possible options for euro
 * @returns {string} - A random euro value
 *
 * @example
 *      euro({max: 20}); => "15,23€"
 */
module.exports = function (options) {
    return Number(dollar(options).replace('$', '')).toLocaleString() + '€';
};
