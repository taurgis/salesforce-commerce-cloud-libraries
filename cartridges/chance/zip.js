'use strict';

var n = require('./lib/n');
var natural = require('./natural');

/**
 * Return a random zip value.
 *
 * @param {Object} options - Possible options for zip
 * @returns {string} - A random zip value
 *
 * @example
 *      zip({plusfour: true}); => '01035-1838'
 */
module.exports = function (options) {
    var zip = n(natural, 5, { max: 9 });

    if (options && options.plusfour === true) {
        zip.push('-');
        zip = zip.concat(n(natural, 4, { max: 9 }));
    }

    return zip.join('');
};
