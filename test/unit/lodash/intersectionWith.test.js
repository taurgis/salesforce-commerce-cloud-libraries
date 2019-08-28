var assert = require('assert');
var LARGE_ARRAY_SIZE = require('../helpers/largeArraySize');
var stubZero = require('../helpers/stubs').stubZero;
var intersectionWith = require('../../../cartridges/lodash/intersectionWith');
var map = require('../../../cartridges/lodash/map');
var times = require('../../../cartridges/lodash/times');
var isEqual = require('../../../cartridges/lodash/isEqual');
var toString = require('../../../cartridges/lodash/toString');
var constant = require('../../../cartridges/lodash/constant');
var eq = require('../../../cartridges/lodash/eq');

describe('intersectionWith', function () {
    it('should work with a `comparator`', function () {
        var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
        var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
        var actual = intersectionWith(objects, others, isEqual);

        assert.deepStrictEqual(actual, [objects[0]]);
    });

    it('should preserve the sign of `0`', function () {
        var array = [-0];
        var largeArray = times(LARGE_ARRAY_SIZE, stubZero);
        var others = [[0], largeArray];
        var expected = map(others, constant(['-0']));

        var actual = map(others, function (other) {
            return map(intersectionWith(array, other, eq), toString);
        });

        assert.deepStrictEqual(actual, expected);
    });
});
