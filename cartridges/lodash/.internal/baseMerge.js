var Stack= require('./Stack.js');
var assignMergeValue= require('./assignMergeValue.js');
var baseFor= require('./baseFor.js');
var baseMergeDeep= require('./baseMergeDeep.js');
var isObject= require('../isObject.js');
var keysIn= require('../keysIn.js');

/**
 * The base implementation of `merge` without support for multiple sources.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMerge(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return
  }
  baseFor(source, function(srcValue, key)  {
    if (isObject(srcValue)) {
      stack || (stack = new Stack)
      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack)
    }
    else {
      let newValue = customizer
        ? customizer(object[key], srcValue, key.toString(), object, source, stack)
        : undefined

      if (newValue === undefined) {
        newValue = srcValue
      }
      assignMergeValue(object, key, newValue)
    }
  }, keysIn)
}

module.exports = baseMerge;
