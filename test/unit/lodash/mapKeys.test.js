var assert = require('assert');
var map = require('../../../cartridges/lodash/map');
var constant = require('../../../cartridges/lodash/constant');
var mapKeys = require('../../../cartridges/lodash/mapKeys');

describe('mapKeys', function () {
    var array = [1, 2];
    var object = { 'a': 1, 'b': 2 };

    it('should map keys in `object` to a new object', function () {
        var actual = mapKeys(object, String);
        assert.deepStrictEqual(actual, { '1': 1, '2': 2 });
    });

    it('should treat arrays like objects', function () {
        var actual = mapKeys(array, String);
        assert.deepStrictEqual(actual, { '1': 1, '2': 2 });
    });

    it('should work with `_.property` shorthands', function () {
        var actual = mapKeys({ 'a': { 'b': 'c' } }, 'b');
        assert.deepStrictEqual(actual, { 'c': { 'b': 'c' } });
    });

    it('should use `_.identity` when `iteratee` is nullish', function () {
        object = { 'a': 1, 'b': 2 };
        var values = [, null, undefined];
        var expected = map(values, constant({ '1': 1, '2': 2 }));

        var actual = map(values, function (value, index) {
            return index ? mapKeys(object, value) : mapKeys(object);
        });

        assert.deepStrictEqual(actual, expected);
    });
});
