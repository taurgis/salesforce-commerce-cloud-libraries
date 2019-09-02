var assert = require('assert');
var property = require('../../../cartridges/lodash/property');
var each = require('../../../cartridges/lodash/each');
var map = require('../../../cartridges/lodash/map');
var constant = require('../../../cartridges/lodash/constant');
var times = require('../../../cartridges/lodash/times');
var { noop } = require('../helpers/stubs');

describe('property', function () {
    it('should create a function that plucks a property value of a given object', function () {
        var object = { 'a': 1 };

        each(['a', ['a']], function (path) {
            var prop = property(path);
            assert.strictEqual(prop.length, 1);
            assert.strictEqual(prop(object), 1);
        });
    });

    it('should pluck deep property values', function () {
        var object = { 'a': { 'b': 2 } };

        each(['a.b', ['a', 'b']], function (path) {
            var prop = property(path);
            assert.strictEqual(prop(object), 2);
        });
    });

    it('should pluck inherited property values', function () {
        function Foo() {}
        Foo.prototype.a = 1;

        each(['a', ['a']], function (path) {
            var prop = property(path);
            assert.strictEqual(prop(new Foo()), 1);
        });
    });

    it('should work with a non-string `path`', function () {
        var array = [1, 2, 3];

        each([1, [1]], function (path) {
            var prop = property(path);
            assert.strictEqual(prop(array), 2);
        });
    });

    it('should preserve the sign of `0`', function () {
        var object = { '-0': 'a', '0': 'b' };
        var props = [-0, Object(-0), 0, Object(0)];

        var actual = map(props, function (key) {
            var prop = property(key);
            return prop(object);
        });

        assert.deepStrictEqual(actual, ['a', 'a', 'b', 'b']);
    });

    it('should coerce `path` to a string', function () {
        function fn() {}
        fn.toString = constant('fn');

        var expected = [1, 2, 3, 4];
        var object = { 'null': 1, 'undefined': 2, 'fn': 3, '[object Object]': 4 };
        var paths = [null, undefined, fn, {}];

        times(2, function (index) {
            var actual = map(paths, function (path) {
                var prop = property(index ? [path] : path);
                return prop(object);
            });

            assert.deepStrictEqual(actual, expected);
        });
    });

    it('should pluck a key over a path', function () {
        var object = { 'a.b': 1, 'a': { 'b': 2 } };

        each(['a.b', ['a.b']], function (path) {
            var prop = property(path);
            assert.strictEqual(prop(object), 1);
        });
    });

    it('should return `undefined` when `object` is nullish', function () {
        var values = [, null, undefined];
        var expected = map(values, noop);

        each(['constructor', ['constructor']], function (path) {
            var prop = property(path);

            var actual = map(values, function (value, index) {
                return index ? prop(value) : prop();
            });

            assert.deepStrictEqual(actual, expected);
        });
    });

    it('should return `undefined` for deep paths when `object` is nullish', function () {
        var values = [, null, undefined];
        var expected = map(values, noop);

        each(['constructor.prototype.valueOf', ['constructor', 'prototype', 'valueOf']], function (path) {
            var prop = property(path);

            var actual = map(values, function (value, index) {
                return index ? prop(value) : prop();
            });

            assert.deepStrictEqual(actual, expected);
        });
    });

    it('should return `undefined` if parts of `path` are missing', function () {
        var object = {};

        each(['a', 'a[1].b.c', ['a'], ['a', '1', 'b', 'c']], function (path) {
            var prop = property(path);
            assert.strictEqual(prop(object), undefined);
        });
    });
});
