'use strict';

var initOptions = require('./lib/initOptions');
var pick = require('./lib/pickOne');
var domain = require('./domain');
var word = require('./word');

/**
 * Return a random URL value.
 *
 * @param {Object} options - Possible options for URL
 * @returns {string} - A random URL value
 *
 * @example
 *      url({protocol: 'ftp'}) => 'ftp://mibfu.nr/kardate'
 */
module.exports = function (options) {
    var urlOptions = initOptions(options, {
        protocol: 'http', domain: domain(options), domain_prefix: '', path: word(), extensions: []
    });

    var extension = urlOptions.extensions.length > 0 ? '.' + pick(urlOptions.extensions) : '';
    var resultDomain = urlOptions.domain_prefix ? urlOptions.domain_prefix + '.' + urlOptions.domain : urlOptions.domain;

    return urlOptions.protocol + '://' + resultDomain + '/' + urlOptions.path + extension;
};
