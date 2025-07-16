var assert = require('assert');
var stubFalse = require('../helpers/stubs').false;
var stubTrue = require('../helpers/stubs').true;
var toArgs = require('../helpers/toArgs');
var map = require('../../../cartridges/lodash/map');
var constant = require('../../../cartridges/lodash/constant');
var each = require('../../../cartridges/lodash/each');
var has = require('../../../cartridges/lodash/has');
var hasIn = require('../../../cartridges/lodash/hasIn');
var times = require('../../../cartridges/lodash/times');
var args = require('../helpers/args');

describe('has methods', function () {
    each(['has', 'hasIn'], function (methodName) {
        var func = (function () {
            switch (methodName) {
                case 'has': return has;
                case 'hasIn': return hasIn;
                default: return null;
            }
        }());
        var isHas = methodName === 'has';
        var sparseArgs = toArgs([1]);
        var sparseArray = Array(1);
        var sparseString = Object('a');

        sparseArgs[0] = undefined;

        it('`_.' + methodName + '` should check for own properties', function () {
            var object = { 'a': 1 };

            each(['a', ['a']], function (path) {
                assert.strictEqual(func(object, path), true);
            });
        });

        it('`_.' + methodName + '` should not use the `hasOwnProperty` method of `object`', function () {
            var object = { 'hasOwnProperty': null, 'a': 1 };
            assert.strictEqual(func(object, 'a'), true);
        });

        it('`_.' + methodName + '` should support deep paths', function () {
            var object = { 'a': { 'b': 2 } };

            each(['a.b', ['a', 'b']], function (path) {
                assert.strictEqual(func(object, path), true);
            });

            each(['a.a', ['a', 'a']], function (path) {
                assert.strictEqual(func(object, path), false);
            });
        });

        it('`_.' + methodName + '` should coerce `path` to a string', function () {
            function fn() {}
            fn.toString = constant('fn');

            var object = { 'null': 1, 'undefined': 2, 'fn': 3, '[object Object]': 4 };
            var paths = [null, undefined, fn, {}];
            var expected = map(paths, stubTrue);

            times(2, function (index) {
                var actual = map(paths, function (path) {
                    return func(object, index ? [path] : path);
                });

                assert.deepStrictEqual(actual, expected);
            });
        });

        it('`_.' + methodName + '` should work with `arguments` objects', function () {
            assert.strictEqual(func(args, 1), true);
        });

        it('`_.' + methodName + '` should work with a non-string `path`', function () {
            var array = [1, 2, 3];

            each([1, [1]], function (path) {
                assert.strictEqual(func(array, path), true);
            });
        });

        it('`_.' + methodName + '` should preserve the sign of `0`', function () {
            var object = { '-0': 'a', '0': 'b' };
            var props = [-0, Object(-0), 0, Object(0)];
            var expected = map(props, stubTrue);

            var actual = map(props, function (key) {
                return func(object, key);
            });

            assert.deepStrictEqual(actual, expected);
        });

        it('`_.' + methodName + '` should check for a key over a path', function () {
            var object = { 'a.b': 1 };

            each(['a.b', ['a.b']], function (path) {
                assert.strictEqual(func(object, path), true);
            });
        });

        it('`_.' + methodName + '` should return `true` for indexes of sparse values', function () {
            var values = [sparseArgs, sparseArray, sparseString];
            var expected = map(values, stubTrue);

            var actual = map(values, function (value) {
                return func(value, 0);
            });

            assert.deepStrictEqual(actual, expected);
        });

        it('`_.' + methodName + '` should return `true` for indexes of sparse values with deep paths', function () {
            var values = [sparseArgs, sparseArray, sparseString];
            var expected = map(values, constant([true, true]));

            var actual = map(values, function (value) {
                return map(['a[0]', ['a', '0']], function (path) {
                    return func({ 'a': value }, path);
                });
            });

            assert.deepStrictEqual(actual, expected);
        });

        it('`_.' + methodName + '` should return `' + (isHas ? 'false' : 'true') + '` for inherited properties', function () {
            function Foo() {}
            Foo.prototype.a = 1;

            each(['a', ['a']], function (path) {
                assert.strictEqual(func(new Foo(), path), !isHas);
            });
        });

        it('`_.' + methodName + '` should return `' + (isHas ? 'false' : 'true') + '` for nested inherited properties', function () {
            function Foo() {}
            Foo.prototype.a = { 'b': 1 };

            each(['a.b', ['a', 'b']], function (path) {
                assert.strictEqual(func(new Foo(), path), !isHas);
            });
        });

        it('`_.' + methodName + '` should return `false` when `object` is nullish', function () {
            var values = [null, undefined];
            var expected = map(values, stubFalse);

            each(['constructor', ['constructor']], function (path) {
                var actual = map(values, function (value) {
                    return func(value, path);
                });

                assert.deepStrictEqual(actual, expected);
            });
        });

        it('`_.' + methodName + '` should return `false` for deep paths when `object` is nullish', function () {
            var values = [null, undefined];
            var expected = map(values, stubFalse);

            each(['constructor.prototype.valueOf', ['constructor', 'prototype', 'valueOf']], function (path) {
                var actual = map(values, function (value) {
                    return func(value, path);
                });

                assert.deepStrictEqual(actual, expected);
            });
        });

        it('`_.' + methodName + '` should return `false` for nullish values of nested objects', function () {
            var values = [, null, undefined]; // eslint-disable-line
            var expected = map(values, stubFalse);

            each(['a.b', ['a', 'b']], function (path) {
                var actual = map(values, function (value, index) {
                    var object = index ? { 'a': value } : {};
                    return func(object, path);
                });

                assert.deepStrictEqual(actual, expected);
            });
        });

        it('`_.' + methodName + '` should return `false` over sparse values of deep paths', function () {
            var values = [sparseArgs, sparseArray, sparseString];
            var expected = map(values, constant([false, false]));

            var actual = map(values, function (value) {
                return map(['a[0].b', ['a', '0', 'b']], function (path) {
                    return func({ 'a': value }, path);
                });
            });

            assert.deepStrictEqual(actual, expected);
        });
    });
});
