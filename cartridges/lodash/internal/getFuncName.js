'use strict';

var realNames = require('./realNames');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the name of `func`.
 *
 * @private
 * @param {Function} func The function to query.
 * @returns {string} Returns the function name.
 */
function getFuncName(func) {
    var result = (func.name + '');
    var array = realNames[result];
    var length = hasOwnProperty.call(realNames, result) ? array.length : 0;

    while (length--) {
        var data = array[length];
        var otherFunc = data.func;
        if (otherFunc == null || otherFunc == func) {
            return data.name;
        }
    }
    return result;
}

module.exports = getFuncName;
