var assert = require('assert');
var sortedIndex = require('../../../cartridges/lodash/sortedIndex');
var sortedLastIndex = require('../../../cartridges/lodash/sortedLastIndex');
var each = require('../../../cartridges/lodash/each');
var map = require('../../../cartridges/lodash/map');
var constant = require('../../../cartridges/lodash/constant');

describe('sortedIndex methods', function () {
    each(['sortedIndex', 'sortedLastIndex'], function (methodName) {
        var func = (methodName === 'sortedIndex') ? sortedIndex : sortedLastIndex;
        var isSortedIndex = methodName === 'sortedIndex';

        it('`_.' + methodName + '` should return the insert index', function () {
            var array = [30, 50];
            var values = [30, 40, 50];
            var expected = isSortedIndex ? [0, 1, 1] : [1, 1, 2];

            var actual = map(values, function (value) {
                return func(array, value);
            });

            assert.deepStrictEqual(actual, expected);
        });

        it('`_.' + methodName + '` should work with an array of strings', function () {
            var array = ['a', 'c'];
            var values = ['a', 'b', 'c'];
            var expected = isSortedIndex ? [0, 1, 1] : [1, 1, 2];

            var actual = map(values, function (value) {
                return func(array, value);
            });

            assert.deepStrictEqual(actual, expected);
        });

        it('`_.' + methodName + '` should accept a nullish `array` and a `value`', function () {
            var values = [null, undefined];
            var expected = map(values, constant([0, 0, 0]));

            var actual = map(values, function (array) {
                return [func(array, 1), func(array, undefined), func(array, NaN)];
            });

            assert.deepStrictEqual(actual, expected);
        });

        it('`_.' + methodName + '` should align with `_.sortBy` for nulls', function () {
            var array = [null, null];

            assert.strictEqual(func(array, null), isSortedIndex ? 0 : 2);
            assert.strictEqual(func(array, 1), 0);
            assert.strictEqual(func(array, 'a'), 0);
        });
    });
});

