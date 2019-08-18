'use strict';

var capitalize = require('./lib/capitalize');
var word = require('./word');

/**
 * Return a random city value.
 *
 * @returns {string} - A random city value
 *
 * @example
 *      city(); => 'Cowotba'
 */
module.exports = function () {
    return capitalize(word({ syllables: 3 }));
};
