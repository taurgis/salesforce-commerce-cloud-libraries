var assert = require('assert');
var zipWith = require('../../../cartridges/lodash/zipWith');
var zip = require('../../../cartridges/lodash/zip');
var map = require('../../../cartridges/lodash/map');
var constant = require('../../../cartridges/lodash/constant');
var slice = Array.prototype.slice;

describe('zipWith', function () {
    it('should zip arrays combining grouped elements with `iteratee`', function () {
        var array1 = [1, 2, 3];
        var array2 = [4, 5, 6];
        var array3 = [7, 8, 9];

        var actual = zipWith(array1, array2, array3, function (a, b, c) {
            return a + b + c;
        });

        assert.deepStrictEqual(actual, [12, 15, 18]);

        var actualFn = zipWith(array1, [], function (a, b) {
            return a + (b || 0);
        });

        assert.deepStrictEqual(actualFn, [1, 2, 3]);
    });

    it('should provide correct `iteratee` arguments', function () {
        var args;

        zipWith([1, 2], [3, 4], [5, 6], function () {
            args || (args = slice.call(arguments));
        });

        assert.deepStrictEqual(args, [1, 3, 5]);
    });

    it('should perform a basic zip when `iteratee` is nullish', function () {
        var array1 = [1, 2];
        var array2 = [3, 4];
        var values = [, null, undefined];
        var expected = map(values, constant(zip(array1, array2)));

        var actual = map(values, function (value, index) {
            return index ? zipWith(array1, array2, value) : zipWith(array1, array2);
        });

        assert.deepStrictEqual(actual, expected);
    });
});
