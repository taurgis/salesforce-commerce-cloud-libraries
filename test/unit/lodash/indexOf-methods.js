var assert = require('assert');
var falsey = require('../helpers/falsey');
var indexOf = require('../../../cartridges/lodash/indexOf');
var lastIndexOf = require('../../../cartridges/lodash/lastIndexOf');
var sortedIndexOf = require('../../../cartridges/lodash/sortedIndexOf');
var sortedLastIndexOf = require('../../../cartridges/lodash/sortedLastIndexOf');
var map = require('../../../cartridges/lodash/map');
var each = require('../../../cartridges/lodash/each');
var constant = require('../../../cartridges/lodash/constant');

describe('indexOf methods', function () {
    each(['indexOf', 'lastIndexOf', 'sortedIndexOf', 'sortedLastIndexOf'], function (methodName) {
        var func = (function () {
            switch (methodName) {
                case 'indexOf': return indexOf;
                case 'lastIndexOf': return lastIndexOf;
                case 'sortedIndexOf': return sortedIndexOf;
                case 'sortedLastIndexOf': return sortedLastIndexOf;
                default: return null;
            }
        }());
        var isIndexOf = !/last/i.test(methodName);
        var isSorted = /^sorted/.test(methodName);

        it('`_.' + methodName + '` should accept a falsey `array`', function () {
            var expected = map(falsey, constant(-1));

            var actual = map(falsey, function (array, index) {
                try {
                    return index ? func(array) : func();
                } catch (e) {
                    // DO NOTHING
                }
            });

            assert.deepStrictEqual(actual, expected);
        });

        it('`_.' + methodName + '` should return `-1` for an unmatched value', function () {
            var array = [1, 2, 3];
            var empty = [];

            assert.strictEqual(func(array, 4), -1);
            assert.strictEqual(func(array, 4, true), -1);
            assert.strictEqual(func(array, undefined, true), -1);

            assert.strictEqual(func(empty, undefined), -1);
            assert.strictEqual(func(empty, undefined, true), -1);
        });

        it('`_.' + methodName + '` should not match values on empty arrays', function () {
            var array = [];
            array[-1] = 0;

            assert.strictEqual(func(array, undefined), -1);
            assert.strictEqual(func(array, 0, true), -1);
        });

        it('`_.' + methodName + '` should match `NaN`', function () {
            var array = isSorted
                ? [1, 2, NaN, NaN]
                : [1, NaN, 3, NaN, 5, NaN];

            if (isSorted) {
                assert.strictEqual(func(array, NaN, true), isIndexOf ? 2 : 3);
            } else {
                assert.strictEqual(func(array, NaN), isIndexOf ? 1 : 5);
                assert.strictEqual(func(array, NaN, 2), isIndexOf ? 3 : 1);
                assert.strictEqual(func(array, NaN, -2), isIndexOf ? 5 : 3);
            }
        });

        it('`_.' + methodName + '` should match `-0` as `0`', function () {
            assert.strictEqual(func([-0], 0), 0);
            assert.strictEqual(func([0], -0), 0);
        });
    });
});
