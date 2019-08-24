'use strict';

var baseIsEqual = require('./baseIsEqual.js');
var get = require('../get.js');
var hasIn = require('../hasIn.js');
var isKey = require('./isKey.js');
var isStrictComparable = require('./isStrictComparable.js');
var matchesStrictComparable = require('./matchesStrictComparable.js');
var toKey = require('./toKey.js');

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;
var COMPARE_UNORDERED_FLAG = 2;

/**
 * The base implementation of `matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatchesProperty(path, srcValue) {
    if (isKey(path) && isStrictComparable(srcValue)) {
        return matchesStrictComparable(toKey(path), srcValue);
    }
    return function (object) {
        var objValue = get(object, path);
        return (objValue === undefined && objValue === srcValue)
            ? hasIn(object, path)
            : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
    };
}

module.exports = baseMatchesProperty;
