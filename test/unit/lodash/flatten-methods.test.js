var assert = require('assert');
var args = require('../helpers/args');
var flatten = require('../../../cartridges/lodash/flatten');
var flattenDeep = require('../../../cartridges/lodash/flattenDeep');
var flattenDepth = require('../../../cartridges/lodash/flattenDepth');
var map = require('../../../cartridges/lodash/map');
var each = require('../../../cartridges/lodash/each');
var times = require('../../../cartridges/lodash/times');
var constant = require('../../../cartridges/lodash/constant');
var _ = require('../../../cartridges/lodash/wrapperLodash');

describe('flatten methods', function () {
    var array = [1, [2, [3, [4]], 5]];
    var methodNames = ['flatten', 'flattenDeep', 'flattenDepth'];

    it('should flatten `arguments` objects', function () {
        array = [args, [args]];

        assert.deepStrictEqual(flatten(array), [1, 2, 3, args]);
        assert.deepStrictEqual(flattenDeep(array), [1, 2, 3, 1, 2, 3]);
        assert.deepStrictEqual(flattenDepth(array, 2), [1, 2, 3, 1, 2, 3]);
    });

    it('should treat sparse arrays as dense', function () {
        array = [[1, 2, 3], Array(3)];
        var expected = [1, 2, 3];

        expected.push(undefined, undefined, undefined);

        each(methodNames, function (methodName) {
            var func = (function () {
                switch (methodName) {
                    case 'flatten': return flatten;
                    case 'flattenDeep': return flattenDeep;
                    case 'flattenDepth': return flattenDepth;
                    default: return null;
                }
            }());
            var actual = func(array);
            assert.deepStrictEqual(actual, expected);
            assert.ok('4' in actual);
        });
    });

    it('should work with empty arrays', function () {
        array = [[], [[]], [[], [[[]]]]];

        assert.deepStrictEqual(flatten(array), [[], [], [[[]]]]);
        assert.deepStrictEqual(flattenDeep(array), []);
        assert.deepStrictEqual(flattenDepth(array, 2), [[[]]]);
    });

    it('should support flattening of nested arrays', function () {
        array = [1, [2, [3, [4]], 5]];

        assert.deepStrictEqual(flatten(array), [1, 2, [3, [4]], 5]);
        assert.deepStrictEqual(flattenDeep(array), [1, 2, 3, 4, 5]);
        assert.deepStrictEqual(flattenDepth(array, 2), [1, 2, 3, [4], 5]);
    });

    it('should return an empty array for non array-like objects', function () {
        var expected = [];
        var nonArray = { 0: 'a' };

        assert.deepStrictEqual(flatten(nonArray), expected);
        assert.deepStrictEqual(flattenDeep(nonArray), expected);
        assert.deepStrictEqual(flattenDepth(nonArray, 2), expected);
    });

    it('should return a wrapped value when chaining', function () {
        var wrapped = _(array);
        var actual = wrapped.flatten();

        assert.ok(actual instanceof _);
        assert.deepEqual(actual.value(), [1, 2, [3, [4]], 5]);

        actual = wrapped.flattenDeep();

        assert.ok(actual instanceof _);
        assert.deepEqual(actual.value(), [1, 2, 3, 4, 5]);

        actual = wrapped.flattenDepth(2);

        assert.ok(actual instanceof _);
        assert.deepEqual(actual.value(), [1, 2, 3, [4], 5]);
    });
});
