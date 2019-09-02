var assert = require('assert');
var { falsey } = require('../helpers/stubs');
var args = require('../helpers/args');
var isUndefined = require('../../../cartridges/lodash/isUndefined');
var map = require('../../../cartridges/lodash/map');
var _ = require('../../../cartridges/lodash/wrapperLodash');
var slice = Array.prototype.slice;

describe('isUndefined', function () {
    it('should return `true` for `undefined` values', function () {
        assert.strictEqual(isUndefined(), true);
        assert.strictEqual(isUndefined(undefined), true);
    });

    it('should return `false` for non `undefined` values', function () {
        var expected = map(falsey, function (value) {
            return value === undefined;
        });

        var actual = map(falsey, function (value, index) {
            return index ? isUndefined(value) : isUndefined();
        });

        assert.deepStrictEqual(actual, expected);

        assert.strictEqual(isUndefined(args), false);
        assert.strictEqual(isUndefined([1, 2, 3]), false);
        assert.strictEqual(isUndefined(true), false);
        assert.strictEqual(isUndefined(new Date()), false);
        assert.strictEqual(isUndefined(new Error()), false);
        assert.strictEqual(isUndefined(_), false);
        assert.strictEqual(isUndefined(slice), false);
        assert.strictEqual(isUndefined({ 'a': 1 }), false);
        assert.strictEqual(isUndefined(1), false);
        assert.strictEqual(isUndefined(/x/), false);
        assert.strictEqual(isUndefined('a'), false);
    });
});
