'use strict';

var testRange = require('./lib/testRange');
var initOptions = require('./lib/initOptions');
var normalPool = require('./lib/normalPool');
var random = require('./lib/random');

/**
 * Return a random normally-distributed random variate value.
 *
 * @param {Object} options - Possible options for normally-distributed random variate
 * @returns {number} - A random normally-distributed random variate value
 *
 * @example
 *      normal({mean: 100}) => 99.68352269988522
 */
module.exports = function (options) {
    var normalOptions = initOptions(options, { mean: 0, dev: 1, pool: [] });

    testRange(
        normalOptions.pool.constructor !== Array,
        'Chance: The pool option must be a valid array.'
    );
    testRange(
        typeof normalOptions.mean !== 'number',
        'Chance: Mean (mean) must be a number'
    );
    testRange(
        typeof normalOptions.dev !== 'number',
        'Chance: Standard deviation (dev) must be a number'
    );

    // If a pool has been passed, then we are returning an item from that pool,
    // using the normal distribution settings that were passed in
    if (normalOptions.pool.length > 0) {
        return normalPool(normalOptions);
    }

    // The Marsaglia Polar method
    var s; var u; var v; var norm;
    var mean = normalOptions.mean;
    var dev = normalOptions.dev;

    do {
        // U and V are from the uniform distribution on (-1, 1)
        u = random() * 2 - 1;
        v = random() * 2 - 1;

        s = u * u + v * v;
    } while (s >= 1);

    // Compute the standard normal variate
    norm = u * Math.sqrt(-2 * Math.log(s) / s);

    // Shape and scale
    return dev * norm + mean;
};
