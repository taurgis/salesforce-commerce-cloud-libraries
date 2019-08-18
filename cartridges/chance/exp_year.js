'use strict';

var year = require('./year');

/**
 * Return a random expiry year value.
 *
 * @returns {string} - A random expiry year value
 *
 * @example
 *      exp_year(); => '2018'
 */
module.exports = function () {
    var curMonth = new Date().getMonth() + 1;
    var curYear = new Date().getFullYear();

    return year({ min: ((curMonth === 12) ? (curYear + 1) : curYear), max: (curYear + 10) });
};
