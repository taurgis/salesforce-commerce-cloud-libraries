var assert = require('assert');
var { stubTrue, stubFalse } = require('../helpers/stubs');
var { MAX_INTEGER } = require('../helpers/max');
var falsey = require('../helpers/falsey');
var args = require('../helpers/args');
var isInteger = require('../../../cartridges/lodash/isInteger');
var isSafeInteger = require('../../../cartridges/lodash/isSafeInteger');
var map = require('../../../cartridges/lodash/map');
var each = require('../../../cartridges/lodash/each');

describe('isInteger methods', function () {
    each(['isInteger', 'isSafeInteger'], function (methodName) {
        var func = (function () {
            switch (methodName) {
                case 'isInteger': return isInteger;
                case 'isSafeInteger': return isSafeInteger;

                default: return null;
            }
        }());
        var isSafe = methodName === 'isSafeInteger';

        it('`_.' + methodName + '` should return `true` for integer values', function () {
            var values = [-1, 0, 1];
            var expected = map(values, stubTrue);

            var actual = map(values, function (value) {
                return func(value);
            });

            assert.deepStrictEqual(actual, expected);
            assert.strictEqual(func(MAX_INTEGER), !isSafe);
        });

        it('should return `false` for non-integer number values', function () {
            var values = [NaN, Infinity, -Infinity, Object(1), 3.14];
            var expected = map(values, stubFalse);

            var actual = map(values, function (value) {
                return func(value);
            });

            assert.deepStrictEqual(actual, expected);
        });

        it('should return `false` for non-numeric values', function () {
            var expected = map(falsey, function (value) {
                return value === 0;
            });

            var actual = map(falsey, function (value, index) {
                return index ? func(value) : func();
            });

            assert.deepStrictEqual(actual, expected);

            assert.strictEqual(func(args), false);
            assert.strictEqual(func([1, 2, 3]), false);
            assert.strictEqual(func(true), false);
            assert.strictEqual(func(new Date()), false);
            assert.strictEqual(func(new Error()), false);
            assert.strictEqual(func({ 'a': 1 }), false);
            assert.strictEqual(func(/x/), false);
            assert.strictEqual(func('a'), false);
        });
    });
});
