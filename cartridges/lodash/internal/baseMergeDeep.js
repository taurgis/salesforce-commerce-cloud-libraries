'use strict';

var assignMergeValue = require('./assignMergeValue');
var cloneBuffer = require('./cloneBuffer');
var cloneTypedArray = require('./cloneTypedArray');
var copyArray = require('./copyArray');
var initCloneObject = require('./initCloneObject');
var isArguments = require('../isArguments');
var isArray = require('../isArray');
var isArrayLikeObject = require('../isArrayLikeObject');
var isBuffer = require('../isBuffer');
var isFunction = require('../isFunction');
var isObject = require('../isObject');
var isPlainObject = require('../isPlainObject');
var isTypedArray = require('../isTypedArray');
var safeGet = require('./safeGet');
var toPlainObject = require('../toPlainObject');

/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
    var objValue = safeGet(object, key);
    var srcValue = safeGet(source, key);
    var stacked = stack.get(srcValue);

    if (stacked) {
        assignMergeValue(object, key, stacked);
        return;
    }
    var newValue = customizer
        ? customizer(objValue, srcValue, (key + ''), object, source, stack)
        : undefined;

    var isCommon = newValue === undefined;

    if (isCommon) {
        var isArr = isArray(srcValue);
        var isBuff = !isArr && isBuffer(srcValue);
        var isTyped = !isArr && !isBuff && isTypedArray(srcValue);

        newValue = srcValue;
        if (isArr || isBuff || isTyped) {
            if (isArray(objValue)) {
                newValue = objValue;
            } else if (isArrayLikeObject(objValue)) {
                newValue = copyArray(objValue);
            } else if (isBuff) {
                isCommon = false;
                newValue = cloneBuffer(srcValue, true);
            } else if (isTyped) {
                isCommon = false;
                newValue = cloneTypedArray(srcValue, true);
            } else {
                newValue = [];
            }
        } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
            newValue = objValue;
            if (isArguments(objValue)) {
                newValue = toPlainObject(objValue);
            } else if (!isObject(objValue) || isFunction(objValue)) {
                newValue = initCloneObject(srcValue);
            }
        } else {
            isCommon = false;
        }
    }
    if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
        stack.set(srcValue, newValue);
        mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
        stack.delete(srcValue);
    }
    assignMergeValue(object, key, newValue);
}

module.exports = baseMergeDeep;
