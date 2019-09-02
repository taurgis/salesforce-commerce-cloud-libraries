var assert = require('assert');
var each = require('../../../cartridges/lodash/each');
var pick = require('../../../cartridges/lodash/pick');
var toArgs = require('../helpers/toArgs');

describe('pick', function () {
    var args = toArgs(['a', 'c']);
    var object = { 'a': 1, 'b': 2, 'c': 3, 'd': 4 };
    var nested = { 'a': 1, 'b': { 'c': 2, 'd': 3 } };

    it('should flatten `paths`', function () {
        assert.deepStrictEqual(pick(object, 'a', 'c'), { 'a': 1, 'c': 3 });
        assert.deepStrictEqual(pick(object, ['a', 'd'], 'c'), { 'a': 1, 'c': 3, 'd': 4 });
    });

    it('should support deep paths', function () {
        assert.deepStrictEqual(pick(nested, 'b.c'), { 'b': { 'c': 2 } });
    });

    it('should support path arrays', function () {
        var objectFn = { 'a.b': 1, 'a': { 'b': 2 } };
        var actual = pick(objectFn, [['a.b']]);

        assert.deepStrictEqual(actual, { 'a.b': 1 });
    });

    it('should pick a key over a path', function () {
        var objectFn = { 'a.b': 1, 'a': { 'b': 2 } };

        each(['a.b', ['a.b']], function (path) {
            assert.deepStrictEqual(pick(objectFn, path), { 'a.b': 1 });
        });
    });

    it('should coerce `paths` to strings', function () {
        assert.deepStrictEqual(pick({ '0': 'a', '1': 'b' }, 0), { '0': 'a' });
    });

    it('should return an empty object when `object` is nullish', function () {
        each([null, undefined], function (value) {
            assert.deepStrictEqual(pick(value, 'valueOf'), {});
        });
    });

    it('should work with a primitive `object`', function () {
        assert.deepStrictEqual(pick('', 'slice'), { 'slice': ''.slice });
    });

    it('should work with `arguments` object `paths`', function () {
        assert.deepStrictEqual(pick(object, args), { 'a': 1, 'c': 3 });
    });
});
