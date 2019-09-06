'use strict';

var defaultTo = require('./defaultTo');
var isNil = require('./isNil');

/**
 * Checks if a `custom attribute` is available and returns it. If it does
 * not exist the fallback value is returned.
 *
 * @static
 * @since 6.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {string} attributeName The custom attribute to get
 * @param {string} fallback The fallback value
 * @returns {object} Returns the value if the attribute exists and has a value,
 * otherwise returns the fallback.
 * @example
 *
 * var productA = ProductMgr.getProduct('12345');
 * getCustomAttribute(productA, 'myCustomAttribute', 'fallBack') => Returns the custom attribute value
 *                                                                  if it exists, otherwise the fallback
 */
function getCustomAttribute(object, attributeName, fallback) {
    // Check if its like null, and make sure it is null
    if (isNil(fallback)) {
        fallback = null;
    }

    if (object != null && object.custom != null
        && Object.hasOwnProperty.call(object.custom, attributeName)) {
        return defaultTo(object.custom[attributeName], fallback);
    }

    return fallback;
}

module.exports = getCustomAttribute;
