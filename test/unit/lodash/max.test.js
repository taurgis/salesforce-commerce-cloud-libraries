var assert = require('assert');
var max = require('../../../cartridges/lodash/max');
var map = require('../../../cartridges/lodash/map');
var { falsey, noop } = require('../helpers/stubs');

describe('max', function () {
    it('should return the largest value from a collection', function () {
        assert.strictEqual(max([1, 2, 3]), 3);
    });

    it('should return `undefined` for empty collections', function () {
        var values = falsey.concat([[]]);
        var expected = map(values, noop);

        var actual = map(values, function (value, index) {
            try {
                return index ? max(value) : max();
            } catch (e) {
                // DO NOTHING
            }
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should work with non-numeric collection values', function () {
        assert.strictEqual(max(['a', 'b']), 'b');
    });
});
