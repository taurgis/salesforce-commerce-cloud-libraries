'use strict';

var testRange = require('./lib/testRange');

/**
 *  Given a function that generates something random and a number of items to generate,
 *    return an array of items where none repeat.
 *
 *  @param {Function} fn the function that generates something random
 *  @param {number} num number of terms to generate
 *  @param {Object} options any options to pass on to the generator function
 *  @returns {Array} an array of length `num` with every item generated by `fn` and unique
 *
 *  There can be more parameters after these. All additional parameters are provided to the given function
 */
module.exports = function (fn, num, options) {
    testRange(
        typeof fn !== 'function',
        'Chance: The first argument must be a function.'
    );

    var comparator = function (arr, val) { return arr.indexOf(val) !== -1; };

    if (options) {
        comparator = options.comparator || comparator;
    }

    var arr = []; var count = 0; var result; var MAX_DUPLICATES = num * 50; var
        params = Array.prototype.slice.call(arguments, 2);

    while (arr.length < num) {
        var clonedParams = JSON.parse(JSON.stringify(params));
        result = fn.apply(this, clonedParams);
        if (!comparator(arr, result)) {
            arr.push(result);
            // reset count when unique found
            count = 0;
        }

        if (++count > MAX_DUPLICATES) {
            throw new RangeError('Chance: num is likely too large for sample set');
        }
    }
    return arr;
};
