var assert = require('assert');
var unionWith = require('../../../cartridges/lodash/unionWith');
var isEqual = require('../../../cartridges/lodash/isEqual');

describe('unionWith', function () {
    it('should work with a `comparator`', function () {
        var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
        var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
        var actual = unionWith(objects, others, isEqual);

        assert.deepStrictEqual(actual, [objects[0], objects[1], others[0]]);
    });

    it('should output values from the first possible array', function () {
        var objects = [{ 'x': 1, 'y': 1 }];
        var others = [{ 'x': 1, 'y': 2 }];

        var actual = unionWith(objects, others, function (a, b) {
            return a.x === b.x;
        });

        assert.deepStrictEqual(actual, [{ 'x': 1, 'y': 1 }]);
    });
});
