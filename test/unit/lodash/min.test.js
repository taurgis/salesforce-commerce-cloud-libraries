var assert = require('assert');
var min = require('../../../cartridges/lodash/min');
var map = require('../../../cartridges/lodash/map');
var { falsey, noop } = require('../helpers/stubs');

describe('min', function () {
    it('should return the smallest value from a collection', function () {
        assert.strictEqual(min([1, 2, 3]), 1);
    });

    it('should return `undefined` for empty collections', function () {
        var values = falsey.concat([[]]);
        var expected = map(values, noop);

        var actual = map(values, function (value, index) {
            try {
                return index ? min(value) : min();
            } catch (e) {
                // DO NOTHING
            }
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should work with non-numeric collection values', function () {
        assert.strictEqual(min(['a', 'b']), 'a');
    });
});
