'use strict';

var radio = require('./radio');
/**
 * Return a random tv value.
 *
 * @param {Object} options - Possible options for tv
 * @returns {string} - A random tv value
 *
 * @example
 *      tv(); => 'KCXW'
 */
module.exports = function (options) {
    return radio(options);
};
