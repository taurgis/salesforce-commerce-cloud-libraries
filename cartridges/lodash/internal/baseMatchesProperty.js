'use strict';

var baseIsEqual = require('./baseIsEqual');
var get = require('../get');
var hasIn = require('../hasIn');
var isKey = require('./isKey');
var isStrictComparable = require('./isStrictComparable');
var matchesStrictComparable = require('./matchesStrictComparable');
var toKey = require('./toKey');

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
