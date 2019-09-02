var assert = require('assert');
var round = require('../../../cartridges/lodash/round');
var ceil = require('../../../cartridges/lodash/ceil');
var floor = require('../../../cartridges/lodash/floor');
var map = require('../../../cartridges/lodash/map');
var isNaN = require('../../../cartridges/lodash/isNaN');
var each = require('../../../cartridges/lodash/each');
var { MAX_SAFE_INTEGER } = require('../helpers/max');
var { stubFalse } = require('../helpers/stubs');

describe('round methods', function () {
    each(['ceil', 'floor', 'round'], function (methodName) {
        var func = (function () {
            switch (methodName) {
                case 'ceil': return ceil;
                case 'floor': return floor;
                case 'round': return round;

                default: return null;
            }
        }());
        var isCeil = methodName === 'ceil';
        var isFloor = methodName === 'floor';

        it('`_.' + methodName + '` should return a rounded number without a precision', function () {
            var actual = func(4.006);
            assert.strictEqual(actual, isCeil ? 5 : 4);
        });

        it('`_.' + methodName + '` should work with a precision of `0`', function () {
            var actual = func(4.006, 0);
            assert.strictEqual(actual, isCeil ? 5 : 4);
        });

        it('`_.' + methodName + '` should work with a positive precision', function () {
            var actual = func(4.016, 2);
            assert.strictEqual(actual, isFloor ? 4.01 : 4.02);

            actual = func(4.1, 2);
            assert.strictEqual(actual, 4.1);
        });

        it('`_.' + methodName + '` should work with a negative precision', function () {
            var actual = func(4160, -2);
            assert.strictEqual(actual, isFloor ? 4100 : 4200);
        });

        it('`_.' + methodName + '` should coerce `precision` to an integer', function () {
            var actual = func(4.006, NaN);
            assert.strictEqual(actual, isCeil ? 5 : 4);

            var expected = isFloor ? 4.01 : 4.02;

            actual = func(4.016, 2.6);
            assert.strictEqual(actual, expected);

            actual = func(4.016, '+2');
            assert.strictEqual(actual, expected);
        });

        it('`_.' + methodName + '` should work with exponential notation and `precision`', function () {
            var actual = func(5e1, 2);
            assert.deepStrictEqual(actual, 50);

            actual = func('5e', 1);
            assert.deepStrictEqual(actual, NaN);

            actual = func('5e1e1', 1);
            assert.deepStrictEqual(actual, NaN);
        });

        it('`_.' + methodName + '` should preserve the sign of `0`', function () {
            var values = [[0], [-0], ['0'], ['-0'], [0, 1], [-0, 1], ['0', 1], ['-0', 1]];
            var expected = [Infinity, -Infinity, Infinity, -Infinity, Infinity, -Infinity, Infinity, -Infinity];

            var actual = map(values, function (args) {
                return 1 / func.apply(undefined, args);
            });

            assert.deepStrictEqual(actual, expected);
        });

        it('`_.' + methodName + '` should not return `NaN` for large `precision` values', function () {
            var results = [
                round(10.0000001, 1000),
                round(MAX_SAFE_INTEGER, 293)
            ];

            var expected = map(results, stubFalse);
            var actual = map(results, isNaN);

            assert.deepStrictEqual(actual, expected);
        });
    });
});
