'use strict';

var _curry1 = require('./internal/_curry1');
var apply = require('./apply');
var curryN = require('./curryN');
var max = require('./max');
var pluck = require('./pluck');
var reduce = require('./reduce');
var keys = require('./keys');
var values = require('./values');

// Use custom mapValues function to avoid issues with specs that include a "map" key and R.map
// delegating calls to .map
function mapValues(fn, obj) {
    return keys(obj).reduce(function (acc, key) {
        acc[key] = fn(obj[key]);
        return acc;
    }, {});
}

/**
 * Given a spec object recursively mapping properties to functions, creates a
 * function producing an object of the same structure, by mapping each property
 * to the result of calling its associated function with the supplied arguments.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category Function
 * @sig {k: ((a, b, ..., m) -> v)} -> ((a, b, ..., m) -> {k: v})
 * @param {Object} spec an object recursively mapping properties to functions for
 *        producing the values for these properties.
 * @return {Function} A function that returns an object of the same structure
 * as `spec', with each property set to the value returned by calling its
 * associated function with the supplied arguments.
 * @see R.converge, R.juxt
 * @example
 *
 *      const getMetrics = R.applySpec({
 *        sum: R.add,
 *        nested: { mul: R.multiply }
 *      });
 *      getMetrics(2, 4); // => { sum: 6, nested: { mul: 8 } }
 * @symb R.applySpec({ x: f, y: { z: g } })(a, b) = { x: f(a, b), y: { z: g(a, b) } }
 */
var applySpec = _curry1(function applySpec(spec) {
    spec = mapValues(
        function (v) { return typeof v === 'function' ? v : applySpec(v); },
        spec
    );

    return curryN(
        reduce(max, 0, pluck('length', values(spec))),
        function () {
            var args = arguments;
            return mapValues(function (f) { return apply(f, args); }, spec);
        }
    );
});
module.exports = applySpec;
