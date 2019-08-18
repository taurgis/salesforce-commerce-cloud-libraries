'use strict';

var n = require('./lib/n');
var hash = require('./hash');

/**
 * Return a random IP Address value.
 *
 * @returns {string} - A random IP Address value
 *
 * @example
 *      ipv6() => 'db2f:6123:f99e:00f7:a76e:7f68:9f91:bb08'
 */
module.exports = function () {
    var ipAddr = n(hash, 8, { length: 4 });

    return ipAddr.join(':');
};
