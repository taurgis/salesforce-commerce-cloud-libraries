var assert = require('assert');
var unset = require('../../../cartridges/lodash/unset');
var each = require('../../../cartridges/lodash/each');
var constant = require('../../../cartridges/lodash/constant');
var map = require('../../../cartridges/lodash/map');
var numberProto = Number.prototype;
var stringProto = String.prototype;
var defineProperty = Object.defineProperty;

describe('unset', function () {
    it('should unset property values', function () {
        each(['a', ['a']], function (path) {
            var object = { 'a': 1, 'c': 2 };
            assert.strictEqual(unset(object, path), true);
            assert.deepStrictEqual(object, { 'c': 2 });
        });
    });

    it('should preserve the sign of `0`', function () {
        var props = [-0, Object(-0), 0, Object(0)];
        var expected = map(props, constant([true, false]));

        var actual = map(props, function (key) {
            var object = { '-0': 'a', '0': 'b' };
            return [unset(object, key), toString(key) in object];
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should unset deep property values', function () {
        each(['a.b', ['a', 'b']], function (path) {
            var object = { 'a': { 'b': null } };
            assert.strictEqual(unset(object, path), true);
            assert.deepStrictEqual(object, { 'a': {} });
        });
    });

    it('should handle complex paths', function () {
        var paths = [
            'a[-1.23]["[\\"b\\"]"].c[\'[\\\'d\\\']\'][\ne\n][f].g',
            ['a', '-1.23', '["b"]', 'c', "['d']", '\ne\n', 'f', 'g']
        ];

        each(paths, function (path) {
            var object = { 'a': { '-1.23': { '["b"]': { 'c': { "['d']": { '\ne\n': { 'f': { 'g': 8 } } } } } } } };
            assert.strictEqual(unset(object, path), true);
            assert.ok(!('g' in object.a[-1.23]['["b"]'].c["['d']"]['\ne\n'].f));
        });
    });

    it('should return `true` for nonexistent paths', function () {
        var object = { 'a': { 'b': { 'c': null } } };

        each(['z', 'a.z', 'a.b.z', 'a.b.c.z'], function (path) {
            assert.strictEqual(unset(object, path), true);
        });

        assert.deepStrictEqual(object, { 'a': { 'b': { 'c': null } } });
    });

    it('should not error when `object` is nullish', function () {
        var values = [null, undefined];
        var expected = [[true, true], [true, true]];

        var actual = map(values, function (value) {
            try {
                return [unset(value, 'a.b'), unset(value, ['a', 'b'])];
            } catch (e) {
                return e.message;
            }
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should follow `path` over non-plain objects', function () {
        var object = { 'a': '' };
        var paths = ['constructor.prototype.a', ['constructor', 'prototype', 'a']];

        each(paths, function (path) {
            numberProto.a = 1;

            var actual = unset(0, path);
            assert.strictEqual(actual, true);
            assert.ok(!('a' in numberProto));

            delete numberProto.a;
        });

        each(['a.replace.b', ['a', 'replace', 'b']], function (path) {
            stringProto.replace.b = 1;

            var actual = unset(object, path);
            assert.strictEqual(actual, true);
            assert.ok(!('a' in stringProto.replace));

            delete stringProto.replace.b;
        });
    });

    it('should return `false` for non-configurable properties', function () {
        var object = {};

        defineProperty(object, 'a', {
            'configurable': false,
            'enumerable': true,
            'writable': true,
            'value': 1
        });
        assert.strictEqual(unset(object, 'a'), false);
    });
});
