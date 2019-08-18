'use strict';

var word = require('./word');

/**
 * Return a random hashtag value.
 *
 * @returns {string} - A random hashtag value
 *
 * @example
 *      hashtag() => '#dichumwa'
 */
module.exports = function () {
    return '#' + word();
};
