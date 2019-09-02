var assert = require('assert');
var takeRight = require('../../../cartridges/lodash/takeRight');
var take = require('../../../cartridges/lodash/take');
var map = require('../../../cartridges/lodash/map');
var each = require('../../../cartridges/lodash/each');
var range = require('../../../cartridges/lodash/range');
var filter = require('../../../cartridges/lodash/filter');
var _ = require('../../../cartridges/lodash/wrapperLodash');
var { falsey } = require('../helpers/stubs');
var LARGE_ARRAY_SIZE = require('../helpers/largeArraySize');
var isEven = require('../helpers/isEven');

describe('takeRight', function () {
    var array = [1, 2, 3];

    it('should take the last two elements', function () {
        assert.deepStrictEqual(takeRight(array, 2), [2, 3]);
    });

    it('should treat falsey `n` values, except `undefined`, as `0`', function () {
        var expected = map(falsey, function (value) {
            return value === undefined ? [3] : [];
        });

        var actual = map(falsey, function (n) {
            return takeRight(array, n);
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should return an empty array when `n` < `1`', function () {
        each([0, -1, -Infinity], function (n) {
            assert.deepStrictEqual(takeRight(array, n), []);
        });
    });

    it('should return all elements when `n` >= `length`', function () {
        each([3, 4, Math.pow(2, 32), Infinity], function (n) {
            assert.deepStrictEqual(takeRight(array, n), array);
        });
    });

    it('should work as an iteratee for methods like `_.map`', function () {
        var arrayFn = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
        var actual = map(arrayFn, takeRight);

        assert.deepStrictEqual(actual, [[3], [6], [9]]);
    });

    it('should work in a lazy sequence', function () {
        var arrayFn = range(LARGE_ARRAY_SIZE);
        var predicate = function (value) { values.push(value); return isEven(value); };
        var values = [];
        var actual = _(arrayFn).takeRight(2).takeRight().value();

        assert.deepEqual(actual, takeRight(takeRight(arrayFn)));

        actual = _(arrayFn).filter(predicate).takeRight(2).takeRight()
            .value();
        assert.deepEqual(values, arrayFn);
        assert.deepEqual(actual, takeRight(takeRight(filter(arrayFn, predicate), 2)));

        actual = _(arrayFn).takeRight(6).take(4).takeRight(2)
            .take()
            .value();
        assert.deepEqual(actual, take(takeRight(take(takeRight(arrayFn, 6), 4), 2)));

        values = [];

        actual = _(arrayFn).filter(predicate).takeRight(6).take(4)
            .takeRight(2)
            .take()
            .value();
        assert.deepEqual(values, arrayFn);
        assert.deepEqual(actual, take(takeRight(take(takeRight(filter(arrayFn, predicate), 6), 4), 2)));
    });
});
