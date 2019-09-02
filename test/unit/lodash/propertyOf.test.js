var assert = require('assert');
var propertyOf = require('../../../cartridges/lodash/propertyOf');
var each = require('../../../cartridges/lodash/each');
var map = require('../../../cartridges/lodash/map');
var constant = require('../../../cartridges/lodash/constant');
var times = require('../../../cartridges/lodash/times');
var { noop } = require('../helpers/stubs');

describe('propertyOf', function () {
    it('should create a function that plucks a property value of a given key', function () {
        var object = { 'a': 1 };
        var propOf = propertyOf(object);

        assert.strictEqual(propOf.length, 1);
        each(['a', ['a']], function (path) {
            assert.strictEqual(propOf(path), 1);
        });
    });

    it('should pluck deep property values', function () {
        var object = { 'a': { 'b': 2 } };
        var propOf = propertyOf(object);

        each(['a.b', ['a', 'b']], function (path) {
            assert.strictEqual(propOf(path), 2);
        });
    });

    it('should pluck inherited property values', function () {
        function Foo() {
            this.a = 1;
        }
        Foo.prototype.b = 2;

        var propOf = propertyOf(new Foo());

        each(['b', ['b']], function (path) {
            assert.strictEqual(propOf(path), 2);
        });
    });

    it('should work with a non-string `path`', function () {
        var array = [1, 2, 3];
        var propOf = propertyOf(array);

        each([1, [1]], function (path) {
            assert.strictEqual(propOf(path), 2);
        });
    });

    it('should preserve the sign of `0`', function () {
        var object = { '-0': 'a', '0': 'b' };
        var props = [-0, Object(-0), 0, Object(0)];

        var actual = map(props, function (key) {
            var propOf = propertyOf(object);
            return propOf(key);
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
                var propOf = propertyOf(object);
                return propOf(index ? [path] : path);
            });

            assert.deepStrictEqual(actual, expected);
        });
    });

    it('should pluck a key over a path', function () {
        var object = { 'a.b': 1, 'a': { 'b': 2 } };
        var propOf = propertyOf(object);

        each(['a.b', ['a.b']], function (path) {
            assert.strictEqual(propOf(path), 1);
        });
    });

    it('should return `undefined` when `object` is nullish', function () {
        var values = [, null, undefined];
        var expected = map(values, noop);

        each(['constructor', ['constructor']], function (path) {
            var actual = map(values, function (value, index) {
                var propOf = index ? propertyOf(value) : propertyOf();
                return propOf(path);
            });

            assert.deepStrictEqual(actual, expected);
        });
    });

    it('should return `undefined` for deep paths when `object` is nullish', function () {
        var values = [, null, undefined];
        var expected = map(values, noop);

        each(['constructor.prototype.valueOf', ['constructor', 'prototype', 'valueOf']], function (path) {
            var actual = map(values, function (value, index) {
                var propOf = index ? propertyOf(value) : propertyOf();
                return propOf(path);
            });

            assert.deepStrictEqual(actual, expected);
        });
    });

    it('should return `undefined` if parts of `path` are missing', function () {
        var propOf = propertyOf({});

        each(['a', 'a[1].b.c', ['a'], ['a', '1', 'b', 'c']], function (path) {
            assert.strictEqual(propOf(path), undefined);
        });
    });
});
