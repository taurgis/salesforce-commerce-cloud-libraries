var assert = require('assert');
var spread = require('../../../cartridges/lodash/spread');
var constant = require('../../../cartridges/lodash/constant');
var map = require('../../../cartridges/lodash/map');
var slice = Array.prototype.slice;
var { stubTrue, falsey } = require('../helpers/stubs');

describe('spread', function () {
    function fn() {
        return slice.call(arguments);
    }

    it('should spread arguments to `func`', function () {
        var spreadFn = spread(fn);
        var expected = [1, 2];

        assert.deepStrictEqual(spreadFn([1, 2]), expected);
        assert.deepStrictEqual(spreadFn([1, 2], 3), expected);
    });

    it('should accept a falsey `array`', function () {
        var spreadFn = spread(stubTrue);
        var expected = map(falsey, stubTrue);

        var actual = map(falsey, function (array, index) {
            try {
                return index ? spreadFn(array) : spreadFn();
            } catch (e) {
                // DO NOTHING
            }
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should work with `start`', function () {
        var spreadFn = spread(fn, 1);
        var expected = [1, 2, 3];

        assert.deepStrictEqual(spreadFn(1, [2, 3]), expected);
        assert.deepStrictEqual(spreadFn(1, [2, 3], 4), expected);
    });

    it('should treat `start` as `0` for negative or `NaN` values', function () {
        var values = [-1, NaN, 'a'];
        var expected = map(values, constant([1, 2]));

        var actual = map(values, function (value) {
            var spreadFn = spread(fn, value);
            return spreadFn([1, 2]);
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should coerce `start` to an integer', function () {
        var spreadFn = spread(fn, 1.6);
        var expected = [1, 2, 3];

        assert.deepStrictEqual(spreadFn(1, [2, 3]), expected);
        assert.deepStrictEqual(spreadFn(1, [2, 3], 4), expected);
    });
});
