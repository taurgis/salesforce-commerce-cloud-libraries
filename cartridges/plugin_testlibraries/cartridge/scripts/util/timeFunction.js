'use strict';

/**
 * Time library functions
 * @param {Object} functionToCall - The functions to time
 * @returns {Object} - The executed functions with their time to execute
 */
module.exports = function () {
    var args = Array.prototype.slice.call(arguments);
    var functionToCall = args.shift();
    var startTime = new Date();
    var executed = functionToCall.apply(this, args);
    var endTime = new Date();

    return {
        result: executed,
        timeToExecute: (endTime - startTime) + 'ms'
    };
};
