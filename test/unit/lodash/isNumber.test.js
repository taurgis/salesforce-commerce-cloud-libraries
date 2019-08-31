var assert = require('assert');
var { falsey } = require('../helpers/stubs');
var args = require('../helpers/args');
var isNumber = require('../../../cartridges/lodash/isNumber');
var map = require('../../../cartridges/lodash/map');
var _ = require('../../../cartridges/lodash/wrapperLodash');
var slice = Array.prototype.slice;

describe('isNumber', function () {
    it('should return `true` for numbers', function () {
        assert.strictEqual(isNumber(0), true);
        assert.strictEqual(isNumber(Object(0)), true);
        assert.strictEqual(isNumber(NaN), true);
    });

    it('should return `false` for non-numbers', function () {
        var expected = map(falsey, function (value) {
            return typeof value === 'number';
        });

        var actual = map(falsey, function (value, index) {
            return index ? isNumber(value) : isNumber();
        });

        assert.deepStrictEqual(actual, expected);

        assert.strictEqual(isNumber(args), false);
        assert.strictEqual(isNumber([1, 2, 3]), false);
        assert.strictEqual(isNumber(true), false);
        assert.strictEqual(isNumber(new Date()), false);
        assert.strictEqual(isNumber(new Error()), false);
        assert.strictEqual(isNumber(_), false);
        assert.strictEqual(isNumber(slice), false);
        assert.strictEqual(isNumber({ 'a': 1 }), false);
        assert.strictEqual(isNumber(/x/), false);
        assert.strictEqual(isNumber('a'), false);
    });
});
