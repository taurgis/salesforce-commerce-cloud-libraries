'use strict';

var random = require('./lib/random');

/**
 * Provide an array of items, and another array of items specifying the relative weights
 * and Chance will select one of those items, obeying the specified weight.
 *
 * @param {[Object]} arr - Values to choose from
 * @param {[Integer]} weights - The weights relative tot he values
 * @param {Integer} trim - The position in the results to trim from
 * @returns {Object} - A random value from the arr list
 *
 * @example
 *      weighted([chance.fbid, chance.twitter, chance.ip], [10, 5, 1])(); => 10000345166213
 */
module.exports = function (arr, weights, trim) {
    if (arr.length !== weights.length) {
        throw new RangeError('Chance: Length of array and weights must match');
    }

    // scan weights array and sum valid entries
    var sum = 0;
    var val;
    for (let weightIndex = 0; weightIndex < weights.length; ++weightIndex) {
        val = weights[weightIndex];
        if (isNaN(val)) {
            throw new RangeError('Chance: All weights must be numbers');
        }

        if (val > 0) {
            sum += val;
        }
    }

    if (sum === 0) {
        throw new RangeError('Chance: No valid entries in array weights');
    }

    // select a value within range
    var selected = random() * sum;

    // find array entry corresponding to selected value
    var total = 0;
    var lastGoodIdx = -1;
    var chosenIdx;
    for (let weightIndex = 0; weightIndex < weights.length; ++weightIndex) {
        val = weights[weightIndex];
        total += val;
        if (val > 0) {
            if (selected <= total) {
                chosenIdx = weightIndex;
                break;
            }
            lastGoodIdx = weightIndex;
        }

        // handle any possible rounding error comparison to ensure something is picked
        if (weightIndex === (weights.length - 1)) {
            chosenIdx = lastGoodIdx;
        }
    }

    var chosen = arr[chosenIdx];
    trim = (typeof trim === 'undefined') ? false : trim; // eslint-disable-line
    if (trim) {
        arr.splice(chosenIdx, 1);
        weights.splice(chosenIdx, 1);
    }

    return chosen;
};
