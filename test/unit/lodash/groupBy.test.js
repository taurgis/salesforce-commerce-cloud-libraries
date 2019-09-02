var assert = require('assert');
var groupBy = require('../../../cartridges/lodash/groupBy');
var map = require('../../../cartridges/lodash/map');
var constant = require('../../../cartridges/lodash/constant');
var take = require('../../../cartridges/lodash/take');
var filter = require('../../../cartridges/lodash/filter');
var _ = require('../../../cartridges/lodash/wrapperLodash');
var range = require('../../../cartridges/lodash/range');
var LARGE_ARRAY_SIZE = require('../helpers/largeArraySize');
var isEven = require('../helpers/isEven');

describe('groupBy', function () {
    var array = [6.1, 4.2, 6.3];

    it('should transform keys by `iteratee`', function () {
        var actual = groupBy(array, Math.floor);
        assert.deepStrictEqual(actual, { '4': [4.2], '6': [6.1, 6.3] });
    });

    it('should use `_.identity` when `iteratee` is nullish', function () {
        var nullishArray = [6, 4, 6];
        var values = [, null, undefined];
        var expected = map(values, constant({ '4': [4], '6': [6, 6] }));

        var actual = map(values, function (value, index) {
            return index ? groupBy(nullishArray, value) : groupBy(nullishArray);
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should work with `_.property` shorthands', function () {
        var actual = groupBy(['one', 'two', 'three'], 'length');
        assert.deepStrictEqual(actual, { '3': ['one', 'two'], '5': ['three'] });
    });

    it('should only add values to own, not inherited, properties', function () {
        var actual = groupBy(array, function (n) {
            return Math.floor(n) > 4 ? 'hasOwnProperty' : 'constructor';
        });

        assert.deepStrictEqual(actual.constructor, [4.2]);
        assert.deepStrictEqual(actual.hasOwnProperty, [6.1, 6.3]);
    });

    it('should work with a number for `iteratee`', function () {
        var iterateeArray = [
            [1, 'a'],
            [2, 'a'],
            [2, 'b']
        ];

        assert.deepStrictEqual(groupBy(iterateeArray, 0), { '1': [[1, 'a']], '2': [[2, 'a'], [2, 'b']] });
        assert.deepStrictEqual(groupBy(iterateeArray, 1), { 'a': [[1, 'a'], [2, 'a']], 'b': [[2, 'b']] });
    });

    it('should work with an object for `collection`', function () {
        var actual = groupBy({ 'a': 6.1, 'b': 4.2, 'c': 6.3 }, Math.floor);
        assert.deepStrictEqual(actual, { '4': [4.2], '6': [6.1, 6.3] });
    });

    it('should work in a lazy sequence', function () {
        var lazyArray = range(LARGE_ARRAY_SIZE).concat(
            range(Math.floor(LARGE_ARRAY_SIZE / 2), LARGE_ARRAY_SIZE),
            range(Math.floor(LARGE_ARRAY_SIZE / 1.5), LARGE_ARRAY_SIZE)
        );

        var iteratee = function (value) { value.push(value[0]); return value; };
        var predicate = function (value) { return isEven(value[0]); };
        var actual = _(lazyArray).groupBy().map(iteratee).filter(predicate)
            .take()
            .value();

        assert.deepEqual(actual, take(filter(map(groupBy(lazyArray), iteratee), predicate)));
    });
});
