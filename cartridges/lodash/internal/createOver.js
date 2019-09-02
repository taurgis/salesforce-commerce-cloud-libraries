'use strict';

var apply = require('./apply');
var arrayMap = require('./arrayMap');
var baseIteratee = require('./baseIteratee');
var baseRest = require('./baseRest');
var baseUnary = require('./baseUnary');
var flatRest = require('./flatRest');

/**
 * Creates a function like `_.over`.
 *
 * @private
 * @param {Function} arrayFunc The function to iterate over iteratees.
 * @returns {Function} Returns the new over function.
 */
function createOver(arrayFunc) {
    return flatRest(function (iteratees) {
        iteratees = arrayMap(iteratees, baseUnary(baseIteratee));
        return baseRest(function (args) {
            var thisArg = this;
            return arrayFunc(iteratees, function (iteratee) {
                return apply(iteratee, thisArg, args);
            });
        });
    });
}

module.exports = createOver;
