'use strict';

var baseDifference= require('./baseDifference.js');
var baseFlatten= require('./baseFlatten.js');
var baseUniq= require('./baseUniq.js');

/**
 * The base implementation of methods like `xor` which accepts an array of
 * arrays to inspect.
 *
 * @private
 * @param {Array} arrays The arrays to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of values.
 */
function baseXor(arrays, iteratee, comparator) {
  var length = arrays.length
  if (length < 2) {
    return length ? baseUniq(arrays[0]) : []
  }
  let index = -1
  var result = new Array(length)

  while (++index < length) {
    var array = arrays[index]
    let othIndex = -1

    while (++othIndex < length) {
      if (othIndex != index) {
        result[index] = baseDifference(result[index] || array, arrays[othIndex], iteratee, comparator)
      }
    }
  }
  return baseUniq(baseFlatten(result, 1), iteratee, comparator)
}

module.exports = baseXor;
