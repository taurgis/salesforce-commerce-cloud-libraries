'use strict';

/**
 * Converts `array` to an `arguments` object.
 *
 * @private
 * @param {Array} array The array to convert.
 * @returns {Object} Returns the converted `arguments` object.
 */
function toArgs(array) {
    return (function () { return arguments; }.apply(undefined, array));
}

module.exports = toArgs;
