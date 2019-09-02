var assert = require('assert');
var { falsey, stubFalse } = require('../helpers/stubs');
var args = require('../helpers/args');
var isObjectLike = require('../../../cartridges/lodash/isObjectLike');
var map = require('../../../cartridges/lodash/map');
var _ = require('../../../cartridges/lodash/wrapperLodash');
var slice = Array.prototype.slice;

describe('isObjectLike', function () {
    it('should return `true` for objects', function () {
        assert.strictEqual(isObjectLike(args), true);
        assert.strictEqual(isObjectLike([1, 2, 3]), true);
        assert.strictEqual(isObjectLike(Object(false)), true);
        assert.strictEqual(isObjectLike(new Date()), true);
        assert.strictEqual(isObjectLike(new Error()), true);
        assert.strictEqual(isObjectLike({ 'a': 1 }), true);
        assert.strictEqual(isObjectLike(Object(0)), true);
        assert.strictEqual(isObjectLike(/x/), true);
        assert.strictEqual(isObjectLike(Object('a')), true);
    });

    it('should return `false` for non-objects', function () {
        var values = falsey.concat(true, _, slice, 1, 'a');
        var expected = map(values, stubFalse);

        var actual = map(values, function (value, index) {
            return index ? isObjectLike(value) : isObjectLike();
        });

        assert.deepStrictEqual(actual, expected);
    });
});
