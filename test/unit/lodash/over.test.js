var assert = require('assert');
var over = require('../../../cartridges/lodash/over');
var slice = Array.prototype.slice;

describe('over', function () {
    it('should create a function that invokes `iteratees`', function () {
        var overFn = over(Math.max, Math.min);
        assert.deepStrictEqual(overFn(1, 2, 3, 4), [4, 1]);
    });

    it('should use `_.identity` when a predicate is nullish', function () {
        var overFn = over(undefined, null);
        assert.deepStrictEqual(overFn('a', 'b', 'c'), ['a', 'a']);
    });

    it('should work with `_.property` shorthands', function () {
        var overFn = over('b', 'a');
        assert.deepStrictEqual(overFn({ 'a': 1, 'b': 2 }), [2, 1]);
    });

    it('should work with `_.matches` shorthands', function () {
        var overFn = over({ 'b': 1 }, { 'a': 1 });
        assert.deepStrictEqual(overFn({ 'a': 1, 'b': 2 }), [false, true]);
    });

    it('should work with `_.matchesProperty` shorthands', function () {
        var overFn = over([['b', 2], ['a', 2]]);

        assert.deepStrictEqual(overFn({ 'a': 1, 'b': 2 }), [true, false]);
        assert.deepStrictEqual(overFn({ 'a': 2, 'b': 1 }), [false, true]);
    });

    it('should differentiate between `_.property` and `_.matchesProperty` shorthands', function () {
        var overFn = over(['a', 1]);

        assert.deepStrictEqual(overFn({ 'a': 1, '1': 2 }), [1, 2]);
        assert.deepStrictEqual(overFn({ 'a': 2, '1': 1 }), [2, 1]);

        overFn = over([['a', 1]]);

        assert.deepStrictEqual(overFn({ 'a': 1 }), [true]);
        assert.deepStrictEqual(overFn({ 'a': 2 }), [false]);
    });

    it('should provide arguments to predicates', function () {
        var overFn = over(function () {
            return slice.call(arguments);
        });

        assert.deepStrictEqual(overFn('a', 'b', 'c'), [['a', 'b', 'c']]);
    });

    it('should use `this` binding of function for `iteratees`', function () {
        var overFn = over(function () { return this.b; }, function () { return this.a; });
        var object = { 'over': overFn, 'a': 1, 'b': 2 };

        assert.deepStrictEqual(object.over(), [2, 1]);
    });
});
