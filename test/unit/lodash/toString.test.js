var assert = require('assert');
var toString = require('../../../cartridges/lodash/toString');
var map = require('../../../cartridges/lodash/map');
var _ = require('../../../cartridges/lodash/wrapperLodash');
var { stubString } = require('../helpers/stubs');

describe('toString', function () {
    it('should treat nullish values as empty strings', function () {
        var values = [, null, undefined];
        var expected = map(values, stubString);

        var actual = map(values, function (value, index) {
            return index ? toString(value) : toString();
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should preserve the sign of `0`', function () {
        var values = [-0, Object(-0), 0, Object(0)];
        var expected = ['-0', '-0', '0', '0'];
        var actual = map(values, toString);

        assert.deepStrictEqual(actual, expected);
    });

    it('should preserve the sign of `0` in an array', function () {
        var values = [-0, Object(-0), 0, Object(0)];
        assert.deepStrictEqual(toString(values), '-0,-0,0,0');
    });

    it('should return the `toString` result of the wrapped value', function () {
        var wrapped = _([1, 2, 3]);
        assert.strictEqual(wrapped.toString().value(), '1,2,3');
    });
});
