'use strict';

var Set = require('dw/util/HashSet');

/**
 * Creates a set object of `values`.
 *
 * @private
 * @param {Array} values The values to add to the set.
 * @returns {Object} Returns the new set.
 */
var createSet = function (values) {
    return new Set(values);
};

module.exports = createSet;
