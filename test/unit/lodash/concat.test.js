var assert = require('assert');
var concat = require('../../../cartridges/lodash/concat');
var map = require('../../../cartridges/lodash/map');
var _ = require('../../../cartridges/lodash/wrapperLodash');

describe('concat', function () {
    it('should shallow clone `array`', function () {
        var array = [1, 2, 3];
        var actual = concat(array);

        assert.deepStrictEqual(actual, array);
        assert.notStrictEqual(actual, array);
    });

    it('should concat arrays and values', function () {
        var array = [1];
        var actual = concat(array, 2, [3], [[4]]);

        assert.deepStrictEqual(actual, [1, 2, 3, [4]]);
        assert.deepStrictEqual(array, [1]);
    });

    it('should cast non-array `array` values to arrays', function () {
        var values = [, null, undefined, false, true, 1, NaN, 'a']; // eslint-disable-line

        var expected = map(values, function (value, index) {
            return index ? [value] : [];
        });

        var actual = map(values, function (value, index) {
            return index ? concat(value) : concat();
        });

        assert.deepStrictEqual(actual, expected);

        expected = map(values, function (value) {
            return [value, 2, [3]];
        });

        actual = map(values, function (value) {
            return concat(value, [2], [[3]]);
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should treat sparse arrays as dense', function () {
        var expected = [];
        var actual = concat(Array(1), Array(1));

        expected.push(undefined, undefined);

        assert.ok('0' in actual);
        assert.ok('1' in actual);
        assert.deepStrictEqual(actual, expected);
    });

    it('should return a new wrapped array', function () {
        var array = [1];
        var wrapped = _(array).concat([2, 3]);
        var actual = wrapped.value();

        assert.deepEqual(array, [1]);
        assert.deepEqual(actual, [1, 2, 3]);
    });
});
