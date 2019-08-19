'use strict';

var pad = require('./lib/pad');
var natural = require('./natural');

/**
 * Return a random Google Analytics ID value.
 *
 * @returns {string} - A random  Google Analytics ID value
 *
 * @example
 *      google_analytics() => 'UA-384555-17'
 */
module.exports = function () {
    var account = pad(natural({ max: 999999 }), 6);
    var property = pad(natural({ max: 99 }), 2);

    return 'UA-' + account + '-' + property;
};
