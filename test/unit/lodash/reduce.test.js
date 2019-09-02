var assert = require('assert');
var reduce = require('../../../cartridges/lodash/reduce');
var head = require('../../../cartridges/lodash/head');
var keys = require('../../../cartridges/lodash/keys');
var slice = Array.prototype.slice;

describe('reduce', function () {
    var array = [1, 2, 3];

    it('should use the first element of a collection as the default `accumulator`', function () {
        assert.strictEqual(reduce(array), 1);
    });

    it('should provide correct `iteratee` arguments when iterating an array', function () {
        var args;

        reduce(array, function () {
            args || (args = slice.call(arguments));
        }, 0);

        assert.deepStrictEqual(args, [0, 1, 0, array]);

        args = undefined;
        reduce(array, function () {
            args || (args = slice.call(arguments));
        });

        assert.deepStrictEqual(args, [1, 2, 1, array]);
    });

    it('should provide correct `iteratee` arguments when iterating an object', function () {
        var args;
        var object = { 'a': 1, 'b': 2 };
        var firstKey = head(keys(object));

        var expected = firstKey === 'a'
            ? [0, 1, 'a', object]
            : [0, 2, 'b', object];

        reduce(object, function () {
            args || (args = slice.call(arguments));
        }, 0);

        assert.deepStrictEqual(args, expected);

        args = undefined;
        expected = firstKey === 'a'
            ? [1, 2, 'b', object]
            : [2, 1, 'a', object];

        reduce(object, function () {
            args || (args = slice.call(arguments));
        });

        assert.deepStrictEqual(args, expected);
    });
});
