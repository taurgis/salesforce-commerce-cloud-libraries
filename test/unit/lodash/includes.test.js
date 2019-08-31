var assert = require('assert');
var empties = require('../helpers/stubs').empties;
var stubFalse = require('../helpers/stubs').false;
var includes = require('../../../cartridges/lodash/includes');
var each = require('../../../cartridges/lodash/each');
var map = require('../../../cartridges/lodash/map');
var every = require('../../../cartridges/lodash/every');
var partial = require('../../../cartridges/lodash/partial');
var _ = require('../../../cartridges/lodash/wrapperLodash');

describe('includes', function () {
    (function () {
        each({
            'an `arguments` object': arguments,
            'an array': [1, 2, 3, 4],
            'an object': { 'a': 1, 'b': 2, 'c': 3, 'd': 4 },
            'a string': '1234'
        },
        function (collection, key) {
            it('should work with ' + key + ' and  return `true` for  matched values', function () {
                assert.strictEqual(includes(collection, 3), true);
            });

            it('should work with ' + key + ' and  return `false` for unmatched values', function () {
                assert.strictEqual(includes(collection, 5), false);
            });

            it('should work with ' + key + ' and floor `position` values', function () {
                assert.strictEqual(includes(collection, 2, 1.2), true);
            });

            it('should work with ' + key + ' and return an unwrapped value implicitly when chaining', function () {
                assert.strictEqual(_(collection).includes(3).value(), true);
            });

            it('should work with ' + key + ' and return a wrapped value when explicitly chaining', function () {
                assert.ok(_(collection).chain().includes(3) instanceof _);
            });
        });

        each({
            'literal': 'abc',
            'object': Object('abc')
        },
        function (collection, key) {
            it('should work with a string ' + key + ' for `collection`', function () {
                assert.strictEqual(includes(collection, 'bc'), true);
                assert.strictEqual(includes(collection, 'd'), false);
            });
        });

        it('should return `false` for empty collections', function () {
            var expected = map(empties, stubFalse);

            var actual = map(empties, function (value) {
                try {
                    return includes(value);
                } catch (e) {
                    // DO NOTHING
                }
            });

            assert.deepStrictEqual(actual, expected);
        });

        it('should work with a string and a `fromIndex` >= `length`', function () {
            var string = '1234';
            var length = string.length;
            var indexes = [4, 6, Math.pow(2, 32), Infinity];

            var expected = map(indexes, function (index) {
                return [false, false, index === length];
            });

            var actual = map(indexes, function (fromIndex) {
                return [
                    includes(string, 1, fromIndex),
                    includes(string, undefined, fromIndex),
                    includes(string, '', fromIndex)
                ];
            });

            assert.deepStrictEqual(actual, expected);
        });

        it('should match `NaN`', function () {
            assert.strictEqual(includes([1, NaN, 3], NaN), true);
        });

        it('should match `-0` as `0`', function () {
            assert.strictEqual(includes([-0], 0), true);
            assert.strictEqual(includes([0], -0), true);
        });

        it('should work as an iteratee for methods like `_.every`', function () {
            var array = [2, 3, 1];
            var values = [1, 2, 3];

            assert.ok(every(values, partial(includes, array)));
        });
    }(1, 2, 3, 4));
});
