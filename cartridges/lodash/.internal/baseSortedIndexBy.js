'use strict';

var isSymbol= require('../isSymbol.js');

/** Used as references for the maximum length and index of an array. */
var MAX_ARRAY_LENGTH = 4294967295
var MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1

/**
 * The base implementation of `sortedIndexBy` and `sortedLastIndexBy`
 * which invokes `iteratee` for `value` and each element of `array` to compute
 * their sort ranking. The iteratee is invoked with one argument (value).
 *
 * @private
 * @param {Array} array The sorted array to inspect.
 * @param {*} value The value to evaluate.
 * @param {Function} iteratee The iteratee invoked per element.
 * @param {boolean} [retHighest] Specify returning the highest qualified index.
 * @returns {number} Returns the index at which `value` should be inserted
 *  into `array`.
 */
function baseSortedIndexBy(array, value, iteratee, retHighest) {
  value = iteratee(value)

  let low = 0
  let high = array == null ? 0 : array.length
  var valIsNaN = value !== value
  var valIsNull = value === null
  var valIsSymbol = isSymbol(value)
  var valIsUndefined = value === undefined

  while (low < high) {
    let setLow
    var mid = Math.floor((low + high) / 2)
    var computed = iteratee(array[mid])
    var othIsDefined = computed !== undefined
    var othIsNull = computed === null
    var othIsReflexive = computed === computed
    var othIsSymbol = isSymbol(computed)

    if (valIsNaN) {
      setLow = retHighest || othIsReflexive
    } else if (valIsUndefined) {
      setLow = othIsReflexive && (retHighest || othIsDefined)
    } else if (valIsNull) {
      setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull)
    } else if (valIsSymbol) {
      setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol)
    } else if (othIsNull || othIsSymbol) {
      setLow = false
    } else {
      setLow = retHighest ? (computed <= value) : (computed < value)
    }
    if (setLow) {
      low = mid + 1
    } else {
      high = mid
    }
  }
  return Math.min(high, MAX_ARRAY_INDEX)
}

module.exports = baseSortedIndexBy;
