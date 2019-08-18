'use strict';

var natural = require('./natural');
var character = require('./character');
var pick = require('./lib/pickOne');
var bool = require('./bool');
var postcodeAreas = require('./lib/postcodeAreas');

/**
 * Return a random UK Postal code value.
 *
* @returns {string} - A random UK Postal code value
 *
 * @example
 *      postcode(); => 'W6 9PF'
 */
module.exports = function () {
    // Area
    var area = pick(postcodeAreas).code;
    // District
    var district = natural({ max: 9 });
    // Sub-District
    var subDistrict = bool() ? character({ alpha: true, casing: 'upper' }) : '';
    // Outward Code
    var outward = area + district + subDistrict;
    // Sector
    var sector = natural({ max: 9 });
    // Unit
    var unit = character({ alpha: true, casing: 'upper' }) + character({ alpha: true, casing: 'upper' });
    // Inward Code
    var inward = sector + unit;

    return outward + ' ' + inward;
};
