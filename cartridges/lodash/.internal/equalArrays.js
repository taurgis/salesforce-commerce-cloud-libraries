var SetCache = require('./SetCache');
var some = require('../some');
var cacheHas = require('./cacheHas');

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1
var COMPARE_UNORDERED_FLAG = 2

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG
  var arrLength = array.length
  var othLength = other.length

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array)
  if (stacked && stack.get(other)) {
    return stacked == other
  }
  let index = -1
  let result = true
  var seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined

  stack.set(array, other)
  stack.set(other, array)

  // Ignore non-index properties.
  while (++index < arrLength) {
    let compared
    var arrValue = array[index]
    var othValue = other[index]

    if (customizer) {
      compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack)
    }
    if (compared !== undefined) {
      if (compared) {
        continue
      }
      result = false
      break
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!some(other, function(othValue, othIndex) {
        if (!cacheHas(seen, othIndex) &&
          (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
          return seen.push(othIndex)
        }
      })) {
        result = false
        break
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false
      break
    }
  }
  stack['delete'](array)
  stack['delete'](other)
  return result
}

module.exports = equalArrays;
