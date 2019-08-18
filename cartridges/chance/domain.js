'use strict';

var initOptions = require('./lib/initOptions');
var word = require('./word');
var tld = require('./tld');
/**
 * Return a random domain value.
 *
 * @param {Object} options - Possible options for domain
 * @returns {string} - A random domain value
 *
 * @example
 *      domain({tld: 'ie'}) => 'gotaujo.ie'
 */
module.exports = function (options) {
    var domainOptions = initOptions(options);
    return word() + '.' + (domainOptions.tld || tld());
};
