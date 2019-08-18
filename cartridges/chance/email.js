'use strict';

var initOptions = require('./lib/initOptions');
var word = require('./word');
var domain = require('./domain');

/**
 * Return a random email value.
 *
 * @param {Object} options - Possible options for email
 * @returns {string} - A random email value
 *
 * @example
 *      email({domain: 'example.com'}) => 'giigjom@example.com'
 */
module.exports = function (options) {
    var emailOptions = initOptions(options);
    return word({ length: emailOptions.length }) + '@' + (emailOptions.domain || domain());
};
