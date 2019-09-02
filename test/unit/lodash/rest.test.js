var assert = require('assert');
var rest = require('../../../cartridges/lodash/rest');
var map = require('../../../cartridges/lodash/map');
var constant = require('../../../cartridges/lodash/constant');
var slice = Array.prototype.slice;

describe('rest', function () {
    function fn() {
        return slice.call(arguments);
    }

    it('should work with `start`', function () {
        var restFn = rest(fn, 1);
        assert.deepStrictEqual(restFn(1, 2, 3, 4), [1, [2, 3, 4]]);
    });

    it('should treat `start` as `0` for `NaN` or negative values', function () {
        var values = [-1, NaN, 'a'];
        var expected = map(values, constant([[1, 2, 3, 4]]));

        var actual = map(values, function (value) {
            var restFn = rest(fn, value);
            return restFn(1, 2, 3, 4);
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should coerce `start` to an integer', function () {
        var restFn = rest(fn, 1.6);
        assert.deepStrictEqual(restFn(1, 2, 3), [1, [2, 3]]);
    });
});
