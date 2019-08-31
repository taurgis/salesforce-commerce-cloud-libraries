var assert = require('assert');
var invoke = require('../../../cartridges/lodash/invoke');
var noop = require('../helpers/stubs').noop;
var stubA = require('../helpers/stubs').stubA;
var stubB = require('../helpers/stubs').stubB;
var stubOne = require('../helpers/stubs').stubOne;
var constant = require('../../../cartridges/lodash/constant');
var map = require('../../../cartridges/lodash/map');
var each = require('../../../cartridges/lodash/each');
var _ = require('../../../cartridges/lodash/wrapperLodash');

describe('invoke', function () {
    it('should invoke a method on `object`', function () {
        var object = { 'a': constant('A') };
        var actual = invoke(object, 'a');

        assert.strictEqual(actual, 'A');
    });

    it('should support invoking with arguments', function () {
        var object = { 'a': function (a, b) { return [a, b]; } };
        var actual = invoke(object, 'a', 1, 2);

        assert.deepStrictEqual(actual, [1, 2]);
    });

    it('should not error on nullish elements', function () {
        var values = [null, undefined];
        var expected = map(values, noop);

        var actual = map(values, function (value) {
            try {
                return invoke(value, 'a.b', 1, 2);
            } catch (e) {
                // DO NOTHING
            }
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should preserve the sign of `0`', function () {
        var object = { '-0': stubA, '0': stubB };
        var props = [-0, Object(-0), 0, Object(0)];

        var actual = map(props, function (key) {
            return invoke(object, key);
        });

        assert.deepStrictEqual(actual, ['a', 'a', 'b', 'b']);
    });

    it('should support deep paths', function () {
        var object = { 'a': { 'b': function (a, b) { return [a, b]; } } };

        each(['a.b', ['a', 'b']], function (path) {
            var actual = invoke(object, path, 1, 2);
            assert.deepStrictEqual(actual, [1, 2]);
        });
    });

    it('should invoke deep property methods with the correct `this` binding', function () {
        var object = { 'a': { 'b': function () { return this.c; }, 'c': 1 } };

        each(['a.b', ['a', 'b']], function (path) {
            assert.deepStrictEqual(invoke(object, path), 1);
        });
    });

    it('should return an unwrapped value when implicitly chaining', function () {
        var object = { 'a': stubOne };
        assert.strictEqual(_(object).invoke('a').value(), 1);
    });

    it('should return a wrapped value when explicitly chaining', function () {
        var object = { 'a': stubOne };
        assert.ok(_(object).chain().invoke('a') instanceof _);
    });
});
