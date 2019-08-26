'use strict';

var isArguments = require('../isArguments');


/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
    return Array.isArray(value) || isArguments(value);
}

module.exports = isFlattenable;
