'use strict';

var initOptions = require('./lib/initOptions');
var integer = require('./integer');
var n = require('./lib/n');
var ccType = require('./ccType');
var luhnCalculate = require('./lib/luhnCalculate');
/**
 * Return a random credit card number.
 *
 * @param {Object} options - Possible options for credit card
 * @returns {string} - A random credit card value
 *
 * @example
 *      cc({type: 'Mastercard'}); => '5171206237468496'
 */
module.exports = function (options) {
    var ccOptions = initOptions(options);

    var type; var number; var
        toGenerate;

    type = (options.type) ?
        ccType({ name: ccOptions.type, raw: true }) :
        ccType({ raw: true });

    number = type.prefix.split('');
    toGenerate = type.length - type.prefix.length - 1;

    // Generates n - 1 digits
    number = number.concat(n(integer, toGenerate, { min: 0, max: 9 }));

    // Generates the last digit according to Luhn algorithm
    number.push(luhnCalculate(number.join('')));

    return number.join('');
};
