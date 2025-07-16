'use strict';

var initOptions = require('./lib/initOptions');
var natural = require('./natural');
var street = require('./street');

/**
 * Return a random address value.
 *
 * @param {Object} options - Possible options for address
 * @returns {string} - A random address value
 *
 * @example
 *      address({short_suffix: true}); => '536 Baner Rd'
 */
module.exports = function (options) {
    var addressOptions = initOptions(options);
    return natural({ min: 5, max: 2000 }) + ' ' + street(addressOptions);
};
