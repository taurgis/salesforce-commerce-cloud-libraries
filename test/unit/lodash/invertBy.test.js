var assert = require('assert');
var invertBy = require('../../../cartridges/lodash/invertBy');
var isEqual = require('../../../cartridges/lodash/isEqual');
var constant = require('../../../cartridges/lodash/constant');
var map = require('../../../cartridges/lodash/map');
var _ = require('../../../cartridges/lodash/wrapperLodash');

describe('invertBy', function () {
    var object = { 'a': 1, 'b': 2, 'c': 1 };

    it('should transform keys by `iteratee`', function () {
        var expected = { 'group1': ['a', 'c'], 'group2': ['b'] };

        var actual = invertBy(object, function (value) {
            return 'group' + value;
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should use `_.identity` when `iteratee` is nullish', function () {
        var values = [, null, undefined];
        var expected = map(values, constant({ '1': ['a', 'c'], '2': ['b'] }));

        var actual = map(values, function (value, index) {
            return index ? invertBy(object, value) : invertBy(object);
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should only add multiple values to own, not inherited, properties', function () {
        var multipleObject = { 'a': 'hasOwnProperty', 'b': 'constructor' };
        var expected = { 'hasOwnProperty': ['a'], 'constructor': ['b'] };

        assert.ok(isEqual(invertBy(multipleObject), expected));
    });

    it('should return a wrapped value when chaining', function () {
        var wrapped = _(object).invertBy();

        assert.ok(wrapped instanceof _);
        assert.deepEqual(wrapped.value(), { '1': ['a', 'c'], '2': ['b'] });
    });
});
