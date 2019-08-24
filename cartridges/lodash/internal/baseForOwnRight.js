'use strict';

var baseForRight = require('./baseForRight');
var keys = require('../keys');

/**
 * The base implementation of `forOwnRight`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwnRight(object, iteratee) {
  return object && baseForRight(object, iteratee, keys)
}

module.exports = baseForOwnRight;
