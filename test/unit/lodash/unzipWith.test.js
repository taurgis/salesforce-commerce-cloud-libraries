var assert = require('assert');
var unzip = require('../../../cartridges/lodash/unzip');
var unzipWith = require('../../../cartridges/lodash/unzipWith');
var map = require('../../../cartridges/lodash/map');
var constant = require('../../../cartridges/lodash/constant');
var slice = Array.prototype.slice;

describe('unzipWith', function () {
    it('should unzip arrays combining regrouped elements with `iteratee`', function () {
        var array = [[1, 4], [2, 5], [3, 6]];

        var actual = unzipWith(array, function (a, b, c) {
            return a + b + c;
        });

        assert.deepStrictEqual(actual, [6, 15]);
    });

    it('should provide correct `iteratee` arguments', function () {
        var args;

        unzipWith([[1, 3, 5], [2, 4, 6]], function () {
            args || (args = slice.call(arguments));
        });

        assert.deepStrictEqual(args, [1, 2]);
    });

    it('should perform a basic unzip when `iteratee` is nullish', function () {
        var array = [[1, 3], [2, 4]];
        var values = [, null, undefined];
        var expected = map(values, constant(unzip(array)));

        var actual = map(values, function (value, index) {
            return index ? unzipWith(array, value) : unzipWith(array);
        });

        assert.deepStrictEqual(actual, expected);
    });
});
