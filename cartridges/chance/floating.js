'use strict';

var testRange = require('./lib/testRange');
var integer = require('./integer');
var initOptions = require('./lib/initOptions');

var MAX_INT = Number(9007199254740992);

/**
 * Return a random floating value.
 *
 * @param {Object} options - Possible options for floating
 * @returns {number} - A random float value
 *
 * @example
 *      floating({ fixed: 7 }) // => -749512327.7447168
 */
module.exports = function floating(options) {
    var floatingOptions = initOptions(options, { fixed: 4 });
    testRange(
        floatingOptions.fixed && floatingOptions.precision,
        'Chance: Cannot specify both fixed and precision.'
    );

    var num;
    var fixed = Math.pow(10, floatingOptions.fixed);

    var max = MAX_INT / fixed;
    var min = -max;

    testRange(
        floatingOptions.min && floatingOptions.fixed && floatingOptions.min < min,
        'Chance: Min specified is out of range with fixed. Min should be, at least, ' + min
    );
    testRange(
        floatingOptions.max && floatingOptions.fixed && floatingOptions.max > max,
        'Chance: Max specified is out of range with fixed. Max should be, at most, ' + max
    );

    floatingOptions = initOptions(floatingOptions, { min: min, max: max });

    // Todo - Make this work!
    // options.precision = (typeof options.precision !== "undefined") ? options.precision : false;

    num = integer({ min: floatingOptions.min * fixed, max: floatingOptions.max * fixed });
    var numFixed = (num / fixed).toFixed(floatingOptions.fixed);

    return parseFloat(numFixed);
};
