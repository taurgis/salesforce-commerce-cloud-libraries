var assert = require('assert');
var identity = require('../../../cartridges/lodash/identity');
var partition = require('../../../cartridges/lodash/partition');
var map = require('../../../cartridges/lodash/map');
var constant = require('../../../cartridges/lodash/constant');
var { stubTrue, stubFalse } = require('../helpers/stubs');

describe('partition', function () {
    var array = [1, 0, 1];

    it('should split elements into two groups by `predicate`', function () {
        assert.deepStrictEqual(partition([], identity), [[], []]);
        assert.deepStrictEqual(partition(array, stubTrue), [array, []]);
        assert.deepStrictEqual(partition(array, stubFalse), [[], array]);
    });

    it('should use `_.identity` when `predicate` is nullish', function () {
        var values = [, null, undefined];
        var expected = map(values, constant([[1, 1], [0]]));

        var actual = map(values, function (value, index) {
            return index ? partition(array, value) : partition(array);
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should work with `_.property` shorthands', function () {
        var objects = [{ 'a': 1 }, { 'a': 1 }, { 'b': 2 }];
        var actual = partition(objects, 'a');

        assert.deepStrictEqual(actual, [objects.slice(0, 2), objects.slice(2)]);
    });

    it('should work with a number for `predicate`', function () {
        var arrayFn = [
            [1, 0],
            [0, 1],
            [1, 0]
        ];

        assert.deepStrictEqual(partition(arrayFn, 0), [[arrayFn[0], arrayFn[2]], [arrayFn[1]]]);
        assert.deepStrictEqual(partition(arrayFn, 1), [[arrayFn[1]], [arrayFn[0], arrayFn[2]]]);
    });

    it('should work with an object for `collection`', function () {
        var actual = partition({ 'a': 1.1, 'b': 0.2, 'c': 1.3 }, Math.floor);
        assert.deepStrictEqual(actual, [[1.1, 1.3], [0.2]]);
    });
});
