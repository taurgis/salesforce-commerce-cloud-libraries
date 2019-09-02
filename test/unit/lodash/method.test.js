var assert = require('assert');
var { stubOne, stubTwo, stubThree, stubFour, noop } = require('../helpers/stubs');
var constant = require('../../../cartridges/lodash/constant');
var each = require('../../../cartridges/lodash/each');
var times = require('../../../cartridges/lodash/times');
var map = require('../../../cartridges/lodash/map');
var method = require('../../../cartridges/lodash/method');
var slice = Array.prototype.slice;

describe('method', function () {
    it('should create a function that calls a method of a given object', function () {
        var object = { 'a': stubOne };

        each(['a', ['a']], function (path) {
            var methodFn = method(path);
            assert.strictEqual(methodFn.length, 1);
            assert.strictEqual(methodFn(object), 1);
        });
    });

    it('should work with deep property values', function () {
        var object = { 'a': { 'b': stubTwo } };

        each(['a.b', ['a', 'b']], function (path) {
            var methodFn = method(path);
            assert.strictEqual(methodFn(object), 2);
        });
    });

    it('should work with a non-string `path`', function () {
        var array = times(3, constant);

        each([1, [1]], function (path) {
            var methodFn = method(path);
            assert.strictEqual(methodFn(array), 1);
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
                var methodFn = method(index ? [path] : path);
                return methodFn(object);
            });

            assert.deepStrictEqual(actual, expected);
        });
    });

    it('should work with inherited property values', function () {
        function Foo() {}
        Foo.prototype.a = stubOne;

        each(['a', ['a']], function (path) {
            var methodFn = method(path);
            assert.strictEqual(methodFn(new Foo()), 1);
        });
    });

    it('should use a key over a path', function () {
        var object = { 'a.b': stubOne, 'a': { 'b': stubTwo } };

        each(['a.b', ['a.b']], function (path) {
            var methodFn = method(path);
            assert.strictEqual(methodFn(object), 1);
        });
    });

    it('should return `undefined` when `object` is nullish', function () {
        var values = [, null, undefined];
        var expected = map(values, noop);

        each(['constructor', ['constructor']], function (path) {
            var methodFn = method(path);

            var actual = map(values, function (value, index) {
                return index ? methodFn(value) : methodFn();
            });

            assert.deepStrictEqual(actual, expected);
        });
    });

    it('should return `undefined` for deep paths when `object` is nullish', function () {
        var values = [, null, undefined];
        var expected = map(values, noop);

        each(['constructor.prototype.valueOf', ['constructor', 'prototype', 'valueOf']], function (path) {
            var methodFn = method(path);

            var actual = map(values, function (value, index) {
                return index ? methodFn(value) : methodFn();
            });

            assert.deepStrictEqual(actual, expected);
        });
    });

    it('should return `undefined` if parts of `path` are missing', function () {
        var object = {};

        each(['a', 'a[1].b.c', ['a'], ['a', '1', 'b', 'c']], function (path) {
            var methodFn = method(path);
            assert.strictEqual(methodFn(object), undefined);
        });
    });

    it('should apply partial arguments to function', function () {
        var object = {
            'fn': function () {
                return slice.call(arguments);
            }
        };

        each(['fn', ['fn']], function (path) {
            var methodFn = method(path, 1, 2, 3);
            assert.deepStrictEqual(methodFn(object), [1, 2, 3]);
        });
    });

    it('should invoke deep property methods with the correct `this` binding', function () {
        var object = { 'a': { 'b': function () { return this.c; }, 'c': 1 } };

        each(['a.b', ['a', 'b']], function (path) {
            var methodFn = method(path);
            assert.strictEqual(methodFn(object), 1);
        });
    });
});
