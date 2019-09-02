var assert = require('assert');
var pullAllWith = require('../../../cartridges/lodash/pullAllWith');
var isEqual = require('../../../cartridges/lodash/isEqual');

describe('pullAllWith', function () {
    it('should work with a `comparator`', function () {
        var objects = [{ 'x': 1, 'y': 1 }, { 'x': 2, 'y': 2 }, { 'x': 3, 'y': 3 }];
        var expected = [objects[0], objects[2]];
        var actual = pullAllWith(objects, [{ 'x': 2, 'y': 2 }], isEqual);

        assert.deepStrictEqual(actual, expected);
    });
});
