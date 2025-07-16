'use strict';

var LodashWrapper = require('./lodashWrapper');
var flatRest = require('./flatRest');
var getData = require('./getData');
var getFuncName = require('./getFuncName');
var isArray = require('../isArray');
var isLaziable = require('./isLaziable');

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used to compose bitmasks for function metadata. */
var WRAP_CURRY_FLAG = 8;
var WRAP_PARTIAL_FLAG = 32;
var WRAP_ARY_FLAG = 128;
var WRAP_REARG_FLAG = 256;

/**
 * Creates a `_.flow` or `_.flowRight` function.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new flow function.
 */
function createFlow(fromRight) {
    return flatRest(function (funcs) {
        var length = funcs.length;
        var index = length;
        var prereq = LodashWrapper.prototype.thru;
        var wrapper;
        var func;
        if (fromRight) {
            funcs.reverse();
        }
        while (index--) {
            func = funcs[index];
            if (typeof func != 'function') {
                throw new TypeError(FUNC_ERROR_TEXT);
            }

            if (prereq && !wrapper && getFuncName(func) == 'wrapper') {
                wrapper = new LodashWrapper([], true);
            }
        }
        index = wrapper ? index : length;
        while (++index < length) {
            func = funcs[index];

            var funcName = getFuncName(func);
            var data = funcName == 'wrapper' ? getData(func) : undefined;

            if (data && isLaziable(data[0])
            && data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG)
            && !data[4].length && data[9] == 1
            ) {
                wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
            } else {
                wrapper = (func.length == 1 && isLaziable(func))
                    ? wrapper[funcName]()
                    : wrapper.thru(func);
            }
        }
        return function () {
            var args = arguments;
            var value = args[0];

            if (wrapper && args.length == 1 && isArray(value)) {
                return wrapper.plant(value).value();
            }
            var index = 0;
            var result = length ? funcs[index].apply(this, args) : value;

            while (++index < length) {
                result = funcs[index].call(this, result);
            }
            return result;
        };
    });
}

module.exports = createFlow;
