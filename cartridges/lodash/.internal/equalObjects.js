var getAllKeys = require('./getAllKeys');

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG
  var objProps = getAllKeys(object)
  var objLength = objProps.length
  var othProps = getAllKeys(other)
  var othLength = othProps.length

  if (objLength != othLength && !isPartial) {
    return false
  }
  let key
  let index = objLength
  while (index--) {
    key = objProps[index]
    if (!(isPartial ? key in other : other.hasOwnProperty(key))) {
      return false
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object)
  if (stacked && stack.get(other)) {
    return stacked == other
  }
  let result = true
  stack.set(object, other)
  stack.set(other, object)

  let compared
  let skipCtor = isPartial
  while (++index < objLength) {
    key = objProps[index]
    var objValue = object[key]
    var othValue = other[key]

    if (customizer) {
      compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack)
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false
      break
    }
    skipCtor || (skipCtor = key == 'constructor')
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor
    var othCtor = other.constructor

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false
    }
  }
  stack['delete'](object)
  stack['delete'](other)
  return result
}

module.exports = equalObjects;
