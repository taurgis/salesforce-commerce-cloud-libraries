var assert = require('assert');
var isArray = require('../../../cartridges/lodash/isArray');
var map = require('../../../cartridges/lodash/map');
var _ = require('../../../cartridges/lodash/wrapperLodash');
var stubFalse = require('../helpers/stubs').false;
var args = require('../helpers/args');
var falsey = require('../helpers/falsey');
var slice = Array.prototype.slice;


describe('isArray', function () {
    it('should return `true` for arrays', function () {
        assert.strictEqual(isArray([1, 2, 3]), true);
    });

    it('should return `false` for non-arrays', function () {
        var expected = map(falsey, stubFalse);

        var actual = map(falsey, function (value, index) {
            return index ? isArray(value) : isArray();
        });

        assert.deepStrictEqual(actual, expected);

        assert.strictEqual(isArray(args), false);
        assert.strictEqual(isArray(true), false);
        assert.strictEqual(isArray(new Date()), false);
        assert.strictEqual(isArray(new Error()), false);
        assert.strictEqual(isArray(_), false);
        assert.strictEqual(isArray(slice), false);
        assert.strictEqual(isArray({ '0': 1, 'length': 1 }), false);
        assert.strictEqual(isArray(1), false);
        assert.strictEqual(isArray(/x/), false);
        assert.strictEqual(isArray('a'), false);
    });
});
