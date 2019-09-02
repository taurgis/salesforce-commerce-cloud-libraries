var assert = require('assert');
var stubZero = require('../helpers/stubs').stubZero;
var falsey = require('../helpers/falsey');
var indexOf = require('../../../cartridges/lodash/indexOf');
var map = require('../../../cartridges/lodash/map');
var constant = require('../../../cartridges/lodash/constant');

describe('indexOf', function () {
    var array = [1, 2, 3, 1, 2, 3];

    it('`_.indexOf` should return the index of the first matched value', function () {
        assert.strictEqual(indexOf(array, 3), 2);
    });

    it('`_.indexOf` should work with a positive `fromIndex`', function () {
        assert.strictEqual(indexOf(array, 1, 2), 3);
    });

    it('`_.indexOf` should work with a `fromIndex` >= `length`', function () {
        var values = [6, 8, Math.pow(2, 32), Infinity];
        var expected = map(values, constant([-1, -1, -1]));

        var actual = map(values, function (fromIndex) {
            return [
                indexOf(array, undefined, fromIndex),
                indexOf(array, 1, fromIndex),
                indexOf(array, '', fromIndex)
            ];
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('`_.indexOf` should work with a negative `fromIndex`', function () {
        assert.strictEqual(indexOf(array, 2, -3), 4);
    });

    it('`_.indexOf` should work with a negative `fromIndex` <= `-length`', function () {
        var values = [-6, -8, -Infinity];
        var expected = map(values, stubZero);

        var actual = map(values, function (fromIndex) {
            return indexOf(array, 1, fromIndex);
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('`_.indexOf` should treat falsey `fromIndex` values as `0`', function () {
        var expected = map(falsey, stubZero);

        var actual = map(falsey, function (fromIndex) {
            return indexOf(array, 1, fromIndex);
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('`_.indexOf` should coerce `fromIndex` to an integer', function () {
        assert.strictEqual(indexOf(array, 2, 1.2), 1);
    });
});
