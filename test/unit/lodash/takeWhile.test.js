var assert = require('assert');
var takeWhile = require('../../../cartridges/lodash/takeWhile');
var map = require('../../../cartridges/lodash/map');
var range = require('../../../cartridges/lodash/range');
var _ = require('../../../cartridges/lodash/wrapperLodash');
var LARGE_ARRAY_SIZE = require('../helpers/largeArraySize');
var square = require('../helpers/square');
var slice = Array.prototype.slice;

describe('takeWhile', function () {
    var array = [1, 2, 3, 4];

    var objects = [
        { 'a': 2, 'b': 2 },
        { 'a': 1, 'b': 1 },
        { 'a': 0, 'b': 0 }
    ];

    it('should take elements while `predicate` returns truthy', function () {
        var actual = takeWhile(array, function (n) {
            return n < 3;
        });

        assert.deepStrictEqual(actual, [1, 2]);
    });

    it('should provide correct `predicate` arguments', function () {
        var args;

        takeWhile(array, function () {
            args = slice.call(arguments);
        });

        assert.deepStrictEqual(args, [1, 0, array]);
    });

    it('should work with `_.matches` shorthands', function () {
        assert.deepStrictEqual(takeWhile(objects, { 'b': 2 }), objects.slice(0, 1));
    });

    it('should work with `_.matchesProperty` shorthands', function () {
        assert.deepStrictEqual(takeWhile(objects, ['b', 2]), objects.slice(0, 1));
    });
    it('should work with `_.property` shorthands', function () {
        assert.deepStrictEqual(takeWhile(objects, 'b'), objects.slice(0, 2));
    });

    it('should work in a lazy sequence', function () {
        var arrayFn = range(LARGE_ARRAY_SIZE);
        var predicate = function (n) { return n < 3; };
        var expected = takeWhile(arrayFn, predicate);
        var wrapped = _(arrayFn).takeWhile(predicate);

        assert.deepEqual(wrapped.value(), expected);
        assert.deepEqual(wrapped.reverse().value(), expected.slice().reverse());
    });

    it('should work in a lazy sequence with `take`', function () {
        var arrayFn = range(LARGE_ARRAY_SIZE);

        var actual = _(arrayFn)
            .takeWhile(function (n) { return n < 4; })
            .take(2)
            .takeWhile(function (n) { return n === 0; })
            .value();

        assert.deepEqual(actual, [0]);
    });

    it('should provide correct `predicate` arguments in a lazy sequence', function () {
        var args;
        var arrayFn = range(LARGE_ARRAY_SIZE + 1);
        var expected = [1, 0, map(arrayFn.slice(1), square)];

        _(arrayFn).slice(1).takeWhile(function () {
            args = slice.call(arguments);
        }).value();

        assert.deepEqual(args, [1, 0, arrayFn.slice(1)]);

        _(arrayFn).slice(1).map(square).takeWhile(function () {
            args = slice.call(arguments);
        })
            .value();

        assert.deepEqual(args, expected);

        _(arrayFn).slice(1).map(square).takeWhile(function () {
            args = slice.call(arguments);
        })
            .value();

        assert.deepEqual(args, expected);

        _(arrayFn).slice(1).map(square).takeWhile(function () {
            args = slice.call(arguments);
        })
            .value();

        _(arrayFn).slice(1).map(square).takeWhile(function () {
            args = slice.call(arguments);
        })
            .value();

        assert.deepEqual(args, expected);
    });
});
