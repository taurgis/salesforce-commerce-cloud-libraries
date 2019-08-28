var assert = require('assert');
var args = require('../helpers/args');
var LARGE_ARRAY_SIZE = require('../helpers/largeArraySize');
var stubNaN = require('../helpers/stubs').stubNaN;
var each = require('../../../cartridges/lodash/each');
var map = require('../../../cartridges/lodash/map');
var intersection = require('../../../cartridges/lodash/intersection');
var intersectionBy = require('../../../cartridges/lodash/intersectionBy');
var intersectionWith = require('../../../cartridges/lodash/intersectionWith');
var constant = require('../../../cartridges/lodash/constant');
var toString = require('../../../cartridges/lodash/toString');
var times = require('../../../cartridges/lodash/times');
var range = require('../../../cartridges/lodash/range');
var _ = require('../../../cartridges/lodash/wrapperLodash');

describe('intersection methods', function () {
    each(['intersection', 'intersectionBy', 'intersectionWith'], function (methodName) {
        var func = (function () {
            switch (methodName) {
                case 'intersection': return intersection;
                case 'intersectionBy': return intersectionBy;
                case 'intersectionWith': return intersectionWith;
                default: return null;
            }
        }());

        it('`_.' + methodName + '` should return the intersection of two arrays', function () {
            var actual = func([2, 1], [2, 3]);
            assert.deepStrictEqual(actual, [2]);
        });

        it('`_.' + methodName + '` should return the intersection of multiple arrays', function () {
            var actual = func([2, 1, 2, 3], [3, 4], [3, 2]);
            assert.deepStrictEqual(actual, [3]);
        });

        it('`_.' + methodName + '` should return an array of unique values', function () {
            var actual = func([1, 1, 3, 2, 2], [5, 2, 2, 1, 4], [2, 1, 1]);
            assert.deepStrictEqual(actual, [1, 2]);
        });

        it('`_.' + methodName + '` should work with a single array', function () {
            var actual = func([1, 1, 3, 2, 2]);
            assert.deepStrictEqual(actual, [1, 3, 2]);
        });

        it('`_.' + methodName + '` should work with `arguments` objects', function () {
            var array = [0, 1, null, 3];
            var expected = [1, 3];

            assert.deepStrictEqual(func(array, args), expected);
            assert.deepStrictEqual(func(args, array), expected);
        });

        it('`_.' + methodName + '` should treat `-0` as `0`', function () {
            var values = [-0, 0];
            var expected = map(values, constant(['0']));

            var actual = map(values, function (value) {
                return map(func(values, [value]), toString);
            });

            assert.deepStrictEqual(actual, expected);
        });

        it('`_.' + methodName + '` should match `NaN`', function () {
            var actual = func([1, NaN, 3], [NaN, 5, NaN]);
            assert.deepStrictEqual(actual, [NaN]);
        });

        it('`_.' + methodName + '` should work with large arrays of `-0` as `0`', function () {
            var values = [-0, 0];
            var expected = map(values, constant(['0']));

            var actual = map(values, function (value) {
                var largeArray = times(LARGE_ARRAY_SIZE, constant(value));
                return map(func(values, largeArray), toString);
            });

            assert.deepStrictEqual(actual, expected);
        });

        it('`_.' + methodName + '` should work with large arrays of `NaN`', function () {
            var largeArray = times(LARGE_ARRAY_SIZE, stubNaN);
            assert.deepStrictEqual(func([1, NaN, 3], largeArray), [NaN]);
        });

        it('`_.' + methodName + '` should work with large arrays of objects', function () {
            var object = {};
            var largeArray = times(LARGE_ARRAY_SIZE, constant(object));

            assert.deepStrictEqual(func([object], largeArray), [object]);
            assert.deepStrictEqual(func(range(LARGE_ARRAY_SIZE), [1]), [1]);
        });

        it('`_.' + methodName + '` should treat values that are not arrays or `arguments` objects as empty', function () {
            var array = [0, 1, null, 3];
            assert.deepStrictEqual(func(array, 3, { '0': 1 }, null), []);
            assert.deepStrictEqual(func(null, array, null, [2, 3]), []);
            assert.deepStrictEqual(func(array, null, args, null), []);
        });

        it('`_.' + methodName + '` should return a wrapped value when chaining', function () {
            var wrapped = _([1, 3, 2])[methodName]([5, 2, 1, 4]);
            assert.ok(wrapped instanceof _);
            assert.deepEqual(wrapped.value(), [1, 2]);
        });
    });
});
