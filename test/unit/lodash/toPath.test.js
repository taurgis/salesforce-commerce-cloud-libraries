var assert = require('assert');
var toPath = require('../../../cartridges/lodash/toPath');
var each = require('../../../cartridges/lodash/each');
var map = require('../../../cartridges/lodash/map');

describe('toPath', function () {
    it('should convert a string to a path', function () {
        assert.deepStrictEqual(toPath('a.b.c'), ['a', 'b', 'c']);
        assert.deepStrictEqual(toPath('a[0].b.c'), ['a', '0', 'b', 'c']);
    });

    it('should coerce array elements to strings', function () {
        var array = ['a', 'b', 'c'];

        each([array, map(array, Object)], function (value) {
            var actual = toPath(value);
            assert.deepStrictEqual(actual, array);
            assert.notStrictEqual(actual, array);
        });
    });

    it('should return new path array', function () {
        assert.notStrictEqual(toPath('a.b.c'), toPath('a.b.c'));
    });

    it('should handle complex paths', function () {
        var actual = toPath('a[-1.23]["[\\"b\\"]"].c[\'[\\\'d\\\']\'][\ne\n][f].g');
        assert.deepStrictEqual(actual, ['a', '-1.23', '["b"]', 'c', "['d']", '\ne\n', 'f', 'g']);
    });

    it('should handle consecutive empty brackets and dots', function () {
        var expected = ['', 'a'];
        assert.deepStrictEqual(toPath('.a'), expected);
        assert.deepStrictEqual(toPath('[].a'), expected);

        expected = ['', '', 'a'];
        assert.deepStrictEqual(toPath('..a'), expected);
        assert.deepStrictEqual(toPath('[][].a'), expected);

        expected = ['a', '', 'b'];
        assert.deepStrictEqual(toPath('a..b'), expected);
        assert.deepStrictEqual(toPath('a[].b'), expected);

        expected = ['a', '', '', 'b'];
        assert.deepStrictEqual(toPath('a...b'), expected);
        assert.deepStrictEqual(toPath('a[][].b'), expected);

        expected = ['a', ''];
        assert.deepStrictEqual(toPath('a.'), expected);
        assert.deepStrictEqual(toPath('a[]'), expected);

        expected = ['a', '', ''];
        assert.deepStrictEqual(toPath('a..'), expected);
        assert.deepStrictEqual(toPath('a[][]'), expected);
    });
});
