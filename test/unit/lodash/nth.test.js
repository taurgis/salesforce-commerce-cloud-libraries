var assert = require('assert');
var nth = require('../../../cartridges/lodash/nth');
var map = require('../../../cartridges/lodash/map');
var range = require('../../../cartridges/lodash/range');
var { falsey, stubA, stubB, noop } = require('../helpers/stubs');

describe('nth', function () {
    var array = ['a', 'b', 'c', 'd'];

    it('should get the nth element of `array`', function () {
        var actual = map(array, function (value, index) {
            return nth(array, index);
        });

        assert.deepStrictEqual(actual, array);
    });

    it('should work with a negative `n`', function () {
        var actual = map(range(1, array.length + 1), function (n) {
            return nth(array, -n);
        });

        assert.deepStrictEqual(actual, ['d', 'c', 'b', 'a']);
    });

    it('should coerce `n` to an integer', function () {
        var values = falsey;
        var expected = map(values, stubA);

        var actual = map(values, function (n) {
            return n ? nth(array, n) : nth(array);
        });

        assert.deepStrictEqual(actual, expected);

        values = ['1', 1.6];
        expected = map(values, stubB);

        actual = map(values, function (n) {
            return nth(array, n);
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should return `undefined` for empty arrays', function () {
        var values = [null, undefined, []];
        var expected = map(values, noop);

        var actual = map(values, function (arrayFn) {
            return nth(arrayFn, 1);
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should return `undefined` for non-indexes', function () {
        var arrayFn = [1, 2];
        var values = [Infinity, arrayFn.length];
        var expected = map(values, noop);

        arrayFn[-1] = 3;

        var actual = map(values, function (n) {
            return nth(arrayFn, n);
        });

        assert.deepStrictEqual(actual, expected);
    });
});
