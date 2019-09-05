'use strict';

var LazyWrapper = require('./lazyWrapper');
var getData = require('./getData');
var getFuncName = require('./getFuncName');
var lodash = require('../wrapperLodash');

/**
 * Checks if `func` has a lazy counterpart.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` has a lazy counterpart,
 *  else `false`.
 */
function isLaziable(func) {
    var funcName = getFuncName(func);
    var other = lodash[funcName];

    if (typeof other != 'function' || !(funcName in LazyWrapper.prototype)) {
        return false;
    }
    if (func === other) {
        return true;
    }
    var data = getData(other);
    return !!data && func === data[0];
}

module.exports = isLaziable;
