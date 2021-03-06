'use strict';

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(identity(object) === object); => true
 */
function identity(value) {
    return value;
}

module.exports = identity;
