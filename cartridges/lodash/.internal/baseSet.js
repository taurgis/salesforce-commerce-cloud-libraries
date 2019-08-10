var assignValue= require('./assignValue.js');
var castPath= require('./castPath.js');
var isIndex= require('./isIndex.js');
var isObject= require('../isObject.js');
var toKey= require('./toKey.js');

/**
 * The base implementation of `set`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @param {Function} [customizer] The function to customize path creation.
 * @returns {Object} Returns `object`.
 */
function baseSet(object, path, value, customizer) {
  if (!isObject(object)) {
    return object
  }
  path = castPath(path, object)

  var length = path.length
  var lastIndex = length - 1

  let index = -1
  let nested = object

  while (nested != null && ++index < length) {
    var key = toKey(path[index])
    let newValue = value

    if (index != lastIndex) {
      var objValue = nested[key]
      newValue = customizer ? customizer(objValue, key, nested) : undefined
      if (newValue === undefined) {
        newValue = isObject(objValue)
          ? objValue
          : (isIndex(path[index + 1]) ? [] : {})
      }
    }
    assignValue(nested, key, newValue)
    nested = nested[key]
  }
  return object
}

module.exports = baseSet;
