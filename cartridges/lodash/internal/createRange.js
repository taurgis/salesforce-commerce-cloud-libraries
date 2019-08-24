'use strict';

var baseRange = require('./baseRange.js');
var toFinite = require('../toFinite.js');

/**
 * Creates a `range` or `rangeRight` function.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating= require(right to left.);
 * @returns {Function} Returns the new range function.
 */
function createRange(fromRight) {
    return function (start, end, step) {
    // Ensure the sign of `-0` is preserved.
        start = toFinite(start);
        if (end === undefined) {
            end = start;
            start = 0;
        } else {
            end = toFinite(end);
        }
        step = step === undefined ? (start < end ? 1 : -1) : toFinite(step);
        return baseRange(start, end, step, fromRight);
    };
}

module.exports = createRange;
