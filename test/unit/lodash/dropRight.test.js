var assert = require('assert');
var falsey = require('../helpers/falsey');
var LARGE_ARRAY_SIZE = require('../helpers/largeArraySize');
var isEven = require('../helpers/isEven');
var map = require('../../../cartridges/lodash/map');
var each = require('../../../cartridges/lodash/each');
var range = require('../../../cartridges/lodash/range');
var dropRight = require('../../../cartridges/lodash/dropRight');
var drop = require('../../../cartridges/lodash/drop');
var filter = require('../../../cartridges/lodash/filter');
var _ = require('../../../cartridges/lodash/wrapperLodash');

describe('dropRight', function () {
    var array = [1, 2, 3];

    it('should drop the last two elements', function () {
        assert.deepStrictEqual(dropRight(array, 2), [1]);
    });

    it('should treat falsey `n` values, except `undefined`, as `0`', function () {
        var expected = map(falsey, function (value) {
            return value === undefined ? [1, 2] : array;
        });

        var actual = map(falsey, function (n) {
            return dropRight(array, n);
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should return all elements when `n` < `1`', function () {
        each([0, -1, -Infinity], function (n) {
            assert.deepStrictEqual(dropRight(array, n), array);
        });
    });

    it('should return an empty array when `n` >= `length`', function () {
        each([3, 4, Math.pow(2, 32), Infinity], function (n) {
            assert.deepStrictEqual(dropRight(array, n), []);
        });
    });

    it('should coerce `n` to an integer', function () {
        assert.deepStrictEqual(dropRight(array, 1.6), [1, 2]);
    });

    it('should work in a lazy sequence', function () {
        array = range(1, LARGE_ARRAY_SIZE + 1);
        var values = [];
        var predicate = function (value) { values.push(value); return isEven(value); };

        var actual = _(array).dropRight(2).dropRight().value();

        assert.deepEqual(actual, array.slice(0, -3));

        actual = _(array).filter(predicate).dropRight(2).dropRight()
            .value();
        assert.deepEqual(values, array);
        assert.deepEqual(actual, dropRight(dropRight(filter(array, predicate), 2)));

        actual = _(array).dropRight(2).drop().dropRight()
            .drop(2)
            .value();
        assert.deepEqual(actual, drop(dropRight(drop(dropRight(array, 2))), 2));

        values = [];

        actual = _(array).dropRight().filter(predicate).dropRight(2)
            .drop()
            .dropRight()
            .drop(2)
            .value();
        assert.deepEqual(values, array.slice(0, -1));
        assert.deepEqual(actual, drop(dropRight(drop(dropRight(filter(dropRight(array), predicate), 2))), 2));
    });
});
