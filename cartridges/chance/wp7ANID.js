'use strict';

var hash = require('./hash');
var guid = require('./guid');
var integer = require('./integer');

/**
 * Return a random Windows Phone 7 ANID value.
 *
 * @param {Object} options - Possible options for Windows Phone 7 ANID
 * @returns {string} - A random Windows Phone 7 ANID value
 *
 * @example
 *      wp7_anid() => 'A=3FC2491A0E0C5AB7824B2F60DCE4DB02&E=4e7&W=6'
 */
module.exports = function wp7ANID() {
    return 'A=' + guid().replace(/-/g, '').toUpperCase() + '&E=' + hash({ length: 3 }) + '&W=' + integer({ min: 0, max: 9 });
};
