'use strict';

var attempt = require('./attempt');
var isError = require('./isError');

/**
 * Sets a custom attribute to the object if possible.
 *
 * @static
 * @since Commerce Cloud Conversion
 * @category Object
 * @param {Object} object The object to update.
 * @param {string} attributeName The custom attribute to set
 * @param {Object} value The value to set
 * @returns {object} Returns true if the set is successfull
 * @example
 *
 * var productA = ProductMgr.getProduct('12345');
 * setCustomAttribute(productA, 'myCustomAttribute', 'value') => true
 */
function setCustomAttribute(object, attributeName, value) {
    if (object != null && object.custom != null) {
        var result = attempt(function (key, value) {
            object.custom[key] = value;
        }, attributeName, value);

        if (isError(result)) {
            var Logger = require('dw/system/Logger');
            Logger.error(result);
        } else {
            return true;
        }
    }

    return false;
}

module.exports = setCustomAttribute;
