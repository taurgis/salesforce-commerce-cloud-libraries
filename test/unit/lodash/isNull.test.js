var assert = require('assert');
var { falsey } = require('../helpers/stubs');
var args = require('../helpers/args');
var isNull = require('../../../cartridges/lodash/isNull');
var map = require('../../../cartridges/lodash/map');
var _ = require('../../../cartridges/lodash/wrapperLodash');
var slice = Array.prototype.slice;

describe('isNull', function () {
    it('should return `true` for `null` values', function () {
        assert.strictEqual(isNull(null), true);
    });

    it('should return `false` for non `null` values', function () {
        var expected = map(falsey, function (value) {
            return value === null;
        });

        var actual = map(falsey, function (value, index) {
            return index ? isNull(value) : isNull();
        });

        assert.deepStrictEqual(actual, expected);

        assert.strictEqual(isNull(args), false);
        assert.strictEqual(isNull([1, 2, 3]), false);
        assert.strictEqual(isNull(true), false);
        assert.strictEqual(isNull(new Date()), false);
        assert.strictEqual(isNull(new Error()), false);
        assert.strictEqual(isNull(_), false);
        assert.strictEqual(isNull(slice), false);
        assert.strictEqual(isNull({ 'a': 1 }), false);
        assert.strictEqual(isNull(1), false);
        assert.strictEqual(isNull(/x/), false);
        assert.strictEqual(isNull('a'), false);
    });
});
