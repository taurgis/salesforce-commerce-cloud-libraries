'use strict';

/**
 * The opposite of `before`. This method creates a function that invokes
 * `func` once it's called `n` or more times.
 *
 * @since 0.1.0
 * @category Function
 * @param {number} n The number of calls before `func` is invoked.
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new restricted function.
 * @example
 *
 * var saves = ['profile', 'settings']
 * var done = after(saves.length, () => console.log('done saving!'))
 *
 * forEach(saves, type => asyncSave({ 'type': type, 'complete': done }))
 * // => Logs 'done saving!' after the two async saves have completed.
 */
function after(n, func) {
    var afterN = n;
    if (typeof func !== 'function') {
        throw new TypeError('Expected a function');
    }
    return function (args) {
        if (--afterN < 1) {
            return func.apply(this, args);
        }

        return false;
    };
}

module.exports = after;
