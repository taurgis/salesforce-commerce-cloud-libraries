var assert = require('assert');
var random = require('../../../cartridges/lodash/random');
var map = require('../../../cartridges/lodash/map');
var uniq = require('../../../cartridges/lodash/uniq');
var some = require('../../../cartridges/lodash/some');
var every = require('../../../cartridges/lodash/every');
var { stubTrue } = require('../helpers/stubs');
var { MAX_INTEGER } = require('../helpers/max');

describe('random', function () {
    var array = Array(1000);

    it('should return `0` or `1` when no arguments are given', function () {
        var actual = uniq(map(array, function () {
            return random();
        })).sort();

        assert.deepStrictEqual(actual, [0, 1]);
    });

    it('should support a `min` and `max`', function () {
        var min = 5;
        var max = 10;

        assert.ok(some(array, function () {
            var result = random(min, max);
            return result >= min && result <= max;
        }));
    });

    it('should support not providing a `max`', function () {
        var min = 0;
        var max = 5;

        assert.ok(some(array, function () {
            var result = random(max);
            return result >= min && result <= max;
        }));
    });

    it('should swap `min` and `max` when `min` > `max`', function () {
        var min = 4;
        var max = 2;
        var expected = [2, 3, 4];

        var actual = uniq(map(array, function () {
            return random(min, max);
        })).sort();

        assert.deepStrictEqual(actual, expected);
    });

    it('should support large integer values', function () {
        var min = Math.pow(2, 31);
        var max = Math.pow(2, 62);

        assert.ok(every(array, function () {
            var result = random(min, max);
            return result >= min && result <= max;
        }));

        assert.ok(some(array, function () {
            return random(MAX_INTEGER);
        }));
    });

    it('should coerce arguments to finite numbers', function () {
        var actual = [
            random(NaN, NaN),
            random('1', '1'),
            random(Infinity, Infinity)
        ];

        assert.deepStrictEqual(actual, [0, 1, MAX_INTEGER]);
    });

    it('should support floats', function () {
        var min = 1.5;
        var max = 1.6;
        var actual = random(min, max);

        assert.ok(actual % 1);
        assert.ok(actual >= min && actual <= max);
    });

    it('should support providing a `floating`', function () {
        var actual = random(true);
        assert.ok(actual % 1 && actual >= 0 && actual <= 1);

        actual = random(2, true);
        assert.ok(actual % 1 && actual >= 0 && actual <= 2);

        actual = random(2, 4, true);
        assert.ok(actual % 1 && actual >= 2 && actual <= 4);
    });

    it('should work as an iteratee for methods like `_.map`', function () {
        var arrayFn = [1, 2, 3];
        var expected = map(arrayFn, stubTrue);
        var randoms = map(arrayFn, random);

        var actual = map(randoms, function (result, index) {
            return result >= 0 && result <= arrayFn[index] && (result % 1) === 0;
        });

        assert.deepStrictEqual(actual, expected);
    });
});
