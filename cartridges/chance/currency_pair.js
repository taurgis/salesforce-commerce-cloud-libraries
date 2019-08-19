'use strict';

var unique = require('./unique');
var currency = require('./currency');

/**
 * Return a random currency pair value.
 *
 * @param {boolean} returnAsString - Return the pair as a string
 * @returns {[Object]} - A random currency pair value
 *
 * @example
 *      currency_pair(); => [{ code: "ALL", name: "Albania Lek" }, { code: "ZWD", name: "Zimbabwe Dollar" }]
 */
module.exports = function (returnAsString) {
    var currencies = unique(currency, 2, {
        comparator: function (arr, val) {
            return arr.reduce(function (acc, item) {
                // If a match has been found, short circuit check and just return
                return acc || (item.code === val.code);
            }, false);
        }
    });

    if (returnAsString) {
        return currencies[0].code + '/' + currencies[1].code;
    }
    return currencies;
};
