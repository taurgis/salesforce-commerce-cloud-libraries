var assert = require('assert');
var isDate = require('../../../cartridges/lodash/isDate');
var map = require('../../../cartridges/lodash/map');
var _ = require('../../../cartridges/lodash/wrapperLodash');
var args = require('../helpers/args');
var stubFalse = require('../helpers/stubs').false;
var falsey = require('../helpers/falsey');
var slice = Array.prototype.slice;

describe('isDate', function () {
    it('should return `true` for dates', function () {
        assert.strictEqual(isDate(new Date()), true);
    });

    it('should return `false` for non-dates', function () {
        var expected = map(falsey, stubFalse);

        var actual = map(falsey, function (value, index) {
            return index ? isDate(value) : isDate();
        });

        assert.deepStrictEqual(actual, expected);

        assert.strictEqual(isDate(args), false);
        assert.strictEqual(isDate([1, 2, 3]), false);
        assert.strictEqual(isDate(true), false);
        assert.strictEqual(isDate(new Error()), false);
        assert.strictEqual(isDate(_), false);
        assert.strictEqual(isDate(slice), false);
        assert.strictEqual(isDate({ 'a': 1 }), false);
        assert.strictEqual(isDate(1), false);
        assert.strictEqual(isDate(/x/), false);
        assert.strictEqual(isDate('a'), false);
    });
});
