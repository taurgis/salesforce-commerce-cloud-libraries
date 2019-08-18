'use strict';

var initOptions = require('./lib/initOptions');
var natural = require('./natural');
var n = require('./lib/n');

/**
 * Return a random Brazillian tax id value.
 *
 * @param {Object} options - Possible options for cpf
 * @returns {string} - A random cpf value
 *
 * @example
 *      cpf(); => '607.116.899-62'
 */
module.exports = function (options) {
    var cpfOptions = initOptions(options, {
        formatted: true
    });

    var nResult = n(natural, 9, { max: 9 });
    var d1 = nResult[8] * 2 + nResult[7] * 3 + nResult[6] * 4 + nResult[5] * 5 + nResult[4] * 6 + nResult[3] * 7 + nResult[2] * 8 + nResult[1] * 9 + nResult[0] * 10;
    d1 = 11 - (d1 % 11);
    if (d1 >= 10) {
        d1 = 0;
    }
    var d2 = d1 * 2 + nResult[8] * 3 + nResult[7] * 4 + nResult[6] * 5 + nResult[5] * 6 + nResult[4] * 7 + nResult[3] * 8 + nResult[2] * 9 + nResult[1] * 10 + nResult[0] * 11;
    d2 = 11 - (d2 % 11);
    if (d2 >= 10) {
        d2 = 0;
    }
    var cpfNumber = '' + nResult[0] + nResult[1] + nResult[2] + '.' + nResult[3] + nResult[4] + nResult[5] + '.' + nResult[6] + nResult[7] + nResult[8] + '-' + d1 + d2;

    return cpfOptions.formatted ? cpfNumber : cpfNumber.replace(/\D/g, '');
};
