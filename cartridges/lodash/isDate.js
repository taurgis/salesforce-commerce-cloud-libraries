'use strict';

var isObjectLike = require('./isObjectLike.js');
var nodeTypes = require('./internal/nodeTypes.js');

/* Node.js helper references. */
const nodeIsDate = nodeTypes && nodeTypes.isDate;

/**
 * Checks if `value` is classified as a `Date` object.
 *
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a date object, else `false`.
 * @example
 *
 * isDate(new Date)
 * // => true
 *
 * isDate('Mon April 23 2012')
 * // => false
 */
const isDate = nodeIsDate
    ? function (value) {
        return nodeIsDate(value);
    }
    : function (value) {
        return isObjectLike(value) && value.getDay() > -1;
    };

module.exports = isDate;
