'use strict';

/**
 * Creates a clone of the object using toJSON and parse.
 *
 * Be careful about using this method as your source object
 * must be JSON safe. So it may need some sort of exception
 * handling to keep it safe in cases in which the source
 * object is not convertible to JSON.
 *
 * @static
 * @since Commerce Cloud Conversion
 * @category Lang
 * @param {*} value The value to clone.
 * @returns {*} Returns the cloned value.
 * @see cloneDeep
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var jsonClone = cloneJson(objects);
 * console.log(jsonClone[0] === objects[0]); => false
 */
function clone(value) {
    return JSON.parse(JSON.stringify(value));
}

module.exports = clone;
