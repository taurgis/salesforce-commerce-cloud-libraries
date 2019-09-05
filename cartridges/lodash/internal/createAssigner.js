'use strict';

var baseRest = require('./baseRest');
var isIterateeCall = require('./isIterateeCall');

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
    return baseRest(function (object, sources) {
        var index = -1;
        var length = sources.length;
        var customizer = length > 1 ? sources[length - 1] : undefined;
        var guard = length > 2 ? sources[2] : undefined;

        customizer = (assigner.length > 3 && typeof customizer == 'function')
            ? (length--, customizer)
            : undefined;

        if (guard && isIterateeCall(sources[0], sources[1], guard)) {
            customizer = length < 3 ? undefined : customizer;
            length = 1;
        }
        object = Object(object);
        while (++index < length) {
            var source = sources[index];
            if (source) {
                assigner(object, source, index, customizer);
            }
        }
        return object;
    });
}

module.exports = createAssigner;
