var assert = require('assert');
var drop = require('../../../cartridges/lodash/drop');
var falsey = require('../helpers/falsey');
var LARGE_ARRAY_SIZE = require('../helpers/largeArraySize');
var isEven = require('../helpers/isEven');
var map = require('../../../cartridges/lodash/map');
var each = require('../../../cartridges/lodash/each');
var range = require('../../../cartridges/lodash/range');
var filter = require('../../../cartridges/lodash/filter');
var dropRight = require('../../../cartridges/lodash/dropRight');
var _ = require('../../../cartridges/lodash/wrapperLodash');

describe('drop', function () {
    var array = [1, 2, 3];

    it('should drop the first two elements', function () {
        assert.deepStrictEqual(drop(array, 2), [3]);
    });

    it('should treat falsey `n` values, except `undefined`, as `0`', function () {
        var expected = map(falsey, function (value) {
            return value === undefined ? [2, 3] : array;
        });

        var actual = map(falsey, function (n) {
            return drop(array, n);
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should return all elements when `n` < `1`', function () {
        each([0, -1, -Infinity], function (n) {
            assert.deepStrictEqual(drop(array, n), array);
        });
    });

    it('should return an empty array when `n` >= `length`', function () {
        each([3, 4, Math.pow(2, 32), Infinity], function (n) {
            assert.deepStrictEqual(drop(array, n), []);
        });
    });

    it('should coerce `n` to an integer', function () {
        assert.deepStrictEqual(drop(array, 1.6), [2, 3]);
    });

    it('should work in a lazy sequence', function () {
        array = range(1, LARGE_ARRAY_SIZE + 1);
        var values = [];
        var predicate = function (value) { values.push(value); return isEven(value); };

        var actual = _(array).drop(2).drop().value();

        assert.deepEqual(actual, array.slice(3));

        actual = _(array).filter(predicate).drop(2).drop()
            .value();
        assert.deepEqual(values, array);
        assert.deepEqual(actual, drop(drop(filter(array, predicate), 2)));

        actual = _(array).drop(2).dropRight().drop()
            .dropRight(2)
            .value();
        assert.deepEqual(actual, dropRight(drop(dropRight(drop(array, 2))), 2));

        values = [];

        actual = _(array).drop().filter(predicate).drop(2)
            .dropRight()
            .drop()
            .dropRight(2)
            .value();
        assert.deepEqual(values, array.slice(1));
        assert.deepEqual(actual, dropRight(drop(dropRight(drop(filter(drop(array), predicate), 2))), 2));
    });
});
