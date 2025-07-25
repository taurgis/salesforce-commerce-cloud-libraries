'use strict';

var apply = require('./apply');
var createCtor = require('./createCtor');
var createHybrid = require('./createHybrid');
var createRecurry = require('./createRecurry');
var getHolder = require('./getHolder');
var replaceHolders = require('./replaceHolders');
var root = require('./root');

/**
 * Creates a function that wraps `func` to enable currying.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {number} arity The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createCurry(func, bitmask, arity) {
    var Ctor = createCtor(func);

    /**
     * Wrapper function
     */
    function wrapper() {
        var length = arguments.length;
        var args = Array(length);
        var index = length;
        var placeholder = getHolder(wrapper);

        while (index--) {
            args[index] = arguments[index];
        }
        var holders = (length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder)
            ? []
            : replaceHolders(args, placeholder);

        length -= holders.length;
        if (length < arity) {
            return createRecurry(
                func,
                bitmask,
                createHybrid,
                wrapper.placeholder,
                undefined,
                args,
                holders,
                undefined,
                undefined,
                arity - length
            );
        }
        var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
        return apply(fn, this, args);
    }
    return wrapper;
}

module.exports = createCurry;
