var assert = require('assert');
var isBoolean = require('../../../cartridges/lodash/isBoolean');
var map = require('../../../cartridges/lodash/map');
var _ = require('../../../cartridges/lodash/wrapperLodash');
var args = require('../helpers/args');
var falsey = require('../helpers/falsey');
var slice = Array.prototype.slice;

describe('isBoolean', function () {
    it('should return `true` for booleans', function () {
        assert.strictEqual(isBoolean(true), true);
        assert.strictEqual(isBoolean(false), true);
        assert.strictEqual(isBoolean(Object(true)), true);
        assert.strictEqual(isBoolean(Object(false)), true);
    });

    it('should return `false` for non-booleans', function () {
        var expected = map(falsey, function (value) {
            return value === false;
        });

        var actual = map(falsey, function (value, index) {
            return index ? isBoolean(value) : isBoolean();
        });

        assert.deepStrictEqual(actual, expected);

        assert.strictEqual(isBoolean(args), false);
        assert.strictEqual(isBoolean([1, 2, 3]), false);
        assert.strictEqual(isBoolean(new Date()), false);
        assert.strictEqual(isBoolean(new Error()), false);
        assert.strictEqual(isBoolean(_), false);
        assert.strictEqual(isBoolean(slice), false);
        assert.strictEqual(isBoolean({ 'a': 1 }), false);
        assert.strictEqual(isBoolean(1), false);
        assert.strictEqual(isBoolean(/x/), false);
        assert.strictEqual(isBoolean('a'), false);
    });
});
