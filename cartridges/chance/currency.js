'use strict';

var currencyTypes = require('./lib/currencyTypes');
var pick = require('./lib/pickOne');

/**
 * Return a random currency value.
 *
 * @param {Object} options - Possible options for currency
 * @returns {Object} - A random currency value
 *
 * @example
 *      currency(); => { code: "TVD", name: "Tuvalu Dollar" }
 */
module.exports = function () {
    return pick(currencyTypes);
};
