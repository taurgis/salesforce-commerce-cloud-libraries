var assert = require('assert');
var xorWith = require('../../../cartridges/lodash/xorWith');
var isEqual = require('../../../cartridges/lodash/isEqual');

describe('xorWith', function () {
    it('should work with a `comparator`', function () {
        var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
        var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
        var actual = xorWith(objects, others, isEqual);

        assert.deepStrictEqual(actual, [objects[1], others[0]]);
    });
});
