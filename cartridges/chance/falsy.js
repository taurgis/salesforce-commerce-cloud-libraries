'use strict';

var initOptions = require('./lib/initOptions');
var integer = require('./integer');

/**
 * Return a random falsy value.
 *
 * @param {Object} options - Possible options for falsy
 * @returns {null} - A random falsy value
 *
 * @example
 *      falsy(); // => null
 */
module.exports = function falsy(options) {
    // return a random falsy value
    var falsyOptions = initOptions(options, { pool: [false, null, 0, NaN, ''] });
    var pool = falsyOptions.pool;
    var index = integer({ min: 0, max: pool.length });
    var value = pool[index];

    return value;
};
