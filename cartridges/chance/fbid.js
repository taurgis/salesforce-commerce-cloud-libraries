'use strict';

var string = require('./string');

/**
 * Return a random Facebook ID value.
 *
 * @returns {string} - A random Facebook ID value
 *
 * @example
 *      fbid() => "1000039460258605"
 */
module.exports = function () {
    return '10000' + string({ pool: '1234567890', length: 11 });
};
