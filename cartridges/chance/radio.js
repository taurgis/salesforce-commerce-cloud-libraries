'use strict';

var initOptions = require('./lib/initOptions');
var character = require('./character');

/**
 * Return a random radio value.
 *
 * @param {Object} options - Possible options for radio
 * @returns {string} - A random radio value
 *
 * @example
 *      radio(); => 'KCXW'
 */
module.exports = function (options) {
    // Initial Letter (Typically Designated by Side of Mississippi River)
    var radioOptions = initOptions(options, { side: '?' });
    var fl = '';
    switch (radioOptions.side.toLowerCase()) {
        case 'east':
        case 'e':
            fl = 'W';
            break;
        case 'west':
        case 'w':
            fl = 'K';
            break;
        default:
            fl = character({ pool: 'KW' });
            break;
    }

    return fl + character({ alpha: true, casing: 'upper' }) +
            character({ alpha: true, casing: 'upper' }) +
            character({ alpha: true, casing: 'upper' });
};
