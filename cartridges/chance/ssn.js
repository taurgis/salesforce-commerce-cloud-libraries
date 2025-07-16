'use strict';

var initOptions = require('./lib/initOptions');
var string = require('./string');

/**
 * Return a random SSN value.
 *
 * @param {Object} options - Possible options for SSN
 * @returns {string} - A random SSN value
 *
 * @example
 *      ssn(); => '411-90-0070'
 */
module.exports = function (options) {
    var ssnOptions = initOptions(options, { ssnFour: false, dashes: true });
    var ssnPool = '1234567890';
    var ssn;
    var dash = ssnOptions.dashes ? '-' : '';

    if (!ssnOptions.ssnFour) {
        ssn = string({ pool: ssnPool, length: 3 }) + dash
            + string({ pool: ssnPool, length: 2 }) + dash
            + string({ pool: ssnPool, length: 4 });
    } else {
        ssn = string({ pool: ssnPool, length: 4 });
    }
    return ssn;
};
