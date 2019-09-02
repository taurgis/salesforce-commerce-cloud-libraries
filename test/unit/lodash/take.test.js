var assert = require('assert');
var take = require('../../../cartridges/lodash/take');
var map = require('../../../cartridges/lodash/map');
var each = require('../../../cartridges/lodash/each');
var range = require('../../../cartridges/lodash/range');
var filter = require('../../../cartridges/lodash/filter');
var takeRight = require('../../../cartridges/lodash/takeRight');
var _ = require('../../../cartridges/lodash/wrapperLodash');
var { falsey } = require('../helpers/stubs');
var LARGE_ARRAY_SIZE = require('../helpers/largeArraySize');
var isEven = require('../helpers/isEven');

describe('take', function () {
    var array = [1, 2, 3];

    it('should take the first two elements', function () {
        assert.deepStrictEqual(take(array, 2), [1, 2]);
    });

    it('should treat falsey `n` values, except `undefined`, as `0`', function () {
        var expected = map(falsey, function (value) {
            return value === undefined ? [1] : [];
        });

        var actual = map(falsey, function (n) {
            return take(array, n);
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should return an empty array when `n` < `1`', function () {
        each([0, -1, -Infinity], function (n) {
            assert.deepStrictEqual(take(array, n), []);
        });
    });

    it('should return all elements when `n` >= `length`', function () {
        each([3, 4, Math.pow(2, 32), Infinity], function (n) {
            assert.deepStrictEqual(take(array, n), array);
        });
    });

    it('should work as an iteratee for methods like `_.map`', function () {
        var arrayFn = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
        var actual = map(arrayFn, take);

        assert.deepStrictEqual(actual, [[1], [4], [7]]);
    });

    it('should work in a lazy sequence', function () {
        var arrayFn = range(1, LARGE_ARRAY_SIZE + 1);
        var predicate = function (value) { values.push(value); return isEven(value); };
        var values = [];
        var actual = _(arrayFn).take(2).take().value();

        assert.deepEqual(actual, take(take(arrayFn, 2)));

        actual = _(arrayFn).filter(predicate).take(2).take()
            .value();

        assert.deepEqual(actual, take(take(filter(arrayFn, predicate), 2)));

        actual = _(arrayFn).take(6).takeRight(4).take(2)
            .takeRight()
            .value();
        assert.deepEqual(actual, takeRight(take(takeRight(take(arrayFn, 6), 4), 2)));

        values = [];

        actual = _(arrayFn).take(arrayFn.length - 1).filter(predicate).take(6)
            .takeRight(4)
            .take(2)
            .takeRight()
            .value();

        assert.deepEqual(actual, takeRight(take(takeRight(take(filter(take(arrayFn, arrayFn.length - 1), predicate), 6), 4), 2)));
    });
});
