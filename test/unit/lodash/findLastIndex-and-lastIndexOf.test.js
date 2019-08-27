var assert = require('assert');
var falsey = require('../helpers/falsey');
var stubZero = require('../helpers/stubs').stubZero;
var each = require('../../../cartridges/lodash/each');
var map = require('../../../cartridges/lodash/map');
var curry = require('../../../cartridges/lodash/curry');
var eq = require('../../../cartridges/lodash/eq');
var findLastIndex = require('../../../cartridges/lodash/findLastIndex');
var lastIndexOf = require('../../../cartridges/lodash/lastIndexOf');
var constant = require('../../../cartridges/lodash/constant');
var identity = require('../../../cartridges/lodash/identity');

describe('findLastIndex and lastIndexOf', function () {
    each(['findLastIndex', 'lastIndexOf'], function (methodName) {
        var array = [1, 2, 3, 1, 2, 3];
        var func = (function () {
            switch (methodName) {
                case 'findLastIndex': return findLastIndex;
                case 'lastIndexOf': return lastIndexOf;

                default: return null;
            }
        }());
        var resolve = methodName === 'findLastIndex' ? curry(eq) : identity;

        it('`_.' + methodName + '` should return the index of the last matched value', function () {
            assert.strictEqual(func(array, resolve(3)), 5);
        });

        it('`_.' + methodName + '` should work with a positive `fromIndex`', function () {
            assert.strictEqual(func(array, resolve(1), 2), 0);
        });

        it('`_.' + methodName + '` should work with a `fromIndex` >= `length`', function () {
            var values = [6, 8, Math.pow(2, 32), Infinity];
            var expected = map(values, constant([-1, 3, -1]));

            var actual = map(values, function (fromIndex) {
                return [
                    func(array, resolve(undefined), fromIndex),
                    func(array, resolve(1), fromIndex),
                    func(array, resolve(''), fromIndex)
                ];
            });

            assert.deepStrictEqual(actual, expected);
        });

        it('`_.' + methodName + '` should work with a negative `fromIndex`', function () {
            assert.strictEqual(func(array, resolve(2), -3), 1);
        });

        it('`_.' + methodName + '` should work with a negative `fromIndex` <= `-length`', function () {
            var values = [-6, -8, -Infinity];
            var expected = map(values, stubZero);

            var actual = map(values, function (fromIndex) {
                return func(array, resolve(1), fromIndex);
            });

            assert.deepStrictEqual(actual, expected);
        });

        it('`_.' + methodName + '` should treat falsey `fromIndex` values correctly', function () {
            var expected = map(falsey, function (value) {
                return value === undefined ? 5 : -1;
            });

            var actual = map(falsey, function (fromIndex) {
                return func(array, resolve(3), fromIndex);
            });

            assert.deepStrictEqual(actual, expected);
        });

        it('`_.' + methodName + '` should coerce `fromIndex` to an integer', function () {
            assert.strictEqual(func(array, resolve(2), 4.2), 4);
        });
    });
});
