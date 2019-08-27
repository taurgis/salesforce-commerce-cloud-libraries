var assert = require('assert');
var slice = Array.prototype.slice;
var LARGE_ARRAY_SIZE = require('../helpers/largeArraySize');
var dropWhile = require('../../../cartridges/lodash/dropWhile');
var range = require('../../../cartridges/lodash/range');
var last = require('../../../cartridges/lodash/last');
var _ = require('../../../cartridges/lodash/wrapperLodash');

describe('dropWhile', function () {
    var array = [1, 2, 3, 4];

    var objects = [
        { 'a': 2, 'b': 2 },
        { 'a': 1, 'b': 1 },
        { 'a': 0, 'b': 0 }
    ];

    it('should drop elements while `predicate` returns truthy', function () {
        var actual = dropWhile(array, function (n) {
            return n < 3;
        });

        assert.deepStrictEqual(actual, [3, 4]);
    });

    it('should provide correct `predicate` arguments', function () {
        var args;

        dropWhile(array, function () {
            args = slice.call(arguments);
        });

        assert.deepStrictEqual(args, [1, 0, array]);
    });

    it('should work with `_.matches` shorthands', function () {
        assert.deepStrictEqual(dropWhile(objects, { 'b': 2 }), objects.slice(1));
    });

    it('should work with `_.matchesProperty` shorthands', function () {
        assert.deepStrictEqual(dropWhile(objects, ['b', 2]), objects.slice(1));
    });

    it('should work with `_.property` shorthands', function () {
        assert.deepStrictEqual(dropWhile(objects, 'b'), objects.slice(2));
    });

    it('should work in a lazy sequence', function () {
        array = range(1, LARGE_ARRAY_SIZE + 3);
        var predicate = function (n) { return n < 3; };
        var expected = dropWhile(array, predicate);

        var wrapped = _(array).dropWhile(predicate);

        assert.deepEqual(wrapped.value(), expected);
        assert.deepEqual(wrapped.reverse().value(), expected.slice().reverse());
        assert.strictEqual(wrapped.reverse().last().value(), last(expected));
    });

    it('should work in a lazy sequence with `drop`', function () {
        array = range(1, LARGE_ARRAY_SIZE + 3);

        var actual = _(array)
            .dropWhile(function (n) { return n == 1; })
            .drop()
            .dropWhile(function (n) { return n == 3; })
            .value();

        assert.deepEqual(actual, array.slice(3));
    });
});
