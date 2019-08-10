var Stack= require('./Stack.js');
var baseIsEqual= require('./baseIsEqual.js');

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1
var COMPARE_UNORDERED_FLAG = 2

/**
 * The base implementation of `isMatch`.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, source, matchData, customizer) {
  let index = matchData.length
  var length = index
  var noCustomizer = !customizer

  if (object == null) {
    return !length
  }
  let data
  let result
  object = Object(object)
  while (index--) {
    data = matchData[index]
    if ((noCustomizer && data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false
    }
  }
  while (++index < length) {
    data = matchData[index]
    var key = data[0]
    var objValue = object[key]
    var srcValue = data[1]

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false
      }
    } else {
      var stack = new Stack
      if (customizer) {
        result = customizer(objValue, srcValue, key, object, source, stack)
      }
      if (!(result === undefined
            ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack)
            : result
          )) {
        return false
      }
    }
  }
  return true
}

module.exports = baseIsMatch;
