var assert = require('assert');
var slice = require('../../../cartridges/lodash/slice');
var map = require('../../../cartridges/lodash/map');
var each = require('../../../cartridges/lodash/each');
var constant = require('../../../cartridges/lodash/constant');
var range = require('../../../cartridges/lodash/range');
var _ = require('../../../cartridges/lodash/wrapperLodash');
var { falsey } = require('../helpers/stubs');
var LARGE_ARRAY_SIZE = require('../helpers/largeArraySize');

describe('slice', function () {
    var array = [1, 2, 3];

    it('should use a default `start` of `0` and a default `end` of `length`', function () {
        var actual = slice(array);
        assert.deepStrictEqual(actual, array);
        assert.notStrictEqual(actual, array);
    });

    it('should work with a positive `start`', function () {
        assert.deepStrictEqual(slice(array, 1), [2, 3]);
        assert.deepStrictEqual(slice(array, 1, 3), [2, 3]);
    });

    it('should work with a `start` >= `length`', function () {
        each([3, 4, Math.pow(2, 32), Infinity], function (start) {
            assert.deepStrictEqual(slice(array, start), []);
        });
    });

    it('should treat falsey `start` values as `0`', function () {
        var expected = map(falsey, constant(array));

        var actual = map(falsey, function (start) {
            return slice(array, start);
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should work with a negative `start`', function () {
        assert.deepStrictEqual(slice(array, -1), [3]);
    });

    it('should work with a negative `start` <= negative `length`', function () {
        each([-3, -4, -Infinity], function (start) {
            assert.deepStrictEqual(slice(array, start), array);
        });
    });

    it('should work with `start` >= `end`', function () {
        each([2, 3], function (start) {
            assert.deepStrictEqual(slice(array, start, 2), []);
        });
    });

    it('should work with a positive `end`', function () {
        assert.deepStrictEqual(slice(array, 0, 1), [1]);
    });

    it('should work with a `end` >= `length`', function () {
        each([3, 4, Math.pow(2, 32), Infinity], function (end) {
            assert.deepStrictEqual(slice(array, 0, end), array);
        });
    });

    it('should treat falsey `end` values, except `undefined`, as `0`', function () {
        var expected = map(falsey, function (value) {
            return value === undefined ? array : [];
        });

        var actual = map(falsey, function (end, index) {
            return index ? slice(array, 0, end) : slice(array, 0);
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should work with a negative `end`', function () {
        assert.deepStrictEqual(slice(array, 0, -1), [1, 2]);
    });

    it('should work with a negative `end` <= negative `length`', function () {
        each([-3, -4, -Infinity], function (end) {
            assert.deepStrictEqual(slice(array, 0, end), []);
        });
    });

    it('should coerce `start` and `end` to integers', function () {
        var positions = [[0.1, 1.6], ['0', 1], [0, '1'], ['1'], [NaN, 1], [1, NaN]];

        var actual = map(positions, function (pos) {
            return slice.apply(_, [array].concat(pos));
        });

        assert.deepStrictEqual(actual, [[1], [1], [1], [2, 3], [1], []]);
    });

    it('should work as an iteratee for methods like `_.map`', function () {
        var arrayFn = [[1], [2, 3]];
        var actual = map(arrayFn, slice);

        assert.deepStrictEqual(actual, arrayFn);
        assert.notStrictEqual(actual, arrayFn);
    });

    it('should work in a lazy sequence', function () {
        var arrayFn = range(1, LARGE_ARRAY_SIZE + 1);
        var length = arrayFn.length;
        var wrapped = _(arrayFn);

        each(['map', 'filter'], function (methodName) {
            assert.deepEqual(wrapped[methodName]().slice(0, -1).value(), arrayFn.slice(0, -1));
            assert.deepEqual(wrapped[methodName]().slice(1).value(), arrayFn.slice(1));
            assert.deepEqual(wrapped[methodName]().slice(1, 3).value(), arrayFn.slice(1, 3));
            assert.deepEqual(wrapped[methodName]().slice(-1).value(), arrayFn.slice(-1));

            assert.deepEqual(wrapped[methodName]().slice(length).value(), arrayFn.slice(length));
            assert.deepEqual(wrapped[methodName]().slice(3, 2).value(), arrayFn.slice(3, 2));
            assert.deepEqual(wrapped[methodName]().slice(0, -length).value(), arrayFn.slice(0, -length));
            assert.deepEqual(wrapped[methodName]().slice(0, null).value(), arrayFn.slice(0, null));

            assert.deepEqual(wrapped[methodName]().slice(0, length).value(), arrayFn.slice(0, length));
            assert.deepEqual(wrapped[methodName]().slice(-length).value(), arrayFn.slice(-length));
            assert.deepEqual(wrapped[methodName]().slice(null).value(), arrayFn.slice(null));

            assert.deepEqual(wrapped[methodName]().slice(0, 1).value(), arrayFn.slice(0, 1));
            assert.deepEqual(wrapped[methodName]().slice(NaN, '1').value(), arrayFn.slice(NaN, '1'));

            assert.deepEqual(wrapped[methodName]().slice(0.1, 1.1).value(), arrayFn.slice(0.1, 1.1));
            assert.deepEqual(wrapped[methodName]().slice('0', 1).value(), arrayFn.slice('0', 1));
            assert.deepEqual(wrapped[methodName]().slice(0, '1').value(), arrayFn.slice(0, '1'));
            assert.deepEqual(wrapped[methodName]().slice('1').value(), arrayFn.slice('1'));
            assert.deepEqual(wrapped[methodName]().slice(NaN, 1).value(), arrayFn.slice(NaN, 1));
            assert.deepEqual(wrapped[methodName]().slice(1, NaN).value(), arrayFn.slice(1, NaN));
        });
    });
});
