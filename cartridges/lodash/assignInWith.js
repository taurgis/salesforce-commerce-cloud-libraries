'use strict';

var copyObject = require('./internal/copyObject');
var createAssigner = require('./internal/createAssigner');
var keysIn = require('./keysIn');

/**
 * This method is like `_.assignIn` except that it accepts `customizer`
 * which is invoked to produce the assigned values. If `customizer` returns
 * `undefined`, assignment is handled by the method instead. The `customizer`
 * is invoked with five arguments: (objValue, srcValue, key, object, source).
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @since 4.0.0
 * @alias extendWith
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} sources The source objects.
 * @param {Function} [customizer] The function to customize assigned values.
 * @returns {Object} Returns `object`.
 * @see assignWith
 * @example
 *
 * function customizer(objValue, srcValue) {
 *   return isUndefined(objValue) ? srcValue : objValue;
 * }
 *
 * var defaults = partialRight(assignInWith, customizer);
 *
 * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 }); => { 'a': 1, 'b': 2 }
 */
var assignInWith = createAssigner(function (object, source, srcIndex, customizer) {
    copyObject(source, keysIn(source), object, customizer);
});

module.exports = assignInWith;
