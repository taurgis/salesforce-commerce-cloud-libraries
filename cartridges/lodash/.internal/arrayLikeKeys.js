'use strict';

var isArguments = require('../isArguments');
var isBuffer = require('../isBuffer');
var isIndex = require('./isIndex.js');
var isTypedArray = require('../isTypedArray');
var isString = require('../isString');
/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = Array.isArray(value)
  var isArg = !isArr && isArguments(value)
  var isBuff = !isArr && !isArg && isBuffer(value)
  var isType = !isArr && !isArg && !isBuff && isTypedArray(value)
  var skipIndexes = isArr || isArg || isBuff || isType
  var length = value.length
  var result = new Array(skipIndexes ? length : 0)
  let index = skipIndexes ? -1 : length
  while (++index < length) {
    result[index] = index.toString();
  }

  if(isString(value)) {
    value = value.split('');
  }

  value.forEach(function (key) {
    if ((inherited || value.hasOwnProperty(key)) &&
      !(skipIndexes && (
        // Safari 9 has enumerable `arguments.length` in strict mode.
        (key == 'length' ||
          // Skip index properties.
          isIndex(key, length))
      ))) {
      result.push(key)
    }
  })

  return result
}

module.exports = arrayLikeKeys;
