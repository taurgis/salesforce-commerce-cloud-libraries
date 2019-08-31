var assert = require('assert');
var invokeMap = require('../../../cartridges/lodash/invokeMap');
var each = require('../../../cartridges/lodash/each');
var map = require('../../../cartridges/lodash/map');
var _ = require('../../../cartridges/lodash/wrapperLodash');
var stubOne = require('../helpers/stubs').stubOne;
var slice = Array.prototype.slice;

describe('invokeMap', function () {
    it('should invoke a methods on each element of `collection`', function () {
        var array = ['a', 'b', 'c'];
        var actual = invokeMap(array, 'toUpperCase');

        assert.deepStrictEqual(actual, ['A', 'B', 'C']);
    });

    it('should support invoking with arguments', function () {
        var array = [function () { return slice.call(arguments); }];
        var actual = invokeMap(array, 'call', null, 'a', 'b', 'c');

        assert.deepStrictEqual(actual, [['a', 'b', 'c']]);
    });

    it('should work with a function for `methodName`', function () {
        var array = ['a', 'b', 'c'];

        var actual = invokeMap(array, function (left, right) {
            return left + this.toUpperCase() + right;
        }, '(', ')');

        assert.deepStrictEqual(actual, ['(A)', '(B)', '(C)']);
    });

    it('should work with an object for `collection`', function () {
        var object = { 'a': 1, 'b': 2, 'c': 3 };
        var actual = invokeMap(object, 'toFixed', 1);

        assert.deepStrictEqual(actual, ['1.0', '2.0', '3.0']);
    });

    it('should treat number values for `collection` as empty', function () {
        assert.deepStrictEqual(invokeMap(1), []);
    });

    it('should not error on nullish elements', function () {
        var array = ['a', null, undefined, 'd'];

        try {
            var actual = invokeMap(array, 'toUpperCase');
        } catch (e) {
            // DO NOTHING
        }

        assert.deepStrictEqual(actual, ['A', undefined, undefined, 'D']);
    });

    it('should not error on elements with missing properties', function () {
        var objects = map([null, undefined, stubOne], function (value) {
            return { 'a': value };
        });

        var expected = map(objects, function (object) {
            return object.a ? object.a() : undefined;
        });

        try {
            var actual = invokeMap(objects, 'a');
        } catch (e) {
            // DO NOTHING
        }

        assert.deepStrictEqual(actual, expected);
    });

    it('should invoke deep property methods with the correct `this` binding', function () {
        var object = { 'a': { 'b': function () { return this.c; }, 'c': 1 } };

        each(['a.b', ['a', 'b']], function (path) {
            assert.deepStrictEqual(invokeMap([object], path), [1]);
        });
    });

    it('should return a wrapped value when chaining', function () {
        var array = ['a', 'b', 'c'];
        var wrapped = _(array);
        var actual = wrapped.invokeMap('toUpperCase');

        assert.ok(actual instanceof _);
        assert.deepEqual(actual.valueOf().value(), ['A', 'B', 'C']);

        actual = wrapped.invokeMap(function (left, right) {
            return left + this.toUpperCase() + right;
        }, '(', ')');

        assert.ok(actual instanceof _);
        assert.deepEqual(actual.valueOf().value(), ['(A)', '(B)', '(C)']);
    });
});
