'use strict';

var isObjectLike = require('./isObjectLike');
var isPlainObject = require('./isPlainObject');

/**
 * Checks if `value` is likely a DOM element.
 *
 * @static
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
 * @example
 *
 * isElement(document.body) => true
 *
 * isElement('<body>') => false
 *
 * @implNote This is not supported by Salesforce Commerce Cloud
 */
function isElement(value) {
    return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
}

module.exports = isElement;
