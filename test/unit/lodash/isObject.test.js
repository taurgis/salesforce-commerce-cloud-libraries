var assert = require('assert');
var { falsey, stubFalse } = require('../helpers/stubs');
var args = require('../helpers/args');
var isObject = require('../../../cartridges/lodash/isObject');
var map = require('../../../cartridges/lodash/map');
var _ = require('../../../cartridges/lodash/wrapperLodash');
var slice = Array.prototype.slice;

describe('isObject', function () {
    it('should return `true` for objects', function () {
        assert.strictEqual(isObject(args), true);
        assert.strictEqual(isObject([1, 2, 3]), true);
        assert.strictEqual(isObject(Object(false)), true);
        assert.strictEqual(isObject(new Date()), true);
        assert.strictEqual(isObject(new Error()), true);
        assert.strictEqual(isObject(_), true);
        assert.strictEqual(isObject(slice), true);
        assert.strictEqual(isObject({ 'a': 1 }), true);
        assert.strictEqual(isObject(Object(0)), true);
        assert.strictEqual(isObject(/x/), true);
        assert.strictEqual(isObject(Object('a')), true);
    });

    it('should return `false` for non-objects', function () {
        var values = falsey.concat(true, 1, 'a');
        var expected = map(values, stubFalse);

        var actual = map(values, function (value, index) {
            return index ? isObject(value) : isObject();
        });

        assert.deepStrictEqual(actual, expected);
    });
});
