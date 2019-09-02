var assert = require('assert');
var each = require('../../../cartridges/lodash/each');
var map = require('../../../cartridges/lodash/map');
var get = require('../../../cartridges/lodash/get');
var result = require('../../../cartridges/lodash/result');
var noop = require('../helpers/stubs').noop;
var empties = require('../helpers/stubs').empties;
var numberProto = Number.prototype;

describe('get and result', function () {
    each(['get', 'result'], function (methodName) {
        var func = (function () {
            switch (methodName) {
                case 'get': return get;
                case 'result': return result;
                default: return null;
            }
        }());

        it('`_.' + methodName + '` should get string keyed property values', function () {
            var object = { 'a': 1 };

            each(['a', ['a']], function (path) {
                assert.strictEqual(func(object, path), 1);
            });
        });

        it('`_.' + methodName + '` should preserve the sign of `0`', function () {
            var object = { '-0': 'a', '0': 'b' };
            var props = [-0, Object(-0), 0, Object(0)];

            var actual = map(props, function (key) {
                return func(object, key);
            });

            assert.deepStrictEqual(actual, ['a', 'a', 'b', 'b']);
        });


        it('`_.' + methodName + '` should get deep property values', function () {
            var object = { 'a': { 'b': 2 } };

            each(['a.b', ['a', 'b']], function (path) {
                assert.strictEqual(func(object, path), 2);
            });
        });

        it('`_.' + methodName + '` should get a key over a path', function () {
            var object = { 'a.b': 1, 'a': { 'b': 2 } };

            each(['a.b', ['a.b']], function (path) {
                assert.strictEqual(func(object, path), 1);
            });
        });

        it('`_.' + methodName + '` should not coerce array paths to strings', function () {
            var object = { 'a,b,c': 3, 'a': { 'b': { 'c': 4 } } };
            assert.strictEqual(func(object, ['a', 'b', 'c']), 4);
        });

        it('`_.' + methodName + '` should not ignore empty brackets', function () {
            var object = { 'a': { '': 1 } };
            assert.strictEqual(func(object, 'a[]'), 1);
        });

        it('`_.' + methodName + '` should handle empty paths', function () {
            each([['', ''], [[], ['']]], function (pair) {
                assert.strictEqual(func({}, pair[0]), undefined);
                assert.strictEqual(func({ '': 3 }, pair[1]), 3);
            });
        });

        it('`_.' + methodName + '` should return `undefined` when `object` is nullish', function () {
            each(['constructor', ['constructor']], function (path) {
                assert.strictEqual(func(null, path), undefined);
                assert.strictEqual(func(undefined, path), undefined);
            });
        });

        it('`_.' + methodName + '` should return `undefined` for deep paths when `object` is nullish', function () {
            var values = [null, undefined];
            var expected = map(values, noop);
            var paths = ['constructor.prototype.valueOf', ['constructor', 'prototype', 'valueOf']];

            each(paths, function (path) {
                var actual = map(values, function (value) {
                    return func(value, path);
                });

                assert.deepStrictEqual(actual, expected);
            });
        });

        it('`_.' + methodName + '` should return `undefined` if parts of `path` are missing', function () {
            var object = { 'a': [, null] };

            each(['a[1].b.c', ['a', '1', 'b', 'c']], function (path) {
                assert.strictEqual(func(object, path), undefined);
            });
        });

        it('`_.' + methodName + '` should be able to return `null` values', function () {
            var object = { 'a': { 'b': null } };

            each(['a.b', ['a', 'b']], function (path) {
                assert.strictEqual(func(object, path), null);
            });
        });

        it('`_.' + methodName + '` should follow `path` over non-plain objects', function () {
            var paths = ['a.b', ['a', 'b']];

            each(paths, function (path) {
                numberProto.a = { 'b': 2 };
                assert.strictEqual(func(0, path), 2);
                delete numberProto.a;
            });
        });

        it('`_.' + methodName + '` should return the default value for `undefined` values', function () {
            var object = { 'a': {} };
            var values = empties.concat(true, new Date(), 1, /x/, 'a');
            var expected = map(values, function (value) { return [value, value]; });

            each(['a.b', ['a', 'b']], function (path) {
                var actual = map(values, function (value) {
                    return [func(object, path, value), func(null, path, value)];
                });

                assert.deepStrictEqual(actual, expected);
            });
        });

        it('`_.' + methodName + '` should return the default value when `path` is empty', function () {
            assert.strictEqual(func({}, [], 'a'), 'a');
        });
    });
});
