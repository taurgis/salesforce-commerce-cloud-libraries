'use strict';

var baseSet = require('./internal/baseSet');
var baseZipObject = require('./internal/baseZipObject');

/**
 * This method is like `zipObject` except that it supports property paths.
 *
 * @since 4.1.0
 * @category Array
 * @param {Array} [props=[]] The property identifiers.
 * @param {Array} [values=[]] The property values.
 * @returns {Object} Returns the new object.
 * @see unzip, unzipWith, zip, zipObject, zipWith
 * @example
 *
 * zipObjectDeep(['a.b[0].c', 'a.b[1].d'], [1, 2]) => { 'a': { 'b': [{ 'c': 1 }, { 'd': 2 }] } }
 */
function zipObjectDeep(props, values) {
    return baseZipObject(props || [], values || [], baseSet);
}

module.exports = zipObjectDeep;
