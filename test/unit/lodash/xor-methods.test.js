var assert = require('assert');
var xor = require('../../../cartridges/lodash/xor');
var xorBy = require('../../../cartridges/lodash/xorBy');
var xorWith = require('../../../cartridges/lodash/xorWith');
var each = require('../../../cartridges/lodash/each');
var range = require('../../../cartridges/lodash/range');
var map = require('../../../cartridges/lodash/map');
var _ = require('../../../cartridges/lodash/wrapperLodash');
var args = require('../helpers/args');
var LARGE_ARRAY_SIZE = require('../helpers/largeArraySize');

describe('xor methods', function () {
    each(['xor', 'xorBy', 'xorWith'], function (methodName) {
        var func = (function () {
            switch (methodName) {
                case 'xor': return xor;
                case 'xorBy': return xorBy;
                case 'xorWith': return xorWith;
                default: return null;
            }
        }());

        it('`_.' + methodName + '` should return the symmetric difference of two arrays', function () {
            var actual = func([2, 1], [2, 3]);
            assert.deepStrictEqual(actual, [1, 3]);
        });

        it('`_.' + methodName + '` should return the symmetric difference of multiple arrays', function () {
            var actual = func([2, 1], [2, 3], [3, 4]);
            assert.deepStrictEqual(actual, [1, 4]);

            actual = func([1, 2], [2, 1], [1, 2]);
            assert.deepStrictEqual(actual, []);
        });

        it('`_.' + methodName + '` should return an empty array when comparing the same array', function () {
            var array = [1];
            var actual = func(array, array, array);

            assert.deepStrictEqual(actual, []);
        });

        it('`_.' + methodName + '` should return an array of unique values', function () {
            var actual = func([1, 1, 2, 5], [2, 2, 3, 5], [3, 4, 5, 5]);
            assert.deepStrictEqual(actual, [1, 4]);

            actual = func([1, 1]);
            assert.deepStrictEqual(actual, [1]);
        });

        it('`_.' + methodName + '` should return a new array when a single array is given', function () {
            var array = [1];
            assert.notStrictEqual(func(array), array);
        });

        it('`_.' + methodName + '` should ignore individual secondary arguments', function () {
            var array = [0];
            assert.deepStrictEqual(func(array, 3, null, { '0': 1 }), array);
        });

        it('`_.' + methodName + '` should ignore values that are not arrays or `arguments` objects', function () {
            var array = [1, 2];
            assert.deepStrictEqual(func(array, 3, { '0': 1 }, null), array);
            assert.deepStrictEqual(func(null, array, null, [2, 3]), [1, 3]);
            assert.deepStrictEqual(func(array, null, args, null), [3]);
        });

        it('`_.' + methodName + '` should return a wrapped value when chaining', function () {
            var wrapped = _([1, 2, 3])[methodName]([5, 2, 1, 4]);
            assert.ok(wrapped instanceof _);
        });

        it('`_.' + methodName + '` should work when in a lazy sequence before `head` or `last`', function () {
            var array = range(LARGE_ARRAY_SIZE + 1);
            var wrapped = _(array).slice(1)[methodName]([LARGE_ARRAY_SIZE, LARGE_ARRAY_SIZE + 1]);

            var actual = map(['head', 'last'], function (methodNameFn) {
                return wrapped[methodNameFn]().value();
            });

            assert.deepEqual(actual, [1, LARGE_ARRAY_SIZE + 1]);
        });
    });
});
