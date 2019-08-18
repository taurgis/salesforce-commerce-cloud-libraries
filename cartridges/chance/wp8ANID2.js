'use strict';

var hash = require('./hash');
var Encoding = require('dw/crypto/Encoding');
var Bytes = require('dw/util/Bytes');

/**
 * Return a random Windows Phone 8 ANID2 value.
 *
 * @returns {string} - A random Windows Phone 8 ANID2 value
 *
 * @example
 *      wp8_anid2() => 'OGI5ODk0MmNkZGI2OGE3YzAwODE1Y2NiYTc4MzEzZjM='
 */
module.exports = function wp8ANID2() {
    return Encoding.toBase64(new Bytes(hash({ length: 32 })));
};
