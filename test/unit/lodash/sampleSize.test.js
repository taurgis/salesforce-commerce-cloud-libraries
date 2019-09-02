var assert = require('assert');
var sampleSize = require('../../../cartridges/lodash/sampleSize');
var transform = require('../../../cartridges/lodash/transform');
var each = require('../../../cartridges/lodash/each');
var map = require('../../../cartridges/lodash/map');
var values = require('../../../cartridges/lodash/values');
var difference = require('../../../cartridges/lodash/difference');
var { falsey, empties, stubArray } = require('../helpers/stubs');

describe('sampleSize', function () {
    var array = [1, 2, 3];

    it('should return an array of random elements', function () {
        var actual = sampleSize(array, 2);

        assert.strictEqual(actual.length, 2);
        assert.deepStrictEqual(difference(actual, array), []);
    });

    it('should contain elements of the collection', function () {
        var actual = sampleSize(array, array.length).sort();

        assert.deepStrictEqual(actual, array);
    });

    it('should treat falsey `size` values, except `undefined`, as `0`', function () {
        var expected = map(falsey, function (value) {
            return value === undefined ? ['a'] : [];
        });

        var actual = map(falsey, function (size, index) {
            return index ? sampleSize(['a'], size) : sampleSize(['a']);
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should return an empty array when `n` < `1` or `NaN`', function () {
        each([0, -1, -Infinity], function (n) {
            assert.deepStrictEqual(sampleSize(array, n), []);
        });
    });

    it('should return all elements when `n` >= `length`', function () {
        each([3, 4, Math.pow(2, 32), Infinity], function (n) {
            var actual = sampleSize(array, n).sort();
            assert.deepStrictEqual(actual, array);
        });
    });

    it('should coerce `n` to an integer', function () {
        var actual = sampleSize(array, 1.6);
        assert.strictEqual(actual.length, 1);
    });

    it('should sample an object', function () {
        var object = { 'a': 1, 'b': 2, 'c': 3 };
        var actual = sampleSize(object, 2);

        assert.strictEqual(actual.length, 2);
        assert.deepStrictEqual(difference(actual, values(object)), []);
    });

    it('should work as an iteratee for methods like `_.map`', function () {
        var actual = map([['a']], sampleSize);
        assert.deepStrictEqual(actual, [['a']]);
    });
});
