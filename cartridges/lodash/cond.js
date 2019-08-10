var map = require('./map');

/**
 * Creates a function that iterates over `pairs` and invokes the corresponding
 * function of the first predicate to return truthy. The predicate-function
 * pairs are invoked with the `this` binding and arguments of the created
 * function.
 *
 * @since 4.0.0
 * @category Util
 * @param {Array} pairs The predicate-function pairs.
 * @returns {Function} Returns the new composite function.
 * @example
 *
 * var func = cond([
 *   [matches({ 'a': 1 }),         () => 'matches A'],
 *   [conforms({ 'b': isNumber }), () => 'matches B'],
 *   [() => true,                  () => 'no match']
 * ])
 *
 * func({ 'a': 1, 'b': 2 })
 * // => 'matches A'
 *
 * func({ 'a': 0, 'b': 1 })
 * // => 'matches B'
 *
 * func({ 'a': '1', 'b': '2' })
 * // => 'no match'
 */
function cond(pairs) {
    var length = pairs == null ? 0 : pairs.length;
    var condPairs = !length ? [] : map(pairs, function (pair) {
        if (typeof pair[1] !== 'function') {
            throw new TypeError('Expected a function');
        }
        return [pair[0], pair[1]];
    });

    return function (args) {
        var index = -1;
        while (++index < length) {
            var pair = condPairs[index];
            if (pair[0](args)) {
                return pair[1](args);
            }
            return [];
        }

        return false;
    };
}

module.exports = cond;
