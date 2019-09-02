var assert = require('assert');
var map = require('../../../cartridges/lodash/map');
var toString = require('../../../cartridges/lodash/toString');
var constant = require('../../../cartridges/lodash/constant');
var isEqual = require('../../../cartridges/lodash/isEqual');
var eq = require('../../../cartridges/lodash/eq');
var times = require('../../../cartridges/lodash/times');
var differenceWith = require('../../../cartridges/lodash/differenceWith');
var LARGE_ARRAY_SIZE = require('../helpers/largeArraySize');
var stubOne = require('../helpers/stubs').stubOne;

describe('differenceWith', function () {
    it('should work with a `comparator`', function () {
        var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
        var actual = differenceWith(objects, [{ 'x': 1, 'y': 2 }], isEqual);

        assert.deepEqual(actual, [objects[1]]);
    });

    it('should preserve the sign of `0`', function () {
        var array = [-0, 1];
        var largeArray = times(LARGE_ARRAY_SIZE, stubOne);
        var others = [[1], largeArray];
        var expected = map(others, constant(['-0']));

        var actual = map(others, function (other) {
            return map(differenceWith(array, other, eq), toString);
        });

        assert.deepStrictEqual(actual, expected);
    });
});
