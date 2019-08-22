'use strict';

var HashSet;

if(typeof Set === 'undefined') {
    HashSet = require('dw/util/HashSet');
} else {
    HashSet = Set;
}

/**
 * Creates a set object of `values`.
 *
 * @private
 * @param {Array} values The values to add to the set.
 * @returns {Object} Returns the new set.
 */
var createSet = function (values) {
    return new HashSet(values);
};

module.exports = createSet;
