var assert = require('assert');
var split = require('../../../cartridges/lodash/split');
var constant = require('../../../cartridges/lodash/constant');
var map = require('../../../cartridges/lodash/map');
var _ = require('../../../cartridges/lodash/wrapperLodash');

describe('split', function () {
    it('should split a string by `separator`', function () {
        var string = 'abcde';
        assert.deepStrictEqual(split(string, 'c'), ['ab', 'de']);
        assert.deepStrictEqual(split(string, /[bd]/), ['a', 'c', 'e']);
        assert.deepStrictEqual(split(string, '', 2), ['a', 'b']);
    });

    it('should return an array containing an empty string for empty values', function () {
        var values = [, null, undefined, ''];
        var expected = map(values, constant(['']));

        var actual = map(values, function (value, index) {
            return index ? split(value) : split();
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should work as an iteratee for methods like `_.map`', function () {
        var strings = ['abc', 'def', 'ghi'];
        var actual = map(strings, split);

        assert.deepStrictEqual(actual, [['abc'], ['def'], ['ghi']]);
    });

    it('should allow mixed string and array prototype methods', function () {
        var wrapped = _('abc');
        assert.strictEqual(wrapped.split('b').join(',').value(), 'a,c');
    });
});
