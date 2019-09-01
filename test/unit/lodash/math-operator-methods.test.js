var assert = require('assert');
var _ = require('../../../cartridges/lodash/wrapperLodash');
var add = require('../../../cartridges/lodash/add');
var divide = require('../../../cartridges/lodash/divide');
var multiply = require('../../../cartridges/lodash/multiply');
var subtract = require('../../../cartridges/lodash/subtract');
var each = require('../../../cartridges/lodash/each');
var times = require('../../../cartridges/lodash/times');
var map = require('../../../cartridges/lodash/map');

describe('math operator methods', function () {
    each(['add', 'divide', 'multiply', 'subtract'], function (methodName) {
        var func = (function () {
            switch (methodName) {
                case 'add': return add;
                case 'divide': return divide;
                case 'multiply': return multiply;
                case 'subtract': return subtract;

                default: return null;
            }
        }());
        var isAddSub = methodName === 'add' || methodName === 'subtract';

        it('`_.' + methodName + '` should return `' + (isAddSub ? 0 : 1) + '` when no arguments are given', function () {
            assert.strictEqual(func(), isAddSub ? 0 : 1);
        });

        it('`_.' + methodName + '` should work with only one defined argument', function () {
            assert.strictEqual(func(6), 6);
            assert.strictEqual(func(6, undefined), 6);
            assert.strictEqual(func(undefined, 4), 4);
        });

        it('`_.' + methodName + '` should preserve the sign of `0`', function () {
            var values = [0, '0', -0, '-0'];
            var expected = [[0, Infinity], ['0', Infinity], [-0, -Infinity], ['-0', -Infinity]];

            times(2, function (index) {
                var actual = map(values, function (value) {
                    var result = index ? func(undefined, value) : func(value);
                    return [result, 1 / result];
                });

                assert.deepStrictEqual(actual, expected);
            });
        });

        it('`_.' + methodName + '` should convert objects to `NaN`', function () {
            assert.deepStrictEqual(func(0, {}), NaN);
            assert.deepStrictEqual(func({}, 0), NaN);
        });

        it('`_.' + methodName + '` should return an unwrapped value when implicitly chaining', function () {
            var actual = _(1)[methodName](2).value();
            assert.ok(!(actual instanceof _));
        });

        it('`_.' + methodName + '` should return a wrapped value when explicitly chaining', function () {
            var actual = _(1).chain()[methodName](2);
            assert.ok(actual instanceof _);
        });
    });
});
