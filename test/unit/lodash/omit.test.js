var assert = require('assert');
var omit = require('../../../cartridges/lodash/omit');
var each = require('../../../cartridges/lodash/each');
var toArgs = require('../helpers/toArgs');
var objectProto = Object.prototype;
var stringProto = String.prototype;

describe('omit', function () {
    var argsFn = toArgs(['a', 'c']);
    var object = { 'a': 1, 'b': 2, 'c': 3, 'd': 4 };
    var nested = { 'a': 1, 'b': { 'c': 2, 'd': 3 } };

    it('should flatten `paths`', function () {
        assert.deepStrictEqual(omit(object, 'a', 'c'), { 'b': 2, 'd': 4 });
        assert.deepStrictEqual(omit(object, ['a', 'd'], 'c'), { 'b': 2 });
    });

    it('should support deep paths', function () {
        assert.deepStrictEqual(omit(nested, 'b.c'), { 'a': 1, 'b': { 'd': 3 } });
    });

    it('should support path arrays', function () {
        var objectPath = { 'a.b': 1, 'a': { 'b': 2 } };
        var actual = omit(objectPath, [['a.b']]);

        assert.deepStrictEqual(actual, { 'a': { 'b': 2 } });
    });

    it('should omit a key over a path', function () {
        var objectPath = { 'a.b': 1, 'a': { 'b': 2 } };

        each(['a.b', ['a.b']], function (path) {
            assert.deepStrictEqual(omit(objectPath, path), { 'a': { 'b': 2 } });
        });
    });

    it('should coerce `paths` to strings', function () {
        assert.deepStrictEqual(omit({ '0': 'a' }, 0), {});
    });

    it('should return an empty object when `object` is nullish', function () {
        each([null, undefined], function (value) {
            objectProto.a = 1;
            var actual = omit(value, 'valueOf');
            delete objectProto.a;
            assert.deepStrictEqual(actual, {});
        });
    });

    it('should work with a primitive `object`', function () {
        stringProto.a = 1;
        stringProto.b = 2;

        assert.deepStrictEqual(omit('', 'b'), { 'a': 1 });

        delete stringProto.a;
        delete stringProto.b;
    });

    it('should work with `arguments` object `paths`', function () {
        assert.deepStrictEqual(omit(object, argsFn), { 'b': 2, 'd': 4 });
    });

    it('should not mutate `object`', function () {
        each(['a', ['a'], 'a.b', ['a.b']], function (path) {
            var objectPath = { 'a': { 'b': 2 } };
            omit(objectPath, path);
            assert.deepStrictEqual(objectPath, { 'a': { 'b': 2 } });
        });
    });
});
