var assert = require('assert');
var orderBy = require('../../../cartridges/lodash/orderBy');
var map = require('../../../cartridges/lodash/map');
var constant = require('../../../cartridges/lodash/constant');
var { falsey } = require('../helpers/stubs');

describe('orderBy', function () {
    var objects = [
        { 'a': 'x', 'b': 3 },
        { 'a': 'y', 'b': 4 },
        { 'a': 'x', 'b': 1 },
        { 'a': 'y', 'b': 2 }
    ];

    it('should sort by a single property by a specified order', function () {
        var actual = orderBy(objects, 'a', 'desc');
        assert.deepStrictEqual(actual, [objects[1], objects[3], objects[0], objects[2]]);
    });

    it('should sort by multiple properties by specified orders', function () {
        var actual = orderBy(objects, ['a', 'b'], ['desc', 'asc']);
        assert.deepStrictEqual(actual, [objects[3], objects[1], objects[2], objects[0]]);
    });

    it('should sort by a property in ascending order when its order is not specified', function () {
        var expected = [objects[2], objects[0], objects[3], objects[1]];
        var actual = orderBy(objects, ['a', 'b']);

        assert.deepStrictEqual(actual, expected);

        expected = map(falsey, constant([objects[3], objects[1], objects[2], objects[0]]));

        actual = map(falsey, function (order, index) {
            return orderBy(objects, ['a', 'b'], index ? ['desc', order] : ['desc']);
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should work with `orders` specified as string objects', function () {
        var actual = orderBy(objects, ['a'], [Object('desc')]);
        assert.deepStrictEqual(actual, [objects[1], objects[3], objects[0], objects[2]]);
    });
});
