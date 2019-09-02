var assert = require('assert');
var takeRightWhile = require('../../../cartridges/lodash/takeRightWhile');
var map = require('../../../cartridges/lodash/map');
var range = require('../../../cartridges/lodash/range');
var _ = require('../../../cartridges/lodash/wrapperLodash');
var LARGE_ARRAY_SIZE = require('../helpers/largeArraySize');
var square = require('../helpers/square');
var slice = Array.prototype.slice;

describe('takeRightWhile', function () {
    var array = [1, 2, 3, 4];

    var objects = [
        { 'a': 0, 'b': 0 },
        { 'a': 1, 'b': 1 },
        { 'a': 2, 'b': 2 }
    ];

    it('should take elements while `predicate` returns truthy', function () {
        var actual = takeRightWhile(array, function (n) {
            return n > 2;
        });

        assert.deepStrictEqual(actual, [3, 4]);
    });

    it('should provide correct `predicate` arguments', function () {
        var args;

        takeRightWhile(array, function () {
            args = slice.call(arguments);
        });

        assert.deepStrictEqual(args, [4, 3, array]);
    });

    it('should work with `_.matches` shorthands', function () {
        assert.deepStrictEqual(takeRightWhile(objects, { 'b': 2 }), objects.slice(2));
    });

    it('should work with `_.matchesProperty` shorthands', function () {
        assert.deepStrictEqual(takeRightWhile(objects, ['b', 2]), objects.slice(2));
    });

    it('should work with `_.property` shorthands', function () {
        assert.deepStrictEqual(takeRightWhile(objects, 'b'), objects.slice(1));
    });

    it('should work in a lazy sequence', function () {
        var arrayFn = range(LARGE_ARRAY_SIZE);
        var predicate = function (n) { return n > 2; };
        var expected = takeRightWhile(arrayFn, predicate);
        var wrapped = _(arrayFn).takeRightWhile(predicate);

        assert.deepEqual(wrapped.value(), expected);
        assert.deepEqual(wrapped.reverse().value(), expected.slice().reverse());
    });

    it('should provide correct `predicate` arguments in a lazy sequence', function () {
        var args;
        var arrayFn = range(LARGE_ARRAY_SIZE + 1);

        var expected = [
            square(LARGE_ARRAY_SIZE),
            LARGE_ARRAY_SIZE - 1,
            map(arrayFn.slice(1), square)
        ];

        _(arrayFn).slice(1).takeRightWhile(function () {
            args = slice.call(arguments);
        }).value();

        assert.deepEqual(args, [LARGE_ARRAY_SIZE, LARGE_ARRAY_SIZE - 1, arrayFn.slice(1)]);

        _(arrayFn).slice(1).map(square).takeRightWhile(function () {
            args = slice.call(arguments);
        })
            .value();

        assert.deepEqual(args, expected);

        _(arrayFn).slice(1).map(square).takeRightWhile(function () {
            args = slice.call(arguments);
        })
            .value();

        assert.deepEqual(args, expected);

        _(arrayFn).slice(1).map(square).takeRightWhile(function () {
            args = slice.call(arguments);
        })
            .value();

        _(arrayFn).slice(1).map(square).takeRightWhile(function () {
            args = slice.call(arguments);
        })
            .value();

        assert.deepEqual(args, expected);
    });
});
