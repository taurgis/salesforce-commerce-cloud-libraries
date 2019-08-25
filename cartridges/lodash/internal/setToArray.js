'use strict';

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
    let index = -1;
    var result = new Array(set.size);

    set.forEach(function (value) {
        result[++index] = value;
    });

    return result;
}

module.exports = setToArray;
