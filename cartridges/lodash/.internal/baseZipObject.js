'use strict';

/**
 * This base implementation of `zipObject` which assigns values using `assignFunc`.
 *
 * @private
 * @param {Array} props The property identifiers.
 * @param {Array} values The property values.
 * @param {Function} assignFunc The function to assign values.
 * @returns {Object} Returns the new object.
 */
function baseZipObject(props, values, assignFunc) {
  let index = -1
  var length = props.length
  var valsLength = values.length
  var result = {}

  while (++index < length) {
    var value = index < valsLength ? values[index] : undefined
    assignFunc(result, props[index], value)
  }
  return result
}

module.exports = baseZipObject;
