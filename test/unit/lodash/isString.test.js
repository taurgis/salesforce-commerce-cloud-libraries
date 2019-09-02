var assert = require('assert');
var { falsey } = require('../helpers/stubs');
var args = require('../helpers/args');
var isString = require('../../../cartridges/lodash/isString');
var map = require('../../../cartridges/lodash/map');
var _ = require('../../../cartridges/lodash/wrapperLodash');
var slice = Array.prototype.slice;

describe('isString', function () {
    it('should return `true` for strings', function () {
        assert.strictEqual(isString('a'), true);
        assert.strictEqual(isString(Object('a')), true);
    });

    it('should return `false` for non-strings', function () {
        var expected = map(falsey, function (value) {
            return value === '';
        });

        var actual = map(falsey, function (value, index) {
            return index ? isString(value) : isString();
        });

        assert.deepStrictEqual(actual, expected);

        assert.strictEqual(isString(args), false);
        assert.strictEqual(isString([1, 2, 3]), false);
        assert.strictEqual(isString(true), false);
        assert.strictEqual(isString(new Date()), false);
        assert.strictEqual(isString(new Error()), false);
        assert.strictEqual(isString(_), false);
        assert.strictEqual(isString(slice), false);
        assert.strictEqual(isString({ '0': 1, 'length': 1 }), false);
        assert.strictEqual(isString(1), false);
        assert.strictEqual(isString(/x/), false);
    });
});
