'use strict';

var composeArgs = require('./composeArgs');
var composeArgsRight = require('./composeArgsRight');
var countHolders = require('./countHolders');
var createCtor = require('./createCtor');
var createRecurry = require('./createRecurry');
var getHolder = require('./getHolder');
var reorder = require('./reorder');
var replaceHolders = require('./replaceHolders');
var root = require('./root');

/** Used to compose bitmasks for function metadata. */
var WRAP_BIND_FLAG = 1;
var WRAP_BIND_KEY_FLAG = 2;
var WRAP_CURRY_FLAG = 8;
var WRAP_CURRY_RIGHT_FLAG = 16;
var WRAP_ARY_FLAG = 128;
var WRAP_FLIP_FLAG = 512;

/**
 * Creates a function that wraps `func` to invoke it with optional `this`
 * binding of `thisArg`, partial application, and currying.
 *
 * @private
 * @param {Function|string} func The function or method name to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {Array} [partials] The arguments to prepend to those provided to
 *  the new function.
 * @param {Array} [holders] The `partials` placeholder indexes.
 * @param {Array} [partialsRight] The arguments to append to those provided
 *  to the new function.
 * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
 * @param {Array} [argPos] The argument positions of the new function.
 * @param {number} [ary] The arity cap of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
    var isAry = bitmask & WRAP_ARY_FLAG;
    var isBind = bitmask & WRAP_BIND_FLAG;
    var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
    var isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
    var isFlip = bitmask & WRAP_FLIP_FLAG;
    var Ctor = isBindKey ? undefined : createCtor(func);

    /**
     * Wrapper function
     */
    function wrapper() {
        var length = arguments.length;
        var args = Array(length);
        var index = length;

        while (index--) {
            args[index] = arguments[index];
        }
        if (isCurried) {
            var placeholder = getHolder(wrapper);
            var holdersCount = countHolders(args, placeholder);
        }
        if (partials) {
            args = composeArgs(args, partials, holders, isCurried);
        }
        if (partialsRight) {
            args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
        }
        length -= holdersCount; // eslint-disable-line
        if (isCurried && length < arity) {
            var newHolders = replaceHolders(args, placeholder); // eslint-disable-line
            return createRecurry(
                func,
                bitmask,
                createHybrid,
                wrapper.placeholder,
                thisArg,
                args,
                newHolders,
                argPos,
                ary,
                arity - length
            );
        }
        var thisBinding = isBind ? thisArg : this;
        var fn = isBindKey ? thisBinding[func] : func;

        length = args.length;
        if (argPos) {
            args = reorder(args, argPos);
        } else if (isFlip && length > 1) {
            args.reverse();
        }
        if (isAry && ary < length) {
            args.length = ary;
        }
        if (this && this !== root && this instanceof wrapper) {
            fn = Ctor || createCtor(fn);
        }
        return fn.apply(thisBinding, args);
    }
    return wrapper;
}

module.exports = createHybrid;
