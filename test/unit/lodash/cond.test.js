var assert = require('assert');
var matches = require('../../../cartridges/lodash/matches');
var matchesProperty = require('../../../cartridges/lodash/matchesProperty');
var property = require('../../../cartridges/lodash/property');
var each = require('../../../cartridges/lodash/each');
var cond = require('../../../cartridges/lodash/cond');
var stubTrue = require('../helpers/stubs').true;
var stubFalse = require('../helpers/stubs').false;
var stubA = require('../helpers/stubs').stubA;
var stubB = require('../helpers/stubs').stubB;
var stubC = require('../helpers/stubs').stubC;
var slice = Array.prototype.slice;

describe('cond', function () {
    it('should create a conditional function', function () {
        var condFunction = cond([
            [matches({ 'a': 1 }), stubA],
            [matchesProperty('b', 1), stubB],
            [property('c'), stubC]
        ]);

        assert.strictEqual(condFunction({ 'a': 1, 'b': 2, 'c': 3 }), 'a');
        assert.strictEqual(condFunction({ 'a': 0, 'b': 1, 'c': 2 }), 'b');
        assert.strictEqual(condFunction({ 'a': -1, 'b': 0, 'c': 1 }), 'c');
    });

    it('should provide arguments to functions', function () {
        var args1;
        var args2;
        var expected = ['a', 'b', 'c'];

        var condFunction = cond([[
            function () { args1 || (args1 = slice.call(arguments)); return true; },
            function () { args2 || (args2 = slice.call(arguments)); }
        ]]);

        condFunction('a', 'b', 'c');

        assert.deepStrictEqual(args1, expected);
        assert.deepStrictEqual(args2, expected);
    });

    it('should work with predicate shorthands', function () {
        var condFunction = cond([
            [{ 'a': 1 }, stubA],
            [['b', 1], stubB],
            ['c', stubC]
        ]);

        assert.strictEqual(condFunction({ 'a': 1, 'b': 2, 'c': 3 }), 'a');
        assert.strictEqual(condFunction({ 'a': 0, 'b': 1, 'c': 2 }), 'b');
        assert.strictEqual(condFunction({ 'a': -1, 'b': 0, 'c': 1 }), 'c');
    });

    it('should return `undefined` when no condition is met', function () {
        var condFunction = cond([[stubFalse, stubA]]);
        assert.strictEqual(condFunction({ 'a': 1 }), undefined);
    });

    it('should throw a TypeError if `pairs` is not composed of functions', function () {
        each([false, true], function (value) {
            assert.throws(function () { cond([[stubTrue, value]])(); }, TypeError);
        });
    });

    it('should use `this` binding of function for `pairs`', function () {
        var condFunction = cond([
            [function (a) { return this[a]; }, function (a, b) { return this[b]; }]
        ]);

        var object = { 'cond': condFunction, 'a': 1, 'b': 2 };
        assert.strictEqual(object.cond('a', 'b'), 2);
    });
});
