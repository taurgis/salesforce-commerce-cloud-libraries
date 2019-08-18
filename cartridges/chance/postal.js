'use strict';

var natural = require('./natural');
var character = require('./character');

/**
 * Return a random Canadian Postal code value.
 *
* @returns {string} - A random Canadian Postal code value
 *
 * @example
 *      postal(); => 'R1S 3F4'
 */
module.exports = function () {
    // Postal District
    var pd = character({ pool: 'XVTSRPNKLMHJGECBA' });
    // Forward Sortation Area (FSA)
    var fsa = pd + natural({ max: 9 }) + character({ alpha: true, casing: 'upper' });
    // Local Delivery Unut (LDU)
    var ldu = natural({ max: 9 }) + character({ alpha: true, casing: 'upper' }) + natural({ max: 9 });

    return fsa + ' ' + ldu;
};
