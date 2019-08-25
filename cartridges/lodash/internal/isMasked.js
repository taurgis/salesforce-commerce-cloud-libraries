'use strict';

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function () {
    var uid = '';
    return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
    return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;
