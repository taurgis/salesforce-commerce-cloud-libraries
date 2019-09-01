var assert = require('assert');
var { stubOne, stubTwo, stubThree, stubFour, noop } = require('../helpers/stubs');
var constant = require('../../../cartridges/lodash/constant');
var each = require('../../../cartridges/lodash/each');
var times = require('../../../cartridges/lodash/times');
var map = require('../../../cartridges/lodash/map');
var methodOf = require('../../../cartridges/lodash/methodOf');
var slice = Array.prototype.slice;

describe('methodOf', function () {
    it('should create a function that calls a method of a given key', function () {
        var object = { 'a': stubOne };

        each(['a', ['a']], function (path) {
            var methodOfFn = methodOf(object);
            assert.strictEqual(methodOfFn.length, 1);
            assert.strictEqual(methodOfFn(path), 1);
        });
    });

    it('should work with deep property values', function () {
        var object = { 'a': { 'b': stubTwo } };

        each(['a.b', ['a', 'b']], function (path) {
            var methodOfFn = methodOf(object);
            assert.strictEqual(methodOfFn(path), 2);
        });
    });

    it('should work with a non-string `path`', function () {
        var array = times(3, constant);

        each([1, [1]], function (path) {
            var methodOfFn = methodOf(array);
            assert.strictEqual(methodOfFn(path), 1);
        });
    });

    it('should coerce `path` to a string', function () {
        function fn() {}
        fn.toString = constant('fn');

        var expected = [1, 2, 3, 4];
        var object = { 'null': stubOne, 'undefined': stubTwo, 'fn': stubThree, '[object Object]': stubFour };
        var paths = [null, undefined, fn, {}];

        times(2, function (index) {
            var actual = map(paths, function (path) {
                var methodOfFn = methodOf(object);
                return methodOfFn(index ? [path] : path);
            });

            assert.deepStrictEqual(actual, expected);
        });
    });

    it('should work with inherited property values', function () {
        function Foo() {}
        Foo.prototype.a = stubOne;

        each(['a', ['a']], function (path) {
            var methodOfFn = methodOf(new Foo());
            assert.strictEqual(methodOfFn(path), 1);
        });
    });

    it('should use a key over a path', function () {
        var object = { 'a.b': stubOne, 'a': { 'b': stubTwo } };

        each(['a.b', ['a.b']], function (path) {
            var methodOfFn = methodOf(object);
            assert.strictEqual(methodOfFn(path), 1);
        });
    });

    it('should return `undefined` when `object` is nullish', function () {
        var values = [, null, undefined];
        var expected = map(values, noop);

        each(['constructor', ['constructor']], function (path) {
            var actual = map(values, function (value, index) {
                var methodOfFn = index ? methodOf() : methodOf(value);
                return methodOfFn(path);
            });

            assert.deepStrictEqual(actual, expected);
        });
    });

    it('should return `undefined` for deep paths when `object` is nullish', function () {
        var values = [, null, undefined];
        var expected = map(values, noop);

        each(['constructor.prototype.valueOf', ['constructor', 'prototype', 'valueOf']], function (path) {
            var actual = map(values, function (value, index) {
                var methodOfFn = index ? methodOf() : methodOf(value);
                return methodOfFn(path);
            });

            assert.deepStrictEqual(actual, expected);
        });
    });

    it('should return `undefined` if parts of `path` are missing', function () {
        var object = {};
        var methodOfFn = methodOf(object);

        each(['a', 'a[1].b.c', ['a'], ['a', '1', 'b', 'c']], function (path) {
            assert.strictEqual(methodOfFn(path), undefined);
        });
    });

    it('should apply partial arguments to function', function () {
        var object = {
            'fn': function () {
                return slice.call(arguments);
            }
        };

        var methodOfFn = methodOf(object, 1, 2, 3);

        each(['fn', ['fn']], function (path) {
            assert.deepStrictEqual(methodOfFn(path), [1, 2, 3]);
        });
    });

    it('should invoke deep property methods with the correct `this` binding', function () {
        var object = { 'a': { 'b': function () { return this.c; }, 'c': 1 } };
        var methodOfFn = methodOf(object);

        each(['a.b', ['a', 'b']], function (path) {
            assert.strictEqual(methodOfFn(path), 1);
        });
    });
});
