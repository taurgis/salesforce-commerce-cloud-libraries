'use strict';

var initOptions = require('./lib/initOptions');
var string = require('./string');

/**
 * Return a random GUID value.
 *
 * @param {Object} options - Possible options for GUID
 * @returns {string} - A random GUID value
 *
 * @example
 *      guid({version: 4}); => 'c71f58e3-34af-43c0-b405-2764d6947d21'
 */
module.exports = function (options) {
    var guidOptions = initOptions(options, { version: 5 });

    var guidPool = 'abcdef1234567890';
    var variantPool = 'ab89';
    var guidResult = string({ pool: guidPool, length: 8 }) + '-'
        + string({ pool: guidPool, length: 4 }) + '-'
        // The Version
        + guidOptions.version
        + string({ pool: guidPool, length: 3 }) + '-'
        // The Variant
        + string({ pool: variantPool, length: 1 })
        + string({ pool: guidPool, length: 3 }) + '-'
        + string({ pool: guidPool, length: 12 });
    return guidResult;
};
