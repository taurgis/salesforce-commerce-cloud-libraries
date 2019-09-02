var assert = require('assert');
var { falsey } = require('../helpers/stubs');
var args = require('../helpers/args');
var isNil = require('../../../cartridges/lodash/isNil');
var map = require('../../../cartridges/lodash/map');
var _ = require('../../../cartridges/lodash/wrapperLodash');
var slice = Array.prototype.slice;

describe('isNil', function () {
    it('should return `true` for nullish values', function () {
        assert.strictEqual(isNil(null), true);
        assert.strictEqual(isNil(), true);
        assert.strictEqual(isNil(undefined), true);
    });

    it('should return `false` for non-nullish values', function () {
        var expected = map(falsey, function (value) {
            return value == null;
        });

        var actual = map(falsey, function (value, index) {
            return index ? isNil(value) : isNil();
        });

        assert.deepStrictEqual(actual, expected);

        assert.strictEqual(isNil(args), false);
        assert.strictEqual(isNil([1, 2, 3]), false);
        assert.strictEqual(isNil(true), false);
        assert.strictEqual(isNil(new Date()), false);
        assert.strictEqual(isNil(new Error()), false);
        assert.strictEqual(isNil(_), false);
        assert.strictEqual(isNil(slice), false);
        assert.strictEqual(isNil({ 'a': 1 }), false);
        assert.strictEqual(isNil(1), false);
        assert.strictEqual(isNil(/x/), false);
        assert.strictEqual(isNil('a'), false);
    });
});
