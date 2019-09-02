var assert = require('assert');
var uniqWith = require('../../../cartridges/lodash/uniqWith');
var times = require('../../../cartridges/lodash/times');
var map = require('../../../cartridges/lodash/map');
var toString = require('../../../cartridges/lodash/toString');
var eq = require('../../../cartridges/lodash/eq');
var isEqual = require('../../../cartridges/lodash/isEqual');
var constant = require('../../../cartridges/lodash/constant');
var isEven = require('../helpers/isEven');
var LARGE_ARRAY_SIZE = require('../helpers/largeArraySize');

describe('uniqWith', function () {
    it('should work with a `comparator`', function () {
        var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 2 }];
        var actual = uniqWith(objects, isEqual);

        assert.deepStrictEqual(actual, [objects[0], objects[1]]);
    });

    it('should preserve the sign of `0`', function () {
        var largeArray = times(LARGE_ARRAY_SIZE, function (index) {
            return isEven(index) ? -0 : 0;
        });

        var arrays = [[-0, 0], largeArray];
        var expected = map(arrays, constant(['-0']));

        var actual = map(arrays, function (array) {
            return map(uniqWith(array, eq), toString);
        });

        assert.deepStrictEqual(actual, expected);
    });
});
