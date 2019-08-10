var getSymbols= require('./getSymbols.js');

/**
 * Creates an array of the own and inherited enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
function getSymbolsIn (object) {
  var result = []
  while (object) {
    result.push(getSymbols(object))
    object = Object.getPrototypeOf(Object(object))
  }
  return result
}

module.exports = getSymbolsIn;
