var assert = require('assert');
var map = require('../../../cartridges/lodash/map');
var constant = require('../../../cartridges/lodash/constant');
var mapValues = require('../../../cartridges/lodash/mapValues');
var isEqual = require('../../../cartridges/lodash/isEqual');

describe('mapValues', function () {
    var array = [1, 2];
    var object = { 'a': 1, 'b': 2 };

    it('should map values in `object` to a new object', function () {
        var actual = mapValues(object, String);
        assert.deepStrictEqual(actual, { 'a': '1', 'b': '2' });
    });

    it('should treat arrays like objects', function () {
        var actual = mapValues(array, String);
        assert.deepStrictEqual(actual, { '0': '1', '1': '2' });
    });

    it('should work with `_.property` shorthands', function () {
        var actual = mapValues({ 'a': { 'b': 2 } }, 'b');
        assert.deepStrictEqual(actual, { 'a': 2 });
    });

    it('should use `_.identity` when `iteratee` is nullish', function () {
        object = { 'a': 1, 'b': 2 };
        var values = [, null, undefined];
        var expected = map(values, constant([true, false]));

        var actual = map(values, function (value, index) {
            var result = index ? mapValues(object, value) : mapValues(object);
            return [isEqual(result, object), result === object];
        });

        assert.deepStrictEqual(actual, expected);
    });
});
