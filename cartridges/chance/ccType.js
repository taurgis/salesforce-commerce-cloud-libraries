'use strict';

var initOptions = require('./lib/initOptions');
var ccTypes = require('./lib/ccTypes');
var pick = require('./lib/pickOne');

/**
 * Return a random Credit Card Type value.
 *
 * @param {Object} options - Possible options for Credit Card type
 * @returns {string} - A random Credit Card Type value
 *
 * @example
 *      ccType(); // => 'American Express'
 */
module.exports = function (options) {
    var ccOptions = initOptions(options);
    var types = ccTypes;
    var type = null;

    if (ccOptions.name) {
        for (var i = 0; i < types.length; i++) {
            // Accept either name or short_name to specify card type
            if (types[i].name === ccOptions.name || types[i].short_name === ccOptions.name) {
                type = types[i];
                break;
            }
        }
        if (type === null) {
            throw new RangeError("Chance: Credit card type '" + ccOptions.name + "' is not supported");
        }
    } else {
        type = pick(types);
    }

    return ccOptions.raw ? type : type.name;
};
