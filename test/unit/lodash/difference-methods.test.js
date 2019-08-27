var assert = require('assert');
var each = require('../../../cartridges/lodash/each');
var map = require('../../../cartridges/lodash/map');
var toString = require('../../../cartridges/lodash/toString');
var range = require('../../../cartridges/lodash/range');
var times = require('../../../cartridges/lodash/times');
var difference = require('../../../cartridges/lodash/difference');
var differenceBy = require('../../../cartridges/lodash/differenceBy');
var differenceWith = require('../../../cartridges/lodash/differenceWith');
var constant = require('../../../cartridges/lodash/constant');
var LARGE_ARRAY_SIZE = require('../helpers/largeArraySize');
var stubOne = require('../helpers/stubs').stubOne;
var stubNaN = require('../helpers/stubs').stubNaN;
var args = require('../helpers/args');

describe('difference methods', function () {
    each(['difference', 'differenceBy', 'differenceWith'], function (methodName) {
        var func = (function () {
            switch (methodName) {
                case 'difference': return difference;
                case 'differenceBy': return differenceBy;
                case 'differenceWith': return differenceWith;
                default: return null;
            }
        }());
        it('`_.' + methodName + '` should return the difference of two arrays', function () {
            var actual = func([2, 1], [2, 3]);
            assert.deepStrictEqual(actual, [1]);
        });

        it('`_.' + methodName + '` should return the difference of multiple arrays', function () {
            var actual = func([2, 1, 2, 3], [3, 4], [3, 2]);
            assert.deepStrictEqual(actual, [1]);
        });

        it('`_.' + methodName + '` should treat `-0` as `0`', function () {
            var array = [-0, 0];

            var actual = map(array, function (value) {
                return func(array, [value]);
            });

            assert.deepStrictEqual(actual, [[], []]);

            actual = map(func([-0, 1], [1]), toString);
            assert.deepStrictEqual(actual, ['0']);
        });

        it('`_.' + methodName + '` should match `NaN`', function () {
            assert.deepStrictEqual(func([1, NaN, 3], [NaN, 5, NaN]), [1, 3]);
        });

        it('`_.' + methodName + '` should work with large arrays', function () {
            var array1 = range(LARGE_ARRAY_SIZE + 1);
            var array2 = range(LARGE_ARRAY_SIZE);
            var a = {};
            var b = {};
            var c = {};

            array1.push(a, b, c);
            array2.push(b, c, a);

            assert.deepStrictEqual(func(array1, array2), [LARGE_ARRAY_SIZE]);
        });

        it('`_.' + methodName + '` should work with large arrays of `-0` as `0`', function () {
            var array = [-0, 0];

            var actual = map(array, function (value) {
                var largeArray = times(LARGE_ARRAY_SIZE, constant(value));
                return func(array, largeArray);
            });

            assert.deepStrictEqual(actual, [[], []]);

            var largeArray = times(LARGE_ARRAY_SIZE, stubOne);
            actual = map(func([-0, 1], largeArray), toString);
            assert.deepStrictEqual(actual, ['0']);
        });

        it('`_.' + methodName + '` should work with large arrays of `NaN`', function () {
            var largeArray = times(LARGE_ARRAY_SIZE, stubNaN);
            assert.deepStrictEqual(func([1, NaN, 3], largeArray), [1, 3]);
        });

        it('`_.' + methodName + '` should work with large arrays of objects', function () {
            var object1 = {};
            var object2 = {};
            var largeArray = times(LARGE_ARRAY_SIZE, constant(object1));

            assert.deepStrictEqual(func([object1, object2], largeArray), [object2]);
        });

        it('`_.' + methodName + '` should ignore values that are not array-like', function () {
            var array = [1, null, 3];

            assert.deepStrictEqual(func(args, 3, { '0': 1 }), [1, 2, 3]);
            assert.deepStrictEqual(func(null, array, 1), []);
            assert.deepStrictEqual(func(array, args, null), [null]);
        });
    });
});
