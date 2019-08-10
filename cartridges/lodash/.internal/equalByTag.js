var eq = require('../eq');
var equalArrays = require('./equalArrays');
var mapToArray = require('./mapToArray');
var setToArray = require('./setToArray');

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1
var COMPARE_UNORDERED_FLAG = 2

/** `Object#toString` result references. */
var boolTag = '[object Boolean]'
var dateTag = '[object Date]'
var errorTag = '[object Error]'
var mapTag = '[object Map]'
var numberTag = '[object Number]'
var regexpTag = '[object RegExp]'
var setTag = '[object Set]'
var stringTag = '[object String]'
var symbolTag = '[object Symbol]'

var arrayBufferTag = '[object ArrayBuffer]'
var dataViewTag = '[object DataView]'

/** Used to convert symbols to primitives and strings. */
var symbolValueOf = "valueOf"

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false
      }
      object = object.buffer
      other = other.buffer

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false
      }
      return true

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other)

    case errorTag:
      return object.name == other.name && object.message == other.message

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == other.toString();

    case mapTag:
      let convert = mapToArray

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG
      convert || (convert = setToArray)

      if (object.size != other.size && !isPartial) {
        return false
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object)
      if (stacked) {
        return stacked == other
      }
      bitmask |= COMPARE_UNORDERED_FLAG

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other)
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack)
      stack['delete'](object)
      return result

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other)
      }
  }
  return false
}

module.exports = equalByTag;
