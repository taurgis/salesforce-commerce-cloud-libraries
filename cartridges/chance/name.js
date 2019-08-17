'use strict';

var initOptions = require('./lib/initOptions');
var first = require('./first');
var last = require('./last');
var character = require('./character');
var prefix = require('./prefix');
var suffix = require('./suffix');

/**
 * Return a random name value.
 *
 * @param {Object} options - Possible options for name
 * @returns {string} - A random name value
 *
 * @example
 *      name({ middle: true }); => 'Nelgatwu Powuku Heup'
 */
module.exports = function name(options) {
    var nameOptions = initOptions(options);

    var firstName = first(nameOptions);
    var lastName = last(nameOptions);
    var nameResult;

    if (nameOptions.middle) {
        nameResult = firstName + ' ' + first(nameOptions) + ' ' + lastName;
    } else if (nameOptions.middle_initial) {
        nameResult = firstName + ' ' + character({ alpha: true, casing: 'upper' }) + '. ' + lastName;
    } else {
        nameResult = firstName + ' ' + lastName;
    }

    if (nameOptions.prefix) {
        nameResult = prefix(options) + ' ' + nameResult;
    }

    if (nameOptions.suffix) {
        nameResult = nameResult + ' ' + suffix(nameOptions);
    }

    return nameResult;
};
