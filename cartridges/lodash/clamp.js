'use strict';

/**
 * Clamps `number` within the inclusive `lower` and `upper` bounds.
 *
 * @since 4.0.0
 * @category Number
 * @param {number} clampNumber The number to clamp.
 * @param {number} clampLower The lower bound.
 * @param {number} clampUpper The upper bound.
 * @returns {number} Returns the clamped number.
 * @example
 *
 * clamp(-10, -5, 5)
 * // => -5
 *
 * clamp(10, -5, 5)
 * // => 5
 */
function clamp(clampNumber, clampLower, clampUpper) {
    var number = +clampNumber;
    var lower = +clampLower;
    var upper = +clampUpper;

    lower = lower === lower ? lower : 0;
    upper = upper === upper ? upper : 0;

    if (number === number) {
        number = number <= upper ? number : upper;
        number = number >= lower ? number : lower;
    }

    return number;
}

module.exports = clamp;
