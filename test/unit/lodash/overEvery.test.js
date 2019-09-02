var assert = require('assert');
var overEvery = require('../../../cartridges/lodash/overEvery');
var slice = Array.prototype.slice;
var { stubTrue, stubOne, stubA, stubFalse } = require('../helpers/stubs');

describe('overEvery', function () {
    it('should create a function that returns `true` if all predicates return truthy', function () {
        var over = overEvery(stubTrue, stubOne, stubA);
        assert.strictEqual(over(), true);
    });

    it('should return `false` as soon as a predicate returns falsey', function () {
        var count = 0;
        var countFalse = function () { count++; return false; };
        var countTrue = function () { count++; return true; };
        var over = overEvery(countTrue, countFalse, countTrue);

        assert.strictEqual(over(), false);
        assert.strictEqual(count, 2);
    });

    it('should use `_.identity` when a predicate is nullish', function () {
        var over = overEvery(undefined, null);

        assert.strictEqual(over(true), true);
        assert.strictEqual(over(false), false);
    });

    it('should work with `_.property` shorthands', function () {
        var over = overEvery('b', 'a');

        assert.strictEqual(over({ 'a': 1, 'b': 1 }), true);
        assert.strictEqual(over({ 'a': 0, 'b': 1 }), false);
    });

    it('should work with `_.matches` shorthands', function () {
        var over = overEvery({ 'b': 2 }, { 'a': 1 });

        assert.strictEqual(over({ 'a': 1, 'b': 2 }), true);
        assert.strictEqual(over({ 'a': 0, 'b': 2 }), false);
    });

    it('should work with `_.matchesProperty` shorthands', function () {
        var over = overEvery([['b', 2], ['a', 1]]);

        assert.strictEqual(over({ 'a': 1, 'b': 2 }), true);
        assert.strictEqual(over({ 'a': 0, 'b': 2 }), false);
    });

    it('should differentiate between `_.property` and `_.matchesProperty` shorthands', function () {
        var over = overEvery(['a', 1]);

        assert.strictEqual(over({ 'a': 1, '1': 1 }), true);
        assert.strictEqual(over({ 'a': 1, '1': 0 }), false);
        assert.strictEqual(over({ 'a': 0, '1': 1 }), false);

        over = overEvery([['a', 1]]);

        assert.strictEqual(over({ 'a': 1 }), true);
        assert.strictEqual(over({ 'a': 2 }), false);
    });

    it('should flatten `predicates`', function () {
        var over = overEvery(stubTrue, [stubFalse]);
        assert.strictEqual(over(), false);
    });

    it('should provide arguments to predicates', function () {
        var args;

        var over = overEvery(function () {
            args = slice.call(arguments);
        });

        over('a', 'b', 'c');
        assert.deepStrictEqual(args, ['a', 'b', 'c']);
    });

    it('should use `this` binding of function for `predicates`', function () {
        var over = overEvery(function () { return this.b; }, function () { return this.a; });
        var object = { 'over': over, 'a': 1, 'b': 2 };

        assert.strictEqual(object.over(), true);

        object.a = 0;
        assert.strictEqual(object.over(), false);
    });
});
