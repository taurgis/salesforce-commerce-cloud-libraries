'use strict';

var initOptions = require('./lib/initOptions');
var provinces = require('./lib/provinces');
var pick = require('./lib/pickOne');

/**
 * Return a random province value.
 *
 * @param {Object} options - Possible options for province
 * @returns {string} - A random province value
 *
 * @example
 *      province({country: 'it', full: true}); => 'Vicenza'
 */
module.exports = function (options) {
    var provinceOptions = initOptions(options, { country: 'ca' });

    return (provinceOptions && provinceOptions.full) ?
        pick(provinces[provinceOptions.country.toLowerCase()]).name :
        pick(provinces[provinceOptions.country.toLowerCase()]).abbreviation;
};
