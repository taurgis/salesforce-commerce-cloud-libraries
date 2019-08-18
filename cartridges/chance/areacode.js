'use strict';

var initOptions = require('./lib/initOptions');
var natural = require('./natural');

/**
 * Return a random area code value.
 *
 * @param {Object} options - Possible options for area code
 * @returns {string} - A random area code value
 *
 * @example
 *      areacode() => '(526)'
 */
module.exports = function (options) {
    var areaCodeOptions = initOptions(options, { parens: true });

    // Don't want area codes to start with 1, or have a 9 as the second digit
    var areacode = natural({ min: 2, max: 9 }).toString() +
            natural({ min: 0, max: 8 }).toString() +
            natural({ min: 0, max: 9 }).toString();

    return areaCodeOptions.parens ? '(' + areacode + ')' : areacode;
};
