var assert = require('assert');
var sortBy = require('../../../cartridges/lodash/sortBy');
var each = require('../../../cartridges/lodash/each');
var times = require('../../../cartridges/lodash/times');
var map = require('../../../cartridges/lodash/map');
var toString = require('../../../cartridges/lodash/toString');
var uniq = require('../../../cartridges/lodash/uniq');
var uniqBy = require('../../../cartridges/lodash/uniqBy');
var uniqWith = require('../../../cartridges/lodash/uniqWith');
var sortedUniq = require('../../../cartridges/lodash/sortedUniq');
var sortedUniqBy = require('../../../cartridges/lodash/sortedUniqBy');
var isEven = require('../helpers/isEven');
var LARGE_ARRAY_SIZE = require('../helpers/largeArraySize');

describe('uniq methods', function () {
    each(['uniq', 'uniqBy', 'uniqWith', 'sortedUniq', 'sortedUniqBy'], function (methodName) {
        var func = (function () {
            switch (methodName) {
                case 'uniq': return uniq;
                case 'uniqBy': return uniqBy;
                case 'uniqWith': return uniqWith;
                case 'sortedUniq': return sortedUniq;
                case 'sortedUniqBy': return sortedUniqBy;

                default: return null;
            }
        }());
        var isSorted = /^sorted/.test(methodName);
        var objects = [{ 'a': 2 }, { 'a': 3 }, { 'a': 1 }, { 'a': 2 }, { 'a': 3 }, { 'a': 1 }];

        if (isSorted) {
            objects = sortBy(objects, 'a');
        } else {
            it('`_.' + methodName + '` should return unique values of an unsorted array', function () {
                var array = [2, 1, 2];
                assert.deepStrictEqual(func(array), [2, 1]);
            });
        }
        it('`_.' + methodName + '` should return unique values of a sorted array', function () {
            var array = [1, 2, 2];
            assert.deepStrictEqual(func(array), [1, 2]);
        });

        it('`_.' + methodName + '` should treat object instances as unique', function () {
            assert.deepStrictEqual(func(objects), objects);
        });

        it('`_.' + methodName + '` should treat `-0` as `0`', function () {
            var actual = map(func([-0, 0]), toString);
            assert.deepStrictEqual(actual, ['0']);
        });

        it('`_.' + methodName + '` should match `NaN`', function () {
            assert.deepStrictEqual(func([NaN, NaN]), [NaN]);
        });

        it('`_.' + methodName + '` should work with large arrays', function () {
            var largeArray = [];
            var expected = [0, {}, 'a'];
            var count = Math.ceil(LARGE_ARRAY_SIZE / expected.length);

            each(expected, function (value) {
                times(count, function () {
                    largeArray.push(value);
                });
            });

            assert.deepStrictEqual(func(largeArray), expected);
        });

        it('`_.' + methodName + '` should work with large arrays of `-0` as `0`', function () {
            var largeArray = times(LARGE_ARRAY_SIZE, function (index) {
                return isEven(index) ? -0 : 0;
            });

            var actual = map(func(largeArray), toString);
            assert.deepStrictEqual(actual, ['0']);
        });

        it('`_.' + methodName + '` should work with large arrays of boolean, `NaN`, and nullish values', function () {
            var largeArray = [];
            var expected = [null, undefined, false, true, NaN];
            var count = Math.ceil(LARGE_ARRAY_SIZE / expected.length);

            each(expected, function (value) {
                times(count, function () {
                    largeArray.push(value);
                });
            });

            assert.deepStrictEqual(func(largeArray), expected);
        });

        it('`_.' + methodName + '` should work with large arrays of symbols', function () {
            if (Symbol) {
                var largeArray = times(LARGE_ARRAY_SIZE, Symbol);
                assert.deepStrictEqual(func(largeArray), largeArray);
            }
        });

        it('`_.' + methodName + '` should work with large arrays of well-known symbols', function () {
            // See http://www.ecma-international.org/ecma-262/6.0/#sec-well-known-symbols.
            if (Symbol) {
                var expected = [
                    Symbol.hasInstance, Symbol.isConcatSpreadable, Symbol.iterator,
                    Symbol.match, Symbol.replace, Symbol.search, Symbol.species,
                    Symbol.split, Symbol.toPrimitive, Symbol.toStringTag, Symbol.unscopables
                ];

                var largeArray = [];
                var count = Math.ceil(LARGE_ARRAY_SIZE / expected.length);

                expected = map(expected, function (symbol) {
                    return symbol || {};
                });

                each(expected, function (value) {
                    times(count, function () {
                        largeArray.push(value);
                    });
                });

                assert.deepStrictEqual(func(largeArray), expected);
            }
        });

        it('`_.' + methodName + '` should distinguish between numbers and numeric strings', function () {
            var largeArray = [];
            var expected = ['2', 2, Object('2'), Object(2)];
            var count = Math.ceil(LARGE_ARRAY_SIZE / expected.length);

            each(expected, function (value) {
                times(count, function () {
                    largeArray.push(value);
                });
            });

            assert.deepStrictEqual(func(largeArray), expected);
        });
    });
});
