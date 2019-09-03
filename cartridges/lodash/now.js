'use strict';

var root = require('./internal/root');

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now()); => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function () {
    return root.Date.now();
};

module.exports = now;
