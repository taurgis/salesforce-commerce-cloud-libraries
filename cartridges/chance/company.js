'use strict';

var pick = require('./lib/pickOne');
var companies = require('./lib/companies');

/**
 * Return a random company value.
 *
 * @returns {string} - A random company value
 *
 * @example
 *      company() => 'Caremark Rx Inc'
 */
module.exports = function () {
    return pick(companies);
};
