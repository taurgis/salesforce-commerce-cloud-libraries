'use strict';

var _arity = require('./internal/_arity');
var _curry2 = require('./internal/_curry2');
var head = require('./head');
var _reduce = require('./internal/_reduce');
var tail = require('./tail');
var identity = require('./identity');

/**
 * Performs left-to-right function composition using transforming function. The first argument may have
 * any arity; the remaining arguments must be unary.
 *
 * **Note:** The result of pipeWith is not automatically curried. Transforming function is not used on the
 * first argument.
 *
 * @func
 * @memberOf R
 * @since v0.26.0
 * @category Function
 * @sig ((* -> *), [((a, b, ..., n) -> o), (o -> p), ..., (x -> y), (y -> z)]) -> ((a, b, ..., n) -> z)
 * @param {...Function} functions
 * @return {Function}
 * @see R.composeWith, R.pipe
 * @example
 *
 *      const pipeWhileNotNil = R.pipeWith((f, res) => R.isNil(res) ? res : f(res));
 *      const f = pipeWhileNotNil([Math.pow, R.negate, R.inc])
 *
 *      f(3, 4); // -(3^4) + 1
 * @symb R.pipeWith(f)([g, h, i])(...args) = f(i, f(h, g(...args)))
 */
var pipeWith = _curry2(function pipeWith(xf, list) {
    if (list.length <= 0) {
        return identity;
    }

    var headList = head(list);
    var tailList = tail(list);

    return _arity(headList.length, function () {
        return _reduce(
            function (result, f) {
                return xf.call(this, f, result);
            },
            headList.apply(this, arguments),
            tailList
        );
    });
});
module.exports = pipeWith;
