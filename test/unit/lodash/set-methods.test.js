var assert = require('assert');
var update = require('../../../cartridges/lodash/update');
var updateWith = require('../../../cartridges/lodash/updateWith');
var set = require('../../../cartridges/lodash/set');
var setWith = require('../../../cartridges/lodash/setWith');
var each = require('../../../cartridges/lodash/each');
var constant = require('../../../cartridges/lodash/constant');
var map = require('../../../cartridges/lodash/map');
var toString = require('../../../cartridges/lodash/toString');
var defineProperty = Object.defineProperty;

describe('set methods', function () {
    each(['update', 'updateWith', 'set', 'setWith'], function (methodName) {
        var func = (function () {
            switch (methodName) {
                case 'update': return update;
                case 'updateWith': return updateWith;
                case 'set': return set;
                case 'setWith': return setWith;

                default: return null;
            }
        }());
        var isUpdate = /^update/.test(methodName);

        var oldValue = 1;
        var value = 2;
        var updater = isUpdate ? constant(value) : value;

        it('`_.' + methodName + '` should set property values', function () {
            each(['a', ['a']], function (path) {
                var object = { 'a': oldValue };
                var actual = func(object, path, updater);

                assert.strictEqual(actual, object);
                assert.strictEqual(object.a, value);
            });
        });

        it('`_.' + methodName + '` should preserve the sign of `0`', function () {
            var props = [-0, Object(-0), 0, Object(0)];
            var expected = map(props, constant(value));

            var actual = map(props, function (key) {
                var object = { '-0': 'a', '0': 'b' };
                func(object, key, updater);
                return object[toString(key)];
            });

            assert.deepStrictEqual(actual, expected);
        });

        it('`_.' + methodName + '` should set deep property values', function () {
            each(['a.b', ['a', 'b']], function (path) {
                var object = { 'a': { 'b': oldValue } };
                var actual = func(object, path, updater);

                assert.strictEqual(actual, object);
                assert.strictEqual(object.a.b, value);
            });
        });

        it('`_.' + methodName + '` should set a key over a path', function () {
            each(['a.b', ['a.b']], function (path) {
                var object = { 'a.b': oldValue };
                var actual = func(object, path, updater);

                assert.strictEqual(actual, object);
                assert.deepStrictEqual(object, { 'a.b': value });
            });
        });

        it('`_.' + methodName + '` should not coerce array paths to strings', function () {
            var object = { 'a,b,c': 1, 'a': { 'b': { 'c': 1 } } };

            func(object, ['a', 'b', 'c'], updater);
            assert.strictEqual(object.a.b.c, value);
        });

        it('`_.' + methodName + '` should not ignore empty brackets', function () {
            var object = {};

            func(object, 'a[]', updater);
            assert.deepStrictEqual(object, { 'a': { '': value } });
        });

        it('`_.' + methodName + '` should handle empty paths', function () {
            each([['', ''], [[], ['']]], function (pair, index) {
                var object = {};

                func(object, pair[0], updater);
                assert.deepStrictEqual(object, index ? {} : { '': value });

                func(object, pair[1], updater);
                assert.deepStrictEqual(object, { '': value });
            });
        });

        it('`_.' + methodName + '` should handle complex paths', function () {
            var object = { 'a': { '1.23': { '["b"]': { 'c': { "['d']": { '\ne\n': { 'f': { 'g': oldValue } } } } } } } };

            var paths = [
                'a[-1.23]["[\\"b\\"]"].c[\'[\\\'d\\\']\'][\ne\n][f].g',
                ['a', '-1.23', '["b"]', 'c', "['d']", '\ne\n', 'f', 'g']
            ];

            each(paths, function (path) {
                func(object, path, updater);
                assert.strictEqual(object.a[-1.23]['["b"]'].c["['d']"]['\ne\n'].f.g, value);
                object.a[-1.23]['["b"]'].c["['d']"]['\ne\n'].f.g = oldValue;
            });
        });

        it('`_.' + methodName + '` should not error when `object` is nullish', function () {
            var values = [null, undefined];
            var expected = [[null, null], [undefined, undefined]];

            var actual = map(values, function (valueFn) {
                try {
                    return [func(valueFn, 'a.b', updater), func(valueFn, ['a', 'b'], updater)];
                } catch (e) {
                    return e.message;
                }
            });

            assert.deepStrictEqual(actual, expected);
        });

        it('`_.' + methodName + '` should overwrite primitives in the path', function () {
            each(['a.b', ['a', 'b']], function (path) {
                var object = { 'a': '' };

                func(object, path, updater);
                assert.deepStrictEqual(object, { 'a': { 'b': 2 } });
            });
        });

        it('`_.' + methodName + '` should not create an array for missing non-index property names that start with numbers', function () {
            var object = {};

            func(object, ['1a', '2b', '3c'], updater);
            assert.deepStrictEqual(object, { '1a': { '2b': { '3c': value } } });
        });

        it('`_.' + methodName + '` should not assign values that are the same as their destinations', function () {
            each(['a', ['a'], { 'a': 1 }, NaN], function (valueFn) {
                var object = {};
                var pass = true;
                var updaterFn = isUpdate ? constant(valueFn) : valueFn;

                defineProperty(object, 'a', {
                    'configurable': true,
                    'enumerable': true,
                    'get': constant(valueFn),
                    'set': function () { pass = false; }
                });

                func(object, 'a', updaterFn);
                assert.ok(pass);
            });
        });
    });
});
